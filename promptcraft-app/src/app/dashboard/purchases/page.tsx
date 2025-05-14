"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Layout from '@/components/Layout';
import Link from 'next/link';

interface Prompt {
  id: string;
  title: string;
  description: string;
  image: string | null;
  type: string;
}

interface Payment {
  id: string;
  paymentId: string;
  paymentStatus: string;
  payAmount: number;
  payCurrency: string;
  priceAmount: number;
  priceCurrency: string;
}

interface Purchase {
  id: string;
  purchaseDate: string;
  price: number;
  status: string;
  prompt: Prompt;
  payment: Payment | null;
}

export default function Purchases() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/dashboard/purchases');
    }
  }, [status, router]);
  
  // Fetch purchases when component mounts
  useEffect(() => {
    if (status === 'authenticated') {
      fetchPurchases();
    }
  }, [status]);
  
  const fetchPurchases = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch purchases');
      }
      
      setPurchases(data);
    } catch (error: any) {
      console.error('Error fetching purchases:', error);
      setError(error.message || 'Failed to fetch purchases');
    } finally {
      setLoading(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
      case 'finished':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-900/50 text-green-200 border border-green-700">
            Completed
          </span>
        );
      case 'pending':
      case 'waiting':
      case 'confirming':
      case 'confirmed':
      case 'sending':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-yellow-900/50 text-yellow-200 border border-yellow-700">
            Pending
          </span>
        );
      case 'failed':
      case 'expired':
      case 'refunded':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-red-900/50 text-red-200 border border-red-700">
            Failed
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
          <p className="mt-4 text-gray-300">Loading your purchases...</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">My Purchases</h1>
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
          
          {purchases.length === 0 ? (
            <div className="bg-gray-800/60 rounded-xl p-8 border border-gray-700 shadow-lg text-center">
              <h2 className="text-xl font-semibold mb-4">No Purchases Yet</h2>
              <p className="text-gray-400 mb-6">
                You haven't purchased any prompts yet. Browse our collection to find premium AI prompts.
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                Browse Prompts
              </Link>
            </div>
          ) : (
            <div className="bg-gray-800/60 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-700/50 border-b border-gray-600">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Prompt
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {purchases.map((purchase) => (
                      <tr key={purchase.id} className="hover:bg-gray-700/30">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {purchase.prompt.image && (
                              <div className="flex-shrink-0 h-10 w-10 mr-3">
                                <img
                                  className="h-10 w-10 rounded-md object-cover"
                                  src={purchase.prompt.image}
                                  alt={purchase.prompt.title}
                                />
                              </div>
                            )}
                            <div>
                              <div className="text-sm font-medium text-white">
                                {purchase.prompt.title}
                              </div>
                              <div className="text-xs text-gray-400">
                                {purchase.prompt.type === 'text' ? 'Text Prompt' : 'Image Prompt'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {formatDate(purchase.purchaseDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          ${purchase.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(purchase.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {purchase.status === 'completed' || purchase.status === 'finished' ? (
                            <Link
                              href={`/prompt/${purchase.prompt.id}`}
                              className="text-purple-400 hover:text-purple-300 transition-colors"
                            >
                              View Prompt
                            </Link>
                          ) : purchase.payment ? (
                            <Link
                              href={`/payment/status?paymentId=${purchase.payment.paymentId}`}
                              className="text-purple-400 hover:text-purple-300 transition-colors"
                            >
                              Check Status
                            </Link>
                          ) : (
                            <span className="text-gray-500">Unavailable</span>
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
              Need help with your purchases? Contact our support team at support@promptcraft.ai
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
