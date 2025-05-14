/**
 * NOWPayments API Integration
 *
 * This file contains utility functions for interacting with the NOWPayments API
 * for cryptocurrency payment processing.
 */

import crypto from 'crypto';

// Types for NOWPayments API responses
export interface CreatePaymentResponse {
  payment_id: string;
  payment_status: string;
  pay_address: string;
  price_amount: number;
  price_currency: string;
  pay_amount: number;
  pay_currency: string;
  order_id?: string;
  order_description?: string;
  ipn_callback_url?: string;
  created_at?: string;
  updated_at?: string;
  purchase_id?: string;
}

export interface PaymentStatusResponse {
  payment_id: string;
  payment_status: string;
  pay_address: string;
  price_amount: number;
  price_currency: string;
  pay_amount: number;
  pay_currency: string;
  order_id?: string;
  order_description?: string;
  purchase_id?: string;
  actually_paid?: number;
  actually_paid_at_fiat?: number;
  created_at?: string;
  updated_at?: string;
}

export interface AvailableCurrenciesResponse {
  currencies: string[];
}

export interface EstimateResponse {
  estimated_amount: number;
  currency_from: string;
  currency_to: string;
}

// NOWPayments API client
export class NOWPaymentsClient {
  private apiKey: string;
  private apiUrl: string = 'https://api.nowpayments.io/v1';
  private ipnSecret?: string;

  constructor(apiKey: string, ipnSecret?: string) {
    this.apiKey = apiKey;
    this.ipnSecret = ipnSecret;
  }

  /**
   * Get available currencies for payments
   */
  async getAvailableCurrencies(): Promise<string[]> {
    const response = await fetch(`${this.apiUrl}/currencies`, {
      method: 'GET',
      headers: {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get available currencies: ${response.statusText}`);
    }

    const data = await response.json() as AvailableCurrenciesResponse;
    return data.currencies;
  }

  /**
   * Estimate the amount of cryptocurrency needed for a payment
   */
  async estimatePrice(amount: number, fromCurrency: string, toCurrency: string): Promise<number> {
    const response = await fetch(`${this.apiUrl}/estimate?amount=${amount}&currency_from=${fromCurrency}&currency_to=${toCurrency}`, {
      method: 'GET',
      headers: {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to estimate price: ${response.statusText}`);
    }

    const data = await response.json() as EstimateResponse;
    return data.estimated_amount;
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
    const payload = {
      price_amount: priceAmount,
      price_currency: priceCurrency,
      pay_currency: payCurrency,
      ...(orderId && { order_id: orderId }),
      ...(orderDescription && { order_description: orderDescription }),
      ...(ipnCallbackUrl && { ipn_callback_url: ipnCallbackUrl }),
      ...(purchaseId && { purchase_id: purchaseId }),
    };

    const response = await fetch(`${this.apiUrl}/payment`, {
      method: 'POST',
      headers: {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to create payment: ${response.statusText}`);
    }

    return await response.json() as CreatePaymentResponse;
  }

  /**
   * Get payment status
   */
  async getPaymentStatus(paymentId: string): Promise<PaymentStatusResponse> {
    const response = await fetch(`${this.apiUrl}/payment/${paymentId}`, {
      method: 'GET',
      headers: {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get payment status: ${response.statusText}`);
    }

    return await response.json() as PaymentStatusResponse;
  }

  /**
   * Verify IPN signature
   */
  verifyIpnSignature(payload: any, signature: string): boolean {
    if (!this.ipnSecret) {
      throw new Error('IPN secret is not set');
    }

    // Sort the payload object alphabetically by keys
    const sortedPayload = Object.keys(payload)
      .sort()
      .reduce((result: any, key) => {
        result[key] = payload[key];
        return result;
      }, {});

    // Create a string from the sorted payload
    const payloadString = JSON.stringify(sortedPayload);

    // Create HMAC signature
    const hmac = crypto.createHmac('sha512', this.ipnSecret);
    const calculatedSignature = hmac.update(payloadString).digest('hex');

    // Compare signatures
    return calculatedSignature === signature;
  }
}

// Create a singleton instance of the NOWPayments client
let nowPaymentsClient: NOWPaymentsClient | null = null;

export function getNOWPaymentsClient(): NOWPaymentsClient {
  if (!nowPaymentsClient) {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const useMockPayments = process.env.USE_MOCK_PAYMENTS === 'true';

    if (isDevelopment && useMockPayments) {
      console.log('Using mock payment gateway for development');
      // Import the mock client dynamically to avoid circular dependencies
      const { getMockNOWPaymentsClient } = require('./mock-payments');
      nowPaymentsClient = getMockNOWPaymentsClient();
    } else {
      const apiKey = process.env.NOWPAYMENTS_API_KEY;
      const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET;

      if (!apiKey) {
        throw new Error('NOWPAYMENTS_API_KEY is not set in environment variables');
      }

      nowPaymentsClient = new NOWPaymentsClient(apiKey, ipnSecret);
    }
  }

  return nowPaymentsClient;
}
