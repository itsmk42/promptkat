import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/purchases - Get all purchases for the current user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const purchases = await prisma.purchase.findMany({
      where: {
        userId: session.user.id as string,
      },
      include: {
        prompt: true,
      },
      orderBy: {
        purchaseDate: 'desc',
      },
    });

    return NextResponse.json(purchases);
  } catch (error) {
    console.error('Error fetching purchases:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/purchases - Create a new purchase
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { promptId } = await request.json();

    if (!promptId) {
      return NextResponse.json({ error: 'Prompt ID is required' }, { status: 400 });
    }

    // Check if the prompt exists
    const prompt = await prisma.prompt.findUnique({
      where: {
        id: promptId,
      },
    });

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
    }

    // Check if already purchased
    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId: session.user.id as string,
        promptId,
      },
    });

    if (existingPurchase) {
      return NextResponse.json({ error: 'Prompt already purchased' }, { status: 400 });
    }

    // Create purchase record
    const purchase = await prisma.purchase.create({
      data: {
        userId: session.user.id as string,
        promptId,
        price: prompt.price,
      },
    });

    return NextResponse.json(purchase);
  } catch (error) {
    console.error('Error creating purchase:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
