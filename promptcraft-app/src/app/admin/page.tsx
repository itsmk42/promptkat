"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [stats, setStats] = useState({
    totalPrompts: 0,
    totalCategories: 0,
    totalUsers: 0,
    totalSales: 0,
    recentSales: [],
    topPrompts: []
  });
  
  const [loading, setLoading] = useState(true);
  
  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/admin');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin' && session?.user?.role !== 'superadmin') {
      router.push('/unauthorized');
    }
  }, [status, session, router]);
  
  // Fetch dashboard data
  useEffect(() => {
    if (status === 'authenticated' && (session?.user?.role === 'admin' || session?.user?.role === 'superadmin')) {
      // For now, we'll use mock data
      // In a real app, you would fetch this data from your API
      setStats({
        totalPrompts: 24,
        totalCategories: 8,
        totalUsers: 156,
        totalSales: 1250.75,
        recentSales: [
          { id: '1', user: 'user@example.com', prompt: 'Professional LinkedIn Profile Writer', amount: 9.99, date: '2023-05-10' },
          { id: '2', user: 'customer@example.com', prompt: 'SEO Blog Post Generator', amount: 12.99, date: '2023-05-09' },
          { id: '3', user: 'client@example.com', prompt: 'Product Description Generator', amount: 7.99, date: '2023-05-08' },
        ],
        topPrompts: [
          { id: '1', title: 'Professional LinkedIn Profile Writer', sales: 42, revenue: 419.58 },
          { id: '2', title: 'SEO Blog Post Generator', sales: 38, revenue: 493.62 },
          { id: '3', title: 'Product Description Generator', sales: 35, revenue: 279.65 },
        ]
      });
      setLoading(false);
    }
  }, [status, session]);
  
  if (status === 'loading' || loading) {
    return (
      <AdminLayout>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-40 bg-gray-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-20 bg-gray-700 rounded col-span-1"></div>
                      <div className="h-20 bg-gray-700 rounded col-span-1"></div>
                      <div className="h-20 bg-gray-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-60 bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Stats cards */}
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-400 truncate">Total Prompts</dt>
                      <dd>
                        <div className="text-lg font-medium text-white">{stats.totalPrompts}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 px-5 py-3">
                <div className="text-sm">
                  <Link href="/admin/prompts" className="font-medium text-purple-400 hover:text-purple-300">View all</Link>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-pink-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-400 truncate">Categories</dt>
                      <dd>
                        <div className="text-lg font-medium text-white">{stats.totalCategories}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 px-5 py-3">
                <div className="text-sm">
                  <Link href="/admin/categories" className="font-medium text-purple-400 hover:text-purple-300">View all</Link>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-400 truncate">Users</dt>
                      <dd>
                        <div className="text-lg font-medium text-white">{stats.totalUsers}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 px-5 py-3">
                <div className="text-sm">
                  <Link href="/admin/users" className="font-medium text-purple-400 hover:text-purple-300">View all</Link>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-400 truncate">Total Sales</dt>
                      <dd>
                        <div className="text-lg font-medium text-white">${stats.totalSales.toFixed(2)}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 px-5 py-3">
                <div className="text-sm">
                  <Link href="/admin/analytics" className="font-medium text-purple-400 hover:text-purple-300">View details</Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent sales and top prompts */}
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Recent sales */}
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="px-5 py-4 border-b border-gray-700">
                <h3 className="text-lg leading-6 font-medium text-white">Recent Sales</h3>
              </div>
              <div className="p-5">
                <div className="flow-root">
                  <ul className="-my-5 divide-y divide-gray-700">
                    {stats.recentSales.map((sale) => (
                      <li key={sale.id} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{sale.prompt}</p>
                            <p className="text-sm text-gray-400 truncate">{sale.user}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-white">${sale.amount.toFixed(2)}</p>
                            <p className="text-sm text-gray-400">{sale.date}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-gray-700 px-5 py-3">
                <div className="text-sm">
                  <Link href="/admin/analytics" className="font-medium text-purple-400 hover:text-purple-300">View all sales</Link>
                </div>
              </div>
            </div>
            
            {/* Top prompts */}
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="px-5 py-4 border-b border-gray-700">
                <h3 className="text-lg leading-6 font-medium text-white">Top Selling Prompts</h3>
              </div>
              <div className="p-5">
                <div className="flow-root">
                  <ul className="-my-5 divide-y divide-gray-700">
                    {stats.topPrompts.map((prompt) => (
                      <li key={prompt.id} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{prompt.title}</p>
                            <p className="text-sm text-gray-400 truncate">{prompt.sales} sales</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-white">${prompt.revenue.toFixed(2)}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-gray-700 px-5 py-3">
                <div className="text-sm">
                  <Link href="/admin/prompts" className="font-medium text-purple-400 hover:text-purple-300">View all prompts</Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick actions */}
          <div className="mt-8 bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-5 py-4 border-b border-gray-700">
              <h3 className="text-lg leading-6 font-medium text-white">Quick Actions</h3>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <Link href="/admin/prompts/new" className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-center transition">
                  <svg className="h-8 w-8 text-purple-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="mt-2 text-sm font-medium text-white block">Add Prompt</span>
                </Link>
                
                <Link href="/admin/categories/new" className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-center transition">
                  <svg className="h-8 w-8 text-pink-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="mt-2 text-sm font-medium text-white block">Add Category</span>
                </Link>
                
                <Link href="/admin/analytics" className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-center transition">
                  <svg className="h-8 w-8 text-blue-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="mt-2 text-sm font-medium text-white block">View Analytics</span>
                </Link>
                
                <Link href="/admin/settings" className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-center transition">
                  <svg className="h-8 w-8 text-green-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="mt-2 text-sm font-medium text-white block">Settings</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
