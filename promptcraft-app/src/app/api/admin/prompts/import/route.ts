import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';
import { adminApiAuth } from '@/middleware/adminAuth';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

// POST /api/admin/prompts/import - Import prompts from CSV (admin only)
export async function POST(request: NextRequest) {
  try {
    // For testing purposes, we'll use a hardcoded admin user
    // This is a temporary solution for development
    const session = {
      user: {
        id: "admin-user-id",
        name: "ballery",
        email: "ballery@example.com",
        role: "admin"
      }
    };

    // In production, you would use this code instead:
    // const authResponse = await adminApiAuth(request);
    // if (authResponse) return authResponse;
    // const session = await getServerSession(authOptions);
    // if (!session?.user?.id) {
    //   return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    // }

    // Get form data with CSV file
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Check file type
    if (!file.name.endsWith('.csv')) {
      return NextResponse.json({ error: 'File must be a CSV' }, { status: 400 });
    }

    // Read file content
    const fileContent = await file.text();

    // Parse CSV
    let records;
    try {
      // Log the file content for debugging
      console.log('CSV file content:', fileContent.substring(0, 200) + '...');

      // Parse with more lenient options
      records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        relax_quotes: true,
        relax_column_count: true,
        skip_records_with_error: true,
        delimiter: ',',
        from_line: 1
      });

      // Log the parsed records for debugging
      console.log('Parsed records:', JSON.stringify(records.slice(0, 2)));
    } catch (error) {
      console.error('CSV parsing error:', error);
      return NextResponse.json({
        error: 'Error parsing CSV file',
        details: error.message
      }, { status: 400 });
    }

    if (records.length === 0) {
      return NextResponse.json({ error: 'CSV file is empty' }, { status: 400 });
    }

    // Validate and normalize columns
    const requiredColumns = ['prompt-title', 'prompt-content', 'type', 'categories', 'tags'];
    const firstRecord = records[0];

    // Log available columns for debugging
    console.log('Available columns:', Object.keys(firstRecord));

    // Check for missing columns with flexible matching
    const availableColumns = Object.keys(firstRecord).map(col => col.toLowerCase().trim());
    const missingColumns = [];

    for (const requiredCol of requiredColumns) {
      // Try different variations of column names
      const variations = [
        requiredCol,
        requiredCol.replace('-', ''),
        requiredCol.replace('-', '_'),
        requiredCol.replace('prompt-', ''),
        requiredCol.replace('-', ' ')
      ];

      if (!variations.some(v => availableColumns.includes(v.toLowerCase()))) {
        missingColumns.push(requiredCol);
      }
    }

    if (missingColumns.length > 0) {
      return NextResponse.json({
        error: `Missing required columns: ${missingColumns.join(', ')}`,
        availableColumns: availableColumns.join(', ')
      }, { status: 400 });
    }

    // Normalize records to ensure consistent column names
    records = records.map(record => {
      const normalizedRecord: any = {};

      // Handle prompt-title variations
      if ('prompt-title' in record) normalizedRecord['prompt-title'] = record['prompt-title'];
      else if ('prompttitle' in record) normalizedRecord['prompt-title'] = record['prompttitle'];
      else if ('prompt_title' in record) normalizedRecord['prompt-title'] = record['prompt_title'];
      else if ('title' in record) normalizedRecord['prompt-title'] = record['title'];
      else if ('prompt title' in record) normalizedRecord['prompt-title'] = record['prompt title'];

      // Handle prompt-content variations
      if ('prompt-content' in record) normalizedRecord['prompt-content'] = record['prompt-content'];
      else if ('promptcontent' in record) normalizedRecord['prompt-content'] = record['promptcontent'];
      else if ('prompt_content' in record) normalizedRecord['prompt-content'] = record['prompt_content'];
      else if ('content' in record) normalizedRecord['prompt-content'] = record['content'];
      else if ('prompt content' in record) normalizedRecord['prompt-content'] = record['prompt content'];

      // Handle type, categories, and tags
      normalizedRecord.type = record.type || 'text';
      normalizedRecord.categories = record.categories || record.category || 'General';
      normalizedRecord.tags = record.tags || record.tag || '';

      return normalizedRecord;
    });

    // Process records
    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[]
    };

    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      try {
        console.log(`Processing record ${i+1}:`, JSON.stringify(record));

        // Validate required fields
        if (!record['prompt-title'] || !record['prompt-content']) {
          throw new Error(`Missing required fields in record ${i+1}`);
        }

        // Find or create category
        const categoryName = (record.categories || 'General').trim();
        console.log(`Looking for category: ${categoryName}`);

        let category;
        try {
          category = await prisma.category.findUnique({
            where: { name: categoryName }
          });

          if (!category) {
            console.log(`Creating new category: ${categoryName}`);
            // Create a default category if it doesn't exist
            category = await prisma.category.create({
              data: {
                name: categoryName,
                description: `Category for ${categoryName} prompts`,
                color: '#6366F1', // Default indigo color
              }
            });
          }
        } catch (categoryError) {
          console.error(`Error with category "${categoryName}":`, categoryError);
          // Use a default category as fallback
          category = await prisma.category.findFirst() ||
                     await prisma.category.create({
                       data: {
                         name: 'General',
                         description: 'General category for prompts',
                         color: '#6366F1',
                       }
                     });
        }

        // Process tags - handle both comma and space separated tags
        let tagNames = [];
        if (record.tags) {
          tagNames = record.tags.includes(',')
            ? record.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
            : record.tags.split(' ').map((tag: string) => tag.trim()).filter(Boolean);
        }

        // Limit number of tags to prevent errors
        tagNames = tagNames.slice(0, 10);
        console.log(`Tags for record ${i+1}:`, tagNames);

        // Create prompt
        const promptData = {
          title: record['prompt-title'],
          description: record['prompt-title'], // Use title as description if not provided
          content: record['prompt-content'],
          price: 4.99, // Default price
          type: (record.type || 'text').toLowerCase(),
          // Mark some prompts as featured (randomly)
          featured: Math.random() > 0.7, // 30% chance of being featured
          authorId: session.user.id as string,
          categoryId: category.id,
        };

        console.log(`Creating prompt with data:`, JSON.stringify(promptData));

        const prompt = await prisma.prompt.create({
          data: {
            ...promptData,
            tags: tagNames.length > 0 ? {
              connectOrCreate: tagNames.map((tag: string) => ({
                where: { name: tag },
                create: { name: tag },
              })),
            } : undefined,
          }
        });

        console.log(`Successfully created prompt with ID: ${prompt.id}`);
        results.success++;
      } catch (error: any) {
        console.error(`Error importing record ${i+1}:`, error);
        results.failed++;
        results.errors.push(`Error importing row ${i+1}: ${error.message}`);
      }
    }

    return NextResponse.json({
      message: `Import completed. Successfully imported ${results.success} prompts. Failed to import ${results.failed} prompts.`,
      results
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error importing prompts:', error);

    // Provide more detailed error information
    let errorMessage = 'Failed to import prompts';
    let errorDetails = error.message || 'Unknown error';
    let statusCode = 500;

    // Handle specific error types
    if (error.name === 'PrismaClientKnownRequestError') {
      errorMessage = 'Database error while importing prompts';
      statusCode = 400;
    } else if (error.name === 'SyntaxError') {
      errorMessage = 'Error parsing CSV file';
      statusCode = 400;
    } else if (error.name === 'AuthenticationError') {
      errorMessage = 'Authentication error';
      statusCode = 401;
    }

    return NextResponse.json({
      error: errorMessage,
      details: errorDetails,
      name: error.name
    }, { status: statusCode });
  }
}
