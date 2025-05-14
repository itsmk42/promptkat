import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';
import { adminApiAuth } from '@/middleware/adminAuth';

const prisma = new PrismaClient();

// GET /api/admin/prompts/[id] - Get a specific prompt (admin only)
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // Check if user is admin
  const authResponse = await adminApiAuth(request);
  if (authResponse) return authResponse;

  try {
    const prompt = await prisma.prompt.findUnique({
      where: { id: params.id },
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
            userId: true,
            purchaseDate: true,
            price: true,
            status: true,
          },
        },
      },
    });

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
    }

    return NextResponse.json(prompt);
  } catch (error) {
    console.error('Error fetching prompt:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH /api/admin/prompts/[id] - Update a prompt (admin only)
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  // Check if user is admin
  const authResponse = await adminApiAuth(request);
  if (authResponse) return authResponse;

  try {
    const { title, description, content, price, type, categoryId, tags, image, featured } = await request.json();

    // Check if prompt exists
    const existingPrompt = await prisma.prompt.findUnique({
      where: { id: params.id },
      include: { tags: true },
    });

    if (!existingPrompt) {
      return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
    }

    // Prepare update data
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (content !== undefined) updateData.content = content;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (type !== undefined) updateData.type = type;
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (image !== undefined) updateData.image = image;
    if (featured !== undefined) updateData.featured = featured;

    // Update prompt
    const prompt = await prisma.prompt.update({
      where: { id: params.id },
      data: updateData,
    });

    // Update tags if provided
    if (tags && Array.isArray(tags)) {
      // Disconnect all existing tags
      await prisma.prompt.update({
        where: { id: params.id },
        data: {
          tags: {
            disconnect: existingPrompt.tags.map(tag => ({ id: tag.id })),
          },
        },
      });

      // Connect or create new tags
      await prisma.prompt.update({
        where: { id: params.id },
        data: {
          tags: {
            connectOrCreate: tags.map((tag: string) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
        },
      });
    }

    // Get updated prompt with relations
    const updatedPrompt = await prisma.prompt.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        tags: true,
      },
    });

    return NextResponse.json(updatedPrompt);
  } catch (error) {
    console.error('Error updating prompt:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE /api/admin/prompts/[id] - Delete a prompt (admin only)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  // Check if user is admin
  const authResponse = await adminApiAuth(request);
  if (authResponse) return authResponse;

  try {
    // Check if prompt exists
    const prompt = await prisma.prompt.findUnique({
      where: { id: params.id },
    });

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
    }

    // Delete prompt
    await prisma.prompt.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting prompt:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
