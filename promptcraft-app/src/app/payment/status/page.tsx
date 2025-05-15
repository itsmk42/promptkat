"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Layout from '@/components/Layout';
import Link from 'next/link';

interface PaymentStatus {
  payment_id: string;
  payment_status: string;
  pay_address: string;
  price_amount: number;
  price_currency: string;
  pay_amount: number;
  pay_currency: string;
}

function PaymentStatusContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();

  const [paymentId, setPaymentId] = useState<string | null>(searchParams.get('paymentId'));
  const [paymentType, setPaymentType] = useState<string | null>(searchParams.get('type') || 'prompt');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/payment/status' + (paymentId ? `?paymentId=${paymentId}` : ''));
    }
  }, [status, router, paymentId]);

  // Redirect if no paymentId
  useEffect(() => {
    if (status === 'authenticated' && !paymentId) {
      router.push('/');
    }
  }, [status, paymentId, router]);

  // Fetch payment status when component mounts
  useEffect(() => {
    if (status === 'authenticated' && paymentId) {
      fetchPaymentStatus();

      // Set up polling for payment status updates
      const interval = setInterval(() => {
        fetchPaymentStatus();
      }, 10000); // Poll every 10 seconds

      setPollingInterval(interval);

      // Clean up interval on unmount
      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }
  }, [status, paymentId]);

  // Stop polling when payment is completed or failed
  useEffect(() => {
    if (paymentStatus && ['finished', 'failed', 'expired', 'refunded'].includes(paymentStatus.payment_status)) {
      if (pollingInterval) {
        clearInterval(pollingInterval);
        setPollingInterval(null);
      }
    }
  }, [paymentStatus, pollingInterval]);

  const fetchPaymentStatus = async () => {
    if (!paymentId) return;

    try {
      const response = await fetch(`/api/payments/status?paymentId=${paymentId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch payment status');
      }

      setPaymentStatus(data);
    } catch (error: any) {
      console.error('Error fetching payment status:', error);
      setError(error.message || 'Failed to fetch payment status');
    } finally {
      setLoading(false);
    }
  };

  const getStatusMessage = () => {
    if (!paymentStatus) return '';

    switch (paymentStatus.payment_status) {
      case 'waiting':
        return 'Waiting for payment. Please send the exact amount to the provided address.';
      case 'confirming':
        return 'Payment received. Waiting for blockchain confirmation.';
      case 'confirmed':
        return 'Payment confirmed on the blockchain.';
      case 'sending':
        return 'Processing your payment.';
      case 'partially_paid':
        return 'Partial payment received. Please send the remaining amount.';
      case 'finished':
        return paymentType === 'subscription'
          ? 'Payment completed! Your subscription is now active.'
          : 'Payment completed! Your prompt purchase was successful.';
      case 'failed':
        return 'Payment failed. Please try again.';
      case 'refunded':
        return 'Payment was refunded.';
      case 'expired':
        return 'Payment expired. Please try again.';
      default:
        return 'Processing payment...';
    }
  };

  const getStatusColor = () => {
    if (!paymentStatus) return 'bg-gray-700';

    switch (paymentStatus.payment_status) {
      case 'finished':
        return 'bg-green-900/50 border-green-700 text-green-100';
      case 'failed':
      case 'expired':
      case 'refunded':
        return 'bg-red-900/50 border-red-700 text-red-100';
      case 'partially_paid':
        return 'bg-yellow-900/50 border-yellow-700 text-yellow-100';
      default:
        return 'bg-blue-900/50 border-blue-700 text-blue-100';
    }
  };

  if (status === 'loading' || loading) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-300">Checking payment status...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Payment Status</h1>

        {error ? (
          <div className="w-full max-w-md bg-red-900/50 border border-red-700 text-red-100 px-6 py-4 rounded-lg mb-6">
            <p>{error}</p>
            <div className="mt-4 flex justify-center">
              <Link href="/" className="text-white bg-red-700 hover:bg-red-800 px-4 py-2 rounded-lg">
                Return Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md bg-gray-800/60 rounded-xl p-8 border border-gray-700 shadow-lg">
            <div className={`px-6 py-4 rounded-lg mb-6 ${getStatusColor()}`}>
              <p className="font-medium">{getStatusMessage()}</p>
            </div>

            {paymentStatus && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Payment Details</h2>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Payment ID:</span>
                      <span className="text-gray-200">{paymentStatus.payment_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-gray-200">{paymentStatus.payment_status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Amount:</span>
                      <span className="text-gray-200">
                        {paymentStatus.price_amount} {paymentStatus.price_currency}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Crypto Amount:</span>
                      <span className="text-gray-200">
                        {paymentStatus.pay_amount} {paymentStatus.pay_currency}
                      </span>
                    </div>
                  </div>
                </div>

                {['waiting', 'partially_paid'].includes(paymentStatus.payment_status) && (
                  <div className="mt-6 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                    <h3 className="font-medium mb-2">Payment Instructions</h3>
                    <p className="text-sm text-gray-300 mb-2">
                      Please send exactly <span className="text-white font-medium">{paymentStatus.pay_amount} {paymentStatus.pay_currency}</span> to the address below:
                    </p>
                    <div className="bg-gray-800 p-3 rounded border border-gray-600 break-all text-xs text-gray-300">
                      {paymentStatus.pay_address}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      The page will automatically update when your payment is detected.
                    </p>
                  </div>
                )}

                {['finished'].includes(paymentStatus.payment_status) && (
                  <div className="mt-6">
                    <Link
                      href={paymentType === 'subscription' ? '/dashboard/subscriptions' : '/dashboard/purchases'}
                      className="block w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium text-center transition-colors"
                    >
                      {paymentType === 'subscription' ? 'View My Subscriptions' : 'View My Purchases'}
                    </Link>
                  </div>
                )}

                {['failed', 'expired', 'refunded'].includes(paymentStatus.payment_status) && (
                  <div className="mt-6">
                    <Link
                      href={paymentType === 'subscription' ? '/pricing' : '/'}
                      className="block w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium text-center transition-colors"
                    >
                      Try Again
                    </Link>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-700">
              <Link href="/" className="text-center block text-gray-400 hover:text-white transition-colors">
                Return to Home
              </Link>
            </div>
          </div>
        )}

        <div className="mt-8 text-center max-w-md">
          <p className="text-gray-400 text-sm">
            Need help with your payment? Contact our support team at support@promptcraft.ai
          </p>
        </div>
      </div>
    </Layout>
  );
}

// Loading fallback component
function PaymentStatusLoading() {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        <p className="mt-4 text-gray-300">Loading payment status...</p>
      </div>
    </Layout>
  );
}

// Main component with Suspense boundary
export default function PaymentStatus() {
  return (
    <Suspense fallback={<PaymentStatusLoading />}>
      <PaymentStatusContent />
    </Suspense>
  );
}
