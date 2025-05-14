import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';
import { adminApiAuth } from '@/middleware/adminAuth';

const prisma = new PrismaClient();

// POST /api/admin/feedback - Submit admin feedback
export async function POST(request: NextRequest) {
  // Check if user is admin
  const authResponse = await adminApiAuth(request);
  if (authResponse) return authResponse;

  try {
    const session = await getServerSession(authOptions);
    const { category, title, description, rating, email, name } = await request.json();

    // Validate input
    if (!category || !title || !description || !rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // In a real app, you would store this in the database
    // For now, we'll just log it and return success
    console.log('Admin Feedback Received:', {
      userId: session?.user?.id,
      category,
      title,
      description,
      rating,
      email: email || session?.user?.email,
      name: name || session?.user?.name,
      timestamp: new Date(),
    });

    // You could also send this feedback to an email or a third-party service
    
    return NextResponse.json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
