import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { createSubscription, getUserSubscriptions, cancelSubscription } from '@/lib/payment-service';
import { getDbClient } from '@/lib/mock-db';

// GET /api/subscriptions - Get user subscriptions
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    const isDev = process.env.NODE_ENV === 'development';
    const mockEnabled = process.env.USE_MOCK_PAYMENTS === 'true';
    const bypassAuth = isDev && mockEnabled;
    
    if (!session?.user && !bypassAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // For development, create a mock session if needed
    const userInfo = session?.user || (bypassAuth ? {
      id: 'dev-user-id',
      name: 'Development User',
      email: 'dev@example.com',
      role: 'user'
    } : null);
    
    const subscriptions = await getUserSubscriptions(userInfo?.id as string);
    
    return NextResponse.json({
      subscriptions,
      isMockMode: bypassAuth
    });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/subscriptions - Create a new subscription
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    const isDev = process.env.NODE_ENV === 'development';
    const mockEnabled = process.env.USE_MOCK_PAYMENTS === 'true';
    const bypassAuth = isDev && mockEnabled;
    
    if (!session?.user && !bypassAuth) {
      console.log('Authentication failed. No valid session found for subscription creation.');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // For development, create a mock session if needed
    const userInfo = session?.user || (bypassAuth ? {
      id: 'dev-user-id',
      name: 'Development User',
      email: 'dev@example.com',
      role: 'user'
    } : null);
    
    const { plan, payCurrency } = await request.json();
    
    if (!plan || !payCurrency) {
      return NextResponse.json({ error: 'Plan and payment currency are required' }, { status: 400 });
    }
    
    // Determine price based on plan
    let price = 0;
    if (plan === 'monthly') {
      price = 9.99; // Monthly subscription price
    } else if (plan === 'yearly') {
      price = 99.99; // Yearly subscription price (with discount)
    } else {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }
    
    // Create subscription with payment
    const result = await createSubscription(
      userInfo?.id as string,
      plan,
      price,
      payCurrency
    );
    
    return NextResponse.json({
      success: true,
      subscription: result.subscription,
      payment: result.payment,
      redirectUrl: `/payment/status?paymentId=${result.payment.payment_id}&type=subscription`,
    });
  } catch (error: any) {
    console.error('Error creating subscription:', error);
    return NextResponse.json({
      error: error.message || 'Internal Server Error',
      details: error.toString()
    }, { status: 500 });
  }
}

// PATCH /api/subscriptions - Cancel a subscription
export async function PATCH(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    const isDev = process.env.NODE_ENV === 'development';
    const mockEnabled = process.env.USE_MOCK_PAYMENTS === 'true';
    const bypassAuth = isDev && mockEnabled;
    
    if (!session?.user && !bypassAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // For development, create a mock session if needed
    const userInfo = session?.user || (bypassAuth ? {
      id: 'dev-user-id',
      name: 'Development User',
      email: 'dev@example.com',
      role: 'user'
    } : null);
    
    const { subscriptionId } = await request.json();
    
    if (!subscriptionId) {
      return NextResponse.json({ error: 'Subscription ID is required' }, { status: 400 });
    }
    
    // Cancel the subscription
    const subscription = await cancelSubscription(subscriptionId, userInfo?.id as string);
    
    return NextResponse.json({
      success: true,
      subscription,
    });
  } catch (error: any) {
    console.error('Error cancelling subscription:', error);
    return NextResponse.json({ 
      error: error.message || 'Internal Server Error',
      details: error.toString()
    }, { status: 500 });
  }
}
