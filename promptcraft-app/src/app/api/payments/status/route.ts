import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getNOWPaymentsClient } from '@/lib/nowpayments';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/payments/status - Get payment status
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get payment ID from query params
    const url = new URL(request.url);
    const paymentId = url.searchParams.get('paymentId');

    if (!paymentId) {
      return NextResponse.json({ error: 'Payment ID is required' }, { status: 400 });
    }

    // Find the payment in the database
    const payment = await prisma.payment.findUnique({
      where: { paymentId },
      include: {
        purchases: {
          include: {
            prompt: true,
          },
        },
        subscriptions: true,
      },
    });

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    // Verify that the payment belongs to the user
    const isUserPayment = payment.purchases.some(purchase => purchase.userId === session.user.id) ||
                          payment.subscriptions.some(subscription => subscription.userId === session.user.id);

    if (!isUserPayment) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the latest payment status from NOWPayments
    const nowPayments = getNOWPaymentsClient();
    const paymentStatus = await nowPayments.getPaymentStatus(paymentId);

    // Update the payment status in the database if it has changed
    if (payment.paymentStatus !== paymentStatus.payment_status) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { paymentStatus: paymentStatus.payment_status },
      });

      // Update related purchase status if exists
      if (payment.purchases.length > 0) {
        for (const purchase of payment.purchases) {
          await prisma.purchase.update({
            where: { id: purchase.id },
            data: { status: paymentStatus.payment_status === 'finished' ? 'completed' : paymentStatus.payment_status },
          });
        }
      }

      // Update related subscription status if exists
      if (payment.subscriptions.length > 0) {
        for (const subscription of payment.subscriptions) {
          if (paymentStatus.payment_status === 'finished') {
            // Payment successful, subscription is active
            await prisma.subscription.update({
              where: { id: subscription.id },
              data: { status: 'active' },
            });
          } else if (['failed', 'expired', 'refunded'].includes(paymentStatus.payment_status)) {
            // Payment failed, subscription is cancelled
            await prisma.subscription.update({
              where: { id: subscription.id },
              data: { status: 'cancelled' },
            });
          }
        }
      }
    }

    return NextResponse.json(paymentStatus);
  } catch (error) {
    console.error('Error fetching payment status:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
