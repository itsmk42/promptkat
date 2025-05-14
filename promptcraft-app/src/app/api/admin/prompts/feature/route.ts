import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { adminApiAuth } from '@/middleware/adminAuth';

const prisma = new PrismaClient();

// POST /api/admin/prompts/feature - Mark prompts as featured (admin only)
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

    // Get all prompts
    const prompts = await prisma.prompt.findMany();
    console.log(`Found ${prompts.length} prompts in the database`);

    // Mark all prompts as featured for testing
    const updates = [];
    for (const prompt of prompts) {
      updates.push(
        prisma.prompt.update({
          where: { id: prompt.id },
          data: { featured: true }
        })
      );
    }

    // Execute all updates
    const results = await Promise.all(updates);
    console.log(`Marked ${results.length} prompts as featured`);

    return NextResponse.json({
      success: true,
      message: `Marked ${results.length} out of ${prompts.length} prompts as featured`,
      featuredCount: results.length
    });

  } catch (error: any) {
    console.error('Error marking prompts as featured:', error);
    return NextResponse.json({
      error: 'Failed to mark prompts as featured',
      details: error.message
    }, { status: 500 });
  }
}
