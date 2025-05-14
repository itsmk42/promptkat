import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getNOWPaymentsClient } from '@/lib/nowpayments';
import { createPaymentRecord } from '@/lib/payment-service';
import { getDbClient } from '@/lib/mock-db';

// GET /api/payments - Get available cryptocurrencies
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    const isDev = process.env.NODE_ENV === 'development';
    const mockEnabled = process.env.USE_MOCK_PAYMENTS === 'true';
    const bypassAuth = isDev && mockEnabled;
    
    if (!session?.user && !bypassAuth) {
      console.log('Authentication failed. No valid session found.');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // For development, create a mock session if needed
    const userInfo = session?.user || (bypassAuth ? {
      id: 'dev-user-id',
      name: 'Development User',
      email: 'dev@example.com',
      role: 'user'
    } : null);
    
    // Get available currencies
    const nowPayments = getNOWPaymentsClient();
    const currencies = await nowPayments.getAvailableCurrencies();
    
    // Return the currencies and user info
    return NextResponse.json({
      currencies,
      isMockMode: bypassAuth,
      user: userInfo
    });
  } catch (error) {
    console.error('Error fetching available currencies:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/payments - Create a new payment
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    const isDev = process.env.NODE_ENV === 'development';
    const mockEnabled = process.env.USE_MOCK_PAYMENTS === 'true';
    const bypassAuth = isDev && mockEnabled;
    
    if (!session?.user && !bypassAuth) {
      console.log('Authentication failed. No valid session found for payment creation.');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // For development, create a mock session if needed
    const userInfo = session?.user || (bypassAuth ? {
      id: 'dev-user-id',
      name: 'Development User',
      email: 'dev@example.com',
      role: 'user'
    } : null);
    
    const { promptId, payCurrency } = await request.json();
    
    if (!promptId || !payCurrency) {
      return NextResponse.json({ error: 'Prompt ID and payment currency are required' }, { status: 400 });
    }
    
    // Get the prompt from the database to get the price
    const prisma = getDbClient();
    const prompt = await prisma.prompt.findUnique({
      where: { id: promptId },
    });
    
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
    }
    
    // Check if already purchased
    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId: userInfo?.id as string,
        promptId,
        status: 'completed',
      },
    });
    
    if (existingPurchase) {
      return NextResponse.json({ error: 'Prompt already purchased' }, { status: 400 });
    }
    
    // Create a payment with NOWPayments
    const nowPayments = getNOWPaymentsClient();
    const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/ipn`;
    
    try {
      const paymentData = await nowPayments.createPayment(
        prompt.price,
        'USD',
        payCurrency,
        `prompt-${promptId}`,
        `Purchase of prompt: ${prompt.title}`,
        callbackUrl,
        promptId
      );
      
      // Create a payment record in the database
      const payment = await createPaymentRecord(paymentData, userInfo?.id as string, promptId);
      
      return NextResponse.json({
        success: true,
        payment: paymentData,
        redirectUrl: `/payment/status?paymentId=${paymentData.payment_id}`,
      });
    } catch (paymentError: any) {
      console.error('Error creating payment with NOWPayments:', paymentError);
      return NextResponse.json({
        error: 'Payment processing error',
        details: paymentError.message || 'Unknown error'
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Error creating payment:', error);
    return NextResponse.json({
      error: error.message || 'Internal Server Error',
      details: error.toString()
    }, { status: 500 });
  }
}
