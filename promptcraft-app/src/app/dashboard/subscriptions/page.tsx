"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Layout from '@/components/Layout';
import Link from 'next/link';

interface Payment {
  id: string;
  paymentId: string;
  paymentStatus: string;
  payAmount: number;
  payCurrency: string;
  priceAmount: number;
  priceCurrency: string;
}

interface Subscription {
  id: string;
  status: string;
  startDate: string;
  endDate: string | null;
  plan: string;
  price: number;
  autoRenew: boolean;
  createdAt: string;
  updatedAt: string;
  payment: Payment | null;
}

export default function Subscriptions() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelLoading, setCancelLoading] = useState<string | null>(null);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/dashboard/subscriptions');
    }
  }, [status, router]);
  
  // Fetch subscriptions when component mounts
  useEffect(() => {
    if (status === 'authenticated') {
      fetchSubscriptions();
    }
  }, [status]);
  
  const fetchSubscriptions = async () => {
    try {
      const response = await fetch('/api/subscriptions');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch subscriptions');
      }
      
      setSubscriptions(data);
    } catch (error: any) {
      console.error('Error fetching subscriptions:', error);
      setError(error.message || 'Failed to fetch subscriptions');
    } finally {
      setLoading(false);
    }
  };
  
  const cancelSubscription = async (subscriptionId: string) => {
    setCancelLoading(subscriptionId);
    
    try {
      const response = await fetch('/api/subscriptions', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel subscription');
      }
      
      // Update the subscription in the list
      setSubscriptions(subscriptions.map(sub => 
        sub.id === subscriptionId ? { ...sub, status: 'cancelled', autoRenew: false } : sub
      ));
    } catch (error: any) {
      console.error('Error cancelling subscription:', error);
      setError(error.message || 'Failed to cancel subscription');
    } finally {
      setCancelLoading(null);
    }
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-900/50 text-green-200 border border-green-700">
            Active
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-red-900/50 text-red-200 border border-red-700">
            Cancelled
          </span>
        );
      case 'expired':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-200 border border-gray-600">
            Expired
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-200 border border-gray-600">
            {status}
          </span>
        );
    }
  };
  
  if (status === 'loading' || loading) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-300">Loading your subscriptions...</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">My Subscriptions</h1>
            <Link
              href="/dashboard"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
          
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-100 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          {subscriptions.length === 0 ? (
            <div className="bg-gray-800/60 rounded-xl p-8 border border-gray-700 shadow-lg text-center">
              <h2 className="text-xl font-semibold mb-4">No Active Subscriptions</h2>
              <p className="text-gray-400 mb-6">
                You don't have any active subscriptions. Subscribe to get unlimited access to premium prompts.
              </p>
              <Link
                href="/pricing"
                className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                View Subscription Plans
              </Link>
            </div>
          ) : (
            <div className="bg-gray-800/60 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-700/50 border-b border-gray-600">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Plan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Start Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        End Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Auto-Renew
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {subscriptions.map((subscription) => (
                      <tr key={subscription.id} className="hover:bg-gray-700/30">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {subscription.plan === 'monthly' ? 'Monthly Plan' : 'Yearly Plan'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {formatDate(subscription.startDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {formatDate(subscription.endDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          ${subscription.price.toFixed(2)}/{subscription.plan === 'monthly' ? 'month' : 'year'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(subscription.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {subscription.autoRenew ? (
                            <span className="text-green-400">Yes</span>
                          ) : (
                            <span className="text-red-400">No</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {subscription.status === 'active' && subscription.autoRenew ? (
                            <button
                              onClick={() => cancelSubscription(subscription.id)}
                              disabled={cancelLoading === subscription.id}
                              className={`text-red-400 hover:text-red-300 transition-colors ${
                                cancelLoading === subscription.id ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                            >
                              {cancelLoading === subscription.id ? 'Cancelling...' : 'Cancel Subscription'}
                            </button>
                          ) : subscription.payment && ['waiting', 'confirming', 'confirmed', 'sending'].includes(subscription.payment.paymentStatus) ? (
                            <Link
                              href={`/payment/status?paymentId=${subscription.payment.paymentId}&type=subscription`}
                              className="text-purple-400 hover:text-purple-300 transition-colors"
                            >
                              Check Payment
                            </Link>
                          ) : (
                            <span className="text-gray-500">
                              {subscription.status === 'active' ? 'Active until end date' : 'No actions available'}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Need help with your subscription? Contact our support team at support@promptcraft.ai
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
