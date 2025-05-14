"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AdminLayout from '@/components/AdminLayout';

interface SalesData {
  date: string;
  amount: number;
  count: number;
}

interface CategoryData {
  name: string;
  count: number;
  revenue: number;
  color: string;
}

interface UserData {
  date: string;
  count: number;
}

export default function AdminAnalytics() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [timeRange, setTimeRange] = useState('30days');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalRevenue: 0,
    totalUsers: 0,
    newUsers: 0,
    salesData: [] as SalesData[],
    categoryData: [] as CategoryData[],
    userData: [] as UserData[],
  });
  
  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/admin/analytics');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin' && session?.user?.role !== 'superadmin') {
      router.push('/unauthorized');
    }
  }, [status, session, router]);
  
  // Fetch analytics data
  useEffect(() => {
    if (status === 'authenticated' && (session?.user?.role === 'admin' || session?.user?.role === 'superadmin')) {
      // For now, we'll use mock data
      // In a real app, you would fetch this data from your API based on the selected time range
      
      // Generate mock sales data for the last 30 days
      const salesData: SalesData[] = [];
      const now = new Date();
      let totalSales = 0;
      let totalRevenue = 0;
      
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        
        // Random sales count between 0 and 10
        const count = Math.floor(Math.random() * 11);
        // Random amount between $5 and $15 per sale
        const amount = count * (5 + Math.random() * 10);
        
        totalSales += count;
        totalRevenue += amount;
        
        salesData.push({
          date: dateString,
          count,
          amount
        });
      }
      
      // Mock category data
      const categoryData: CategoryData[] = [
        { name: 'Marketing', count: 42, revenue: 419.58, color: 'pink' },
        { name: 'Content', count: 38, revenue: 493.62, color: 'blue' },
        { name: 'E-commerce', count: 35, revenue: 279.65, color: 'green' },
        { name: 'Design', count: 28, revenue: 419.72, color: 'purple' },
        { name: 'Development', count: 25, revenue: 249.75, color: 'yellow' },
      ];
      
      // Mock user data for the last 30 days
      const userData: UserData[] = [];
      let totalUsers = 156;
      let newUsers = 0;
      
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        
        // Random new users between 0 and 5
        const count = Math.floor(Math.random() * 6);
        newUsers += count;
        
        userData.push({
          date: dateString,
          count
        });
      }
      
      setStats({
        totalSales,
        totalRevenue,
        totalUsers,
        newUsers,
        salesData,
        categoryData,
        userData
      });
      
      setLoading(false);
    }
  }, [status, session, timeRange]);
  
  if (status === 'loading' || loading) {
    return (
      <AdminLayout>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-white">Analytics</h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-10 bg-gray-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-semibold text-white">Analytics</h1>
            <div className="mt-4 md:mt-0">
              <select
                id="timeRange"
                className="block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="year">Last Year</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-4">
          {/* Stats cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-400 truncate">Total Revenue</dt>
                      <dd>
                        <div className="text-lg font-medium text-white">${stats.totalRevenue.toFixed(2)}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-400 truncate">Total Sales</dt>
                      <dd>
                        <div className="text-lg font-medium text-white">{stats.totalSales}</div>
                      </dd>
                    </dl>
                  </div>
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
                      <dt className="text-sm font-medium text-gray-400 truncate">Total Users</dt>
                      <dd>
                        <div className="text-lg font-medium text-white">{stats.totalUsers}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-pink-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-400 truncate">New Users</dt>
                      <dd>
                        <div className="text-lg font-medium text-white">{stats.newUsers}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sales chart */}
          <div className="mt-8 bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-5 py-4 border-b border-gray-700">
              <h3 className="text-lg leading-6 font-medium text-white">Sales Overview</h3>
            </div>
            <div className="p-5">
              <div className="h-80 relative">
                {/* In a real app, you would use a charting library like Chart.js or Recharts */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-400">Sales chart would be displayed here.</p>
                  <p className="text-gray-400">In a real app, use a charting library like Chart.js or Recharts.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Category breakdown and user growth */}
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Category breakdown */}
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="px-5 py-4 border-b border-gray-700">
                <h3 className="text-lg leading-6 font-medium text-white">Sales by Category</h3>
              </div>
              <div className="p-5">
                <div className="flow-root">
                  <ul className="-my-5 divide-y divide-gray-700">
                    {stats.categoryData.map((category) => (
                      <li key={category.name} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className={`flex-shrink-0 h-8 w-8 rounded-full bg-${category.color}-500/20 flex items-center justify-center`}>
                            <div className={`h-4 w-4 rounded-full bg-${category.color}-500`}></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{category.name}</p>
                            <p className="text-sm text-gray-400 truncate">{category.count} sales</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-white">${category.revenue.toFixed(2)}</p>
                            <p className="text-sm text-gray-400">{Math.round((category.revenue / stats.totalRevenue) * 100)}%</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* User growth */}
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="px-5 py-4 border-b border-gray-700">
                <h3 className="text-lg leading-6 font-medium text-white">User Growth</h3>
              </div>
              <div className="p-5">
                <div className="h-80 relative">
                  {/* In a real app, you would use a charting library like Chart.js or Recharts */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-400">User growth chart would be displayed here.</p>
                    <p className="text-gray-400">In a real app, use a charting library like Chart.js or Recharts.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent sales table */}
          <div className="mt-8 bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-5 py-4 border-b border-gray-700">
              <h3 className="text-lg leading-6 font-medium text-white">Recent Sales</h3>
            </div>
            <div className="p-5">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Sales Count
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {stats.salesData.slice(-10).map((day) => (
                      <tr key={day.date} className="hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {new Date(day.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {day.count}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          ${day.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
