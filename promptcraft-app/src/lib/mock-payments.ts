/**
 * Mock Payments Service
 * 
 * This file provides mock payment functionality for development and testing.
 * It simulates payment operations without requiring a real payment gateway.
 */

import { CreatePaymentResponse, PaymentStatusResponse, NOWPaymentsClient } from './nowpayments';

// Mock payment data
const mockPayments: Record<string, CreatePaymentResponse> = {};

// Mock NOWPayments client for development
export class MockNOWPaymentsClient extends NOWPaymentsClient {
  constructor() {
    super('mock-api-key', 'mock-ipn-secret');
  }

  /**
   * Get available currencies for payments
   */
  async getAvailableCurrencies(): Promise<string[]> {
    // Return a list of common cryptocurrencies
    return [
      'BTC', 'ETH', 'LTC', 'DOGE', 'XRP', 'BCH', 'USDT', 'USDC', 'ADA', 'SOL'
    ];
  }

  /**
   * Estimate the amount of cryptocurrency needed for a payment
   */
  async estimatePrice(amount: number, fromCurrency: string, toCurrency: string): Promise<number> {
    // Mock conversion rates (simplified)
    const rates: Record<string, number> = {
      'BTC': 0.000025,
      'ETH': 0.00035,
      'LTC': 0.0075,
      'DOGE': 7.5,
      'XRP': 1.5,
      'BCH': 0.0025,
      'USDT': 1.0,
      'USDC': 1.0,
      'ADA': 2.0,
      'SOL': 0.05
    };

    // Calculate estimated amount
    return amount * (rates[toCurrency] || 1.0);
  }

  /**
   * Create a new payment
   */
  async createPayment(
    priceAmount: number,
    priceCurrency: string = 'USD',
    payCurrency: string,
    orderId?: string,
    orderDescription?: string,
    ipnCallbackUrl?: string,
    purchaseId?: string
  ): Promise<CreatePaymentResponse> {
    // Generate a unique payment ID
    const paymentId = `mock-payment-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Calculate mock pay amount
    const payAmount = await this.estimatePrice(priceAmount, priceCurrency, payCurrency);
    
    // Create mock payment response
    const paymentResponse: CreatePaymentResponse = {
      payment_id: paymentId,
      payment_status: 'waiting',
      pay_address: `mock-${payCurrency.toLowerCase()}-address-${paymentId}`,
      price_amount: priceAmount,
      price_currency: priceCurrency,
      pay_amount: payAmount,
      pay_currency: payCurrency,
      order_id: orderId,
      order_description: orderDescription,
      ipn_callback_url: ipnCallbackUrl,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      purchase_id: purchaseId
    };
    
    // Store the payment in our mock database
    mockPayments[paymentId] = paymentResponse;
    
    return paymentResponse;
  }

  /**
   * Get payment status
   */
  async getPaymentStatus(paymentId: string): Promise<PaymentStatusResponse> {
    // Check if payment exists
    if (!mockPayments[paymentId]) {
      throw new Error(`Payment with ID ${paymentId} not found`);
    }
    
    // Get the payment
    const payment = mockPayments[paymentId];
    
    // In mock mode, we'll simulate payment progress over time
    const createdAt = new Date(payment.created_at || new Date());
    const now = new Date();
    const elapsedSeconds = (now.getTime() - createdAt.getTime()) / 1000;
    
    // Simulate payment status based on elapsed time
    let status = 'waiting';
    if (elapsedSeconds > 60) {
      status = 'confirming';
    }
    if (elapsedSeconds > 120) {
      status = 'confirmed';
    }
    if (elapsedSeconds > 180) {
      status = 'finished';
    }
    
    // Update the payment status
    payment.payment_status = status;
    payment.updated_at = now.toISOString();
    
    return {
      ...payment,
      actually_paid: payment.pay_amount,
      actually_paid_at_fiat: payment.price_amount
    };
  }

  /**
   * Verify IPN signature (always returns true in mock mode)
   */
  verifyIpnSignature(payload: any, signature: string): boolean {
    return true;
  }
}

// Function to get either the real NOWPayments client or the mock client
export function getMockNOWPaymentsClient(): NOWPaymentsClient {
  return new MockNOWPaymentsClient();
}
