import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { adminApiAuth } from '@/middleware/adminAuth';

const prisma = new PrismaClient();

// GET /api/admin/categories - Get all categories (admin only)
export async function GET(request: NextRequest) {
  // Check if user is admin
  const authResponse = await adminApiAuth(request);
  if (authResponse) return authResponse;

  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            prompts: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    // Transform the data to include prompt count
    const transformedCategories = categories.map(category => ({
      ...category,
      promptCount: category._count.prompts,
      _count: undefined, // Remove the _count property
    }));

    return NextResponse.json(transformedCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/admin/categories - Create a new category (admin only)
export async function POST(request: NextRequest) {
  // Check if user is admin
  const authResponse = await adminApiAuth(request);
  if (authResponse) return authResponse;

  try {
    const { name, description, color, icon } = await request.json();

    // Validate input
    if (!name || !description || !color) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if category with this name already exists
    const existingCategory = await prisma.category.findUnique({
      where: { name },
    });

    if (existingCategory) {
      return NextResponse.json({ error: 'Category with this name already exists' }, { status: 400 });
    }

    // Create category
    const category = await prisma.category.create({
      data: {
        name,
        description,
        color,
        icon,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
