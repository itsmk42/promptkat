import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { adminApiAuth } from '@/middleware/adminAuth';

const prisma = new PrismaClient();

// PATCH /api/admin/prompts/[id]/feature - Toggle featured status (admin only)
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Toggle featured status
    const updatedPrompt = await prisma.prompt.update({
      where: { id: params.id },
      data: {
        featured: !prompt.featured,
      },
    });

    return NextResponse.json(updatedPrompt);
  } catch (error) {
    console.error('Error toggling featured status:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
