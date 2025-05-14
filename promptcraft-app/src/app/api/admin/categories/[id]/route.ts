import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { adminApiAuth } from '@/middleware/adminAuth';

const prisma = new PrismaClient();

// GET /api/admin/categories/[id] - Get a specific category (admin only)
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // Check if user is admin
  const authResponse = await adminApiAuth(request);
  if (authResponse) return authResponse;

  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        prompts: {
          select: {
            id: true,
            title: true,
            price: true,
            type: true,
            featured: true,
            createdAt: true,
            _count: {
              select: {
                purchases: true,
              },
            },
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // Transform the data to include sales count
    const transformedCategory = {
      ...category,
      prompts: category.prompts.map(prompt => ({
        ...prompt,
        salesCount: prompt._count.purchases,
        _count: undefined, // Remove the _count property
      })),
    };

    return NextResponse.json(transformedCategory);
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH /api/admin/categories/[id] - Update a category (admin only)
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  // Check if user is admin
  const authResponse = await adminApiAuth(request);
  if (authResponse) return authResponse;

  try {
    const { name, description, color, icon } = await request.json();

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: params.id },
    });

    if (!existingCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // If name is being changed, check if the new name already exists
    if (name && name !== existingCategory.name) {
      const categoryWithSameName = await prisma.category.findUnique({
        where: { name },
      });

      if (categoryWithSameName) {
        return NextResponse.json({ error: 'Category with this name already exists' }, { status: 400 });
      }
    }

    // Prepare update data
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (color !== undefined) updateData.color = color;
    if (icon !== undefined) updateData.icon = icon;

    // Update category
    const category = await prisma.category.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE /api/admin/categories/[id] - Delete a category (admin only)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  // Check if user is admin
  const authResponse = await adminApiAuth(request);
  if (authResponse) return authResponse;

  try {
    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            prompts: true,
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // Check if category has prompts
    if (category._count.prompts > 0) {
      return NextResponse.json({ 
        error: 'Cannot delete category with prompts. Please reassign or delete the prompts first.',
        promptCount: category._count.prompts
      }, { status: 400 });
    }

    // Delete category
    await prisma.category.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
