import { NextRequest, NextResponse } from 'next/server';
import { getNOWPaymentsClient } from '@/lib/nowpayments';
import { updatePaymentStatus } from '@/lib/payment-service';

// POST /api/payments/ipn - Handle NOWPayments IPN callbacks
export async function POST(request: NextRequest) {
  try {
    // Get the signature from the headers
    const signature = request.headers.get('x-nowpayments-sig');
    
    if (!signature) {
      console.error('Missing signature in IPN request');
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Parse the request body
    const payload = await request.json();
    
    // Verify the signature
    const nowPayments = getNOWPaymentsClient();
    const isValid = nowPayments.verifyIpnSignature(payload, signature);
    
    if (!isValid) {
      console.error('Invalid signature in IPN request');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Extract payment information
    const { payment_id, payment_status } = payload;
    
    if (!payment_id || !payment_status) {
      console.error('Missing payment information in IPN request');
      return NextResponse.json({ error: 'Missing payment information' }, { status: 400 });
    }

    // Update the payment status in the database
    await updatePaymentStatus(payment_id, payment_status);

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing IPN:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
