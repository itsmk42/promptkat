import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { adminApiAuth } from '@/middleware/adminAuth';

const prisma = new PrismaClient();

// GET /api/admin/users - Get all users (admin only)
export async function GET(request: NextRequest) {
  // Check if user is admin
  const authResponse = await adminApiAuth(request);
  if (authResponse) return authResponse;

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        role: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            purchases: true,
            prompts: true,
            favorites: true,
          },
        },
        purchases: {
          select: {
            price: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform the data to include purchase count and total spent
    const transformedUsers = users.map(user => {
      const totalSpent = user.purchases.reduce((sum, purchase) => sum + purchase.price, 0);
      
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        role: user.role,
        image: user.image,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        purchaseCount: user._count.purchases,
        promptCount: user._count.prompts,
        favoriteCount: user._count.favorites,
        totalSpent,
        // Remove the raw data
        _count: undefined,
        purchases: undefined,
      };
    });

    return NextResponse.json(transformedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
