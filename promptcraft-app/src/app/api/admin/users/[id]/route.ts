import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';
import { adminApiAuth } from '@/middleware/adminAuth';

const prisma = new PrismaClient();

// GET /api/admin/users/[id] - Get a specific user (admin only)
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // Check if user is admin
  const authResponse = await adminApiAuth(request);
  if (authResponse) return authResponse;

  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
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
            id: true,
            promptId: true,
            price: true,
            status: true,
            purchaseDate: true,
            prompt: {
              select: {
                title: true,
              },
            },
          },
          orderBy: {
            purchaseDate: 'desc',
          },
        },
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
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Calculate total spent
    const totalSpent = user.purchases.reduce((sum, purchase) => sum + purchase.price, 0);

    // Transform the data
    const transformedUser = {
      ...user,
      purchaseCount: user._count.purchases,
      promptCount: user._count.prompts,
      favoriteCount: user._count.favorites,
      totalSpent,
      prompts: user.prompts.map(prompt => ({
        ...prompt,
        salesCount: prompt._count.purchases,
        _count: undefined,
      })),
      _count: undefined,
    };

    return NextResponse.json(transformedUser);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH /api/admin/users/[id] - Update a user (admin only)
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  // Check if user is admin
  const authResponse = await adminApiAuth(request);
  if (authResponse) return authResponse;

  try {
    const session = await getServerSession(authOptions);
    const { name, email, role } = await request.json();

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Prevent changing own role (except for superadmin)
    if (params.id === session?.user?.id && role !== existingUser.role && session?.user?.role !== 'superadmin') {
      return NextResponse.json({ error: 'You cannot change your own role' }, { status: 403 });
    }

    // Prevent non-superadmin from changing superadmin role
    if (existingUser.role === 'superadmin' && session?.user?.role !== 'superadmin') {
      return NextResponse.json({ error: 'Only superadmins can modify superadmin accounts' }, { status: 403 });
    }

    // If email is being changed, check if the new email already exists
    if (email && email !== existingUser.email) {
      const userWithSameEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (userWithSameEmail) {
        return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
      }
    }

    // Prepare update data
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (role !== undefined) updateData.role = role;

    // Update user
    const user = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        role: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
