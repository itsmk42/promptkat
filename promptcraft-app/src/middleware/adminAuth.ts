import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

// Middleware to check if user is an admin
export async function isAdmin(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return false;
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id as string },
      select: { role: true },
    });

    return user?.role === 'admin' || user?.role === 'superadmin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

// Middleware to protect admin API routes
export async function adminApiAuth(request: NextRequest) {
  const isUserAdmin = await isAdmin(request);

  if (!isUserAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return null; // Continue to the API route
}

// Function to use in server components to check admin status
export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return { isAdmin: false };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id as string },
    select: { role: true },
  });

  if (user?.role !== 'admin' && user?.role !== 'superadmin') {
    return { isAdmin: false };
  }

  return { isAdmin: true, user: session.user };
}
