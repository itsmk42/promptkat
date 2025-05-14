import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getUserPurchases } from '@/lib/payment-service';

// GET /api/orders - Get user order history
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const purchases = await getUserPurchases(session.user.id as string);

    return NextResponse.json(purchases);
  } catch (error) {
    console.error('Error fetching order history:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
