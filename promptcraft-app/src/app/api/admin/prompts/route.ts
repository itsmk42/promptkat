import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';
import { adminApiAuth } from '@/middleware/adminAuth';

const prisma = new PrismaClient();

// GET /api/admin/prompts - Get all prompts (admin only)
export async function GET(request: NextRequest) {
  // Check if user is admin
  const authResponse = await adminApiAuth(request);
  if (authResponse) return authResponse;

  try {
    const prompts = await prisma.prompt.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        category: true,
        tags: true,
        purchases: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform the data to include sales count
    const transformedPrompts = prompts.map(prompt => ({
      ...prompt,
      salesCount: prompt.purchases.length,
      purchases: undefined, // Remove the purchases array
    }));

    return NextResponse.json(transformedPrompts);
  } catch (error) {
    console.error('Error fetching prompts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/admin/prompts - Create a new prompt (admin only)
export async function POST(request: NextRequest) {
  // Check if user is admin
  const authResponse = await adminApiAuth(request);
  if (authResponse) return authResponse;

  try {
    const session = await getServerSession(authOptions);
    const { title, description, content, price, type, categoryId, tags, image, featured } = await request.json();

    // Validate input
    if (!title || !description || !content || !price || !type || !categoryId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // Create prompt
    const prompt = await prisma.prompt.create({
      data: {
        title,
        description,
        content,
        price: parseFloat(price),
        type,
        featured: featured || false,
        image,
        authorId: session!.user!.id as string,
        categoryId,
        tags: {
          connectOrCreate: tags.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: {
        category: true,
        tags: true,
      },
    });

    return NextResponse.json(prompt, { status: 201 });
  } catch (error) {
    console.error('Error creating prompt:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
