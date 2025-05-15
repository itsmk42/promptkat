"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import CryptoDropdown from '@/components/CryptoDropdown';

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const [promptId, setPromptId] = useState<string | null>(searchParams.get('promptId'));
  const [plan, setPlan] = useState<string | null>(searchParams.get('plan'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('BTC');
  const [isMockPayment, setIsMockPayment] = useState<boolean>(false);

  // Fetch available currencies when component mounts
  useEffect(() => {
    if (status === 'authenticated' || process.env.NODE_ENV === 'development') {
      fetchCurrencies();
    }
  }, [status]);

  // Redirect if not authenticated, except in development mode with mock payments
  useEffect(() => {
    // Check if we're in development mode
    if (process.env.NODE_ENV === 'development') {
      // In development, we'll let the fetchCurrencies function determine if we're using mock payments
      return;
    }

    // In production, always redirect unauthenticated users
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/payment' + (promptId ? `?promptId=${promptId}` : ''));
    }
  }, [status, router, promptId]);

  // Redirect if no promptId or plan
  useEffect(() => {
    if ((status === 'authenticated' || isMockPayment) && !promptId && !plan) {
      router.push('/');
    }
  }, [status, promptId, plan, router, isMockPayment]);

  const fetchCurrencies = async () => {
    try {
      const response = await fetch('/api/payments');
      const data = await response.json();

      if (data.currencies) {
        setCurrencies(data.currencies);
      }

      // Check if we're using mock payments
      if (data.isMockMode) {
        setIsMockPayment(true);
      }
    } catch (error) {
      console.error('Error fetching currencies:', error);
      setError('Failed to load payment options. Please try again.');
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      let response;

      if (promptId) {
        // Process prompt purchase
        response = await fetch('/api/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            promptId,
            payCurrency: selectedCurrency,
          }),
        });
      } else if (plan) {
        // Process subscription
        response = await fetch('/api/subscriptions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plan,
            payCurrency: selectedCurrency,
          }),
        });
      } else {
        throw new Error('Invalid payment request');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment processing failed');
      }

      // Redirect to payment status page
      if (data.redirectUrl) {
        router.push(data.redirectUrl);
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      setError(error.message || 'Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-300">Loading payment options...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Crypto Payment</h1>
        <p className="text-lg text-gray-300 mb-8 max-w-xl text-center">
          Securely complete your purchase with cryptocurrency and unlock premium AI prompts instantly.
        </p>

        <div className="w-full max-w-md bg-gray-800/60 rounded-xl p-8 border border-gray-700 shadow-lg">
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-100 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {isMockPayment && (
            <div className="bg-blue-900/50 border border-blue-700 text-blue-100 px-4 py-3 rounded-lg mb-6">
              <p className="font-medium">Development Mode</p>
              <p className="text-sm">Using mock payment system. No real transactions will be processed.</p>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Payment Details</h2>
            <p className="text-gray-300 mb-4">
              {promptId ? 'You are purchasing a premium prompt.' :
               plan === 'monthly' ? 'Monthly Subscription - $9.99/month' :
               plan === 'yearly' ? 'Yearly Subscription - $99.99/year' :
               'Please select a product to purchase.'}
            </p>

            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Select Cryptocurrency</label>
              <CryptoDropdown
                currencies={currencies.length === 0 ? ['BTC'] : currencies}
                selectedCurrency={selectedCurrency}
                onChange={setSelectedCurrency}
                disabled={loading || currencies.length === 0}
              />
            </div>

            <div className="bg-gray-700/50 rounded-lg p-4 mb-6 border border-gray-600">
              <h3 className="text-purple-400 font-medium mb-2">Why Crypto?</h3>
              <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                <li>Secure and private transactions</li>
                <li>Lower transaction fees</li>
                <li>Fast global payments</li>
                <li>No need for credit card information</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              onClick={handlePayment}
              disabled={loading || !selectedCurrency}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                loading
                  ? 'bg-purple-700 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"></span>
                  Processing...
                </span>
              ) : (
                'Pay with Cryptocurrency'
              )}
            </button>

            <Link
              href={promptId ? `/prompt/${promptId}` : '/'}
              className="text-center text-gray-400 hover:text-white transition-colors"
            >
              Cancel and return
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center max-w-md">
          <p className="text-gray-400 text-sm">
            Payments are processed securely through NOWPayments, a leading cryptocurrency payment gateway.
            Your transaction will be confirmed on the blockchain network.
          </p>
        </div>
      </div>
    </Layout>
  );
}

// Loading fallback component
function PaymentLoading() {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        <p className="mt-4 text-gray-300">Loading payment options...</p>
      </div>
    </Layout>
  );
}

// Main component with Suspense boundary
export default function Payment() {
  return (
    <Suspense fallback={<PaymentLoading />}>
      <PaymentContent />
    </Suspense>
  );
}