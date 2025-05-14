/**
 * Payment Service
 *
 * This file contains functions for handling payment-related database operations.
 */

import { PrismaClient } from '@prisma/client';
import { getNOWPaymentsClient, CreatePaymentResponse } from './nowpayments';
import { getDbClient } from './mock-db';

// Use either the real Prisma client or the mock DB
const prisma = getDbClient();

/**
 * Create a new payment record in the database
 */
export async function createPaymentRecord(paymentData: CreatePaymentResponse, userId: string, promptId?: string) {
  // Create the payment record
  const payment = await prisma.payment.create({
    data: {
      paymentId: paymentData.payment_id,
      paymentStatus: paymentData.payment_status,
      payAddress: paymentData.pay_address,
      payAmount: paymentData.pay_amount,
      payCurrency: paymentData.pay_currency,
      priceAmount: paymentData.price_amount,
      priceCurrency: paymentData.price_currency,
    },
  });

  // If this is a prompt purchase, create a purchase record
  if (promptId) {
    await prisma.purchase.create({
      data: {
        userId,
        promptId,
        price: paymentData.price_amount,
        paymentId: payment.id,
      },
    });
  }

  return payment;
}

/**
 * Create a subscription with payment
 */
export async function createSubscription(userId: string, plan: string, price: number, payCurrency: string) {
  // Create a payment for the subscription
  const nowPayments = getNOWPaymentsClient();
  const paymentData = await nowPayments.createPayment(
    price,
    'USD',
    payCurrency,
    `subscription-${userId}-${plan}`,
    `PromptCraft ${plan} subscription`,
    `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/ipn`
  );

  // Create the payment record
  const payment = await prisma.payment.create({
    data: {
      paymentId: paymentData.payment_id,
      paymentStatus: paymentData.payment_status,
      payAddress: paymentData.pay_address,
      payAmount: paymentData.pay_amount,
      payCurrency: paymentData.pay_currency,
      priceAmount: paymentData.price_amount,
      priceCurrency: paymentData.price_currency,
    },
  });

  // Calculate end date based on plan
  const startDate = new Date();
  const endDate = new Date(startDate);
  if (plan === 'monthly') {
    endDate.setMonth(endDate.getMonth() + 1);
  } else if (plan === 'yearly') {
    endDate.setFullYear(endDate.getFullYear() + 1);
  }

  // Create the subscription
  const subscription = await prisma.subscription.create({
    data: {
      userId,
      plan,
      price,
      startDate,
      endDate,
      paymentId: payment.id,
    },
  });

  return { subscription, payment: paymentData };
}

/**
 * Update payment status
 */
export async function updatePaymentStatus(paymentId: string, status: string) {
  // Update the payment record
  const payment = await prisma.payment.update({
    where: { paymentId },
    data: { paymentStatus: status },
    include: {
      purchases: true,
      subscriptions: true,
    },
  });

  // Update related purchase status if exists
  if (payment.purchases.length > 0) {
    for (const purchase of payment.purchases) {
      await prisma.purchase.update({
        where: { id: purchase.id },
        data: { status: status === 'finished' ? 'completed' : status },
      });
    }
  }

  // Update related subscription status if exists
  if (payment.subscriptions.length > 0) {
    for (const subscription of payment.subscriptions) {
      if (status === 'finished') {
        // Payment successful, subscription is active
        await prisma.subscription.update({
          where: { id: subscription.id },
          data: { status: 'active' },
        });
      } else if (['failed', 'expired', 'refunded'].includes(status)) {
        // Payment failed, subscription is cancelled
        await prisma.subscription.update({
          where: { id: subscription.id },
          data: { status: 'cancelled' },
        });
      }
    }
  }

  return payment;
}

/**
 * Get user purchases with payment information
 */
export async function getUserPurchases(userId: string) {
  return prisma.purchase.findMany({
    where: { userId },
    include: {
      prompt: true,
      payment: true,
    },
    orderBy: { purchaseDate: 'desc' },
  });
}

/**
 * Get user subscriptions with payment information
 */
export async function getUserSubscriptions(userId: string) {
  return prisma.subscription.findMany({
    where: { userId },
    include: {
      payment: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Cancel a subscription
 */
export async function cancelSubscription(subscriptionId: string, userId: string) {
  // Verify the subscription belongs to the user
  const subscription = await prisma.subscription.findFirst({
    where: {
      id: subscriptionId,
      userId,
    },
  });

  if (!subscription) {
    throw new Error('Subscription not found');
  }

  // Update the subscription
  return prisma.subscription.update({
    where: { id: subscriptionId },
    data: {
      status: 'cancelled',
      autoRenew: false,
    },
  });
}
