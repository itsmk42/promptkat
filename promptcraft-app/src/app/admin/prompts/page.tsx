"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';
import Image from 'next/image';

interface Prompt {
  id: string;
  title: string;
  description: string;
  price: number;
  type: string;
  featured: boolean;
  category: string;
  categoryColor: string;
  author: string;
  createdAt: string;
  sales: number;
}

export default function AdminPrompts() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/admin/prompts');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin' && session?.user?.role !== 'superadmin') {
      router.push('/unauthorized');
    }
  }, [status, session, router]);

  // Fetch prompts
  useEffect(() => {
    if (status === 'authenticated' && (session?.user?.role === 'admin' || session?.user?.role === 'superadmin')) {
      // For now, we'll use mock data
      // In a real app, you would fetch this data from your API
      const mockPrompts: Prompt[] = [
        {
          id: '1',
          title: 'Professional LinkedIn Profile Writer',
          description: 'Create a compelling LinkedIn profile that highlights your professional achievements.',
          price: 9.99,
          type: 'text',
          featured: true,
          category: 'Marketing',
          categoryColor: 'pink',
          author: 'admin@example.com',
          createdAt: '2023-05-01',
          sales: 42
        },
        {
          id: '2',
          title: 'SEO Blog Post Generator',
          description: 'Generate SEO-optimized blog posts that rank well in search engines.',
          price: 12.99,
          type: 'text',
          featured: true,
          category: 'Content',
          categoryColor: 'blue',
          author: 'admin@example.com',
          createdAt: '2023-05-02',
          sales: 38
        },
        {
          id: '3',
          title: 'Product Description Generator',
          description: 'Create compelling product descriptions that convert browsers into buyers.',
          price: 7.99,
          type: 'text',
          featured: false,
          category: 'E-commerce',
          categoryColor: 'green',
          author: 'admin@example.com',
          createdAt: '2023-05-03',
          sales: 35
        },
        {
          id: '4',
          title: 'Logo Design Prompt',
          description: 'Generate professional logo designs for your brand or business.',
          price: 14.99,
          type: 'image',
          featured: true,
          category: 'Design',
          categoryColor: 'purple',
          author: 'admin@example.com',
          createdAt: '2023-05-04',
          sales: 28
        },
        {
          id: '5',
          title: 'Social Media Post Generator',
          description: 'Create engaging social media posts that drive engagement and growth.',
          price: 8.99,
          type: 'text',
          featured: false,
          category: 'Marketing',
          categoryColor: 'pink',
          author: 'admin@example.com',
          createdAt: '2023-05-05',
          sales: 25
        },
      ];

      setPrompts(mockPrompts);
      setLoading(false);
    }
  }, [status, session]);

  // Filter and sort prompts
  const filteredPrompts = prompts
    .filter(prompt => {
      // Search filter
      const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prompt.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = categoryFilter === 'all' || prompt.category === categoryFilter;

      // Type filter
      const matchesType = typeFilter === 'all' || prompt.type === typeFilter;

      return matchesSearch && matchesCategory && matchesType;
    })
    .sort((a, b) => {
      // Sort
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'price-high':
          return b.price - a.price;
        case 'price-low':
          return a.price - b.price;
        case 'sales':
          return b.sales - a.sales;
        default:
          return 0;
      }
    });

  // Get unique categories for filter
  const categories = ['all', ...new Set(prompts.map(prompt => prompt.category))];

  // Handle feature toggle
  const handleFeatureToggle = (id: string) => {
    setPrompts(prompts.map(prompt =>
      prompt.id === id ? { ...prompt, featured: !prompt.featured } : prompt
    ));

    // In a real app, you would call your API to update the prompt
    // Example: await fetch(`/api/admin/prompts/${id}/feature`, { method: 'PATCH' });
  };

  // Handle prompt deletion
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this prompt? This action cannot be undone.')) {
      setPrompts(prompts.filter(prompt => prompt.id !== id));

      // In a real app, you would call your API to delete the prompt
      // Example: await fetch(`/api/admin/prompts/${id}`, { method: 'DELETE' });
    }
  };

  if (status === 'loading' || loading) {
    return (
      <AdminLayout>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-white">Prompts Management</h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-10 bg-gray-700 rounded"></div>
                  <div className="space-y-3">
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
            <h1 className="text-2xl font-semibold text-white">Prompts Management</h1>
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Link href="/admin/prompts/import" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Import CSV
              </Link>
              <Link href="/admin/prompts/new" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Prompt
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-4">
          {/* Filters */}
          <div className="bg-gray-800 p-4 rounded-lg shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-400">Search</label>
                <input
                  type="text"
                  id="search"
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                  placeholder="Search prompts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category filter */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-400">Category</label>
                <select
                  id="category"
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type filter */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-400">Type</label>
                <select
                  id="type"
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="text">Text</option>
                  <option value="image">Image</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-400">Sort By</label>
                <select
                  id="sort"
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="sales">Most Sales</option>
                </select>
              </div>
            </div>
          </div>

          {/* Prompts table */}
          <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Prompt
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Sales
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Featured
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {filteredPrompts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-400">
                        No prompts found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredPrompts.map((prompt) => (
                      <tr key={prompt.id} className="hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-700 rounded-full flex items-center justify-center">
                              {prompt.type === 'image' ? (
                                <svg className="h-6 w-6 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              ) : (
                                <svg className="h-6 w-6 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{prompt.title}</div>
                              <div className="text-sm text-gray-400">{prompt.description.substring(0, 50)}...</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-${prompt.categoryColor}-900/30 text-${prompt.categoryColor}-400 border border-${prompt.categoryColor}-800/50`}>
                            {prompt.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          ${prompt.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {prompt.sales}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          <button
                            onClick={() => handleFeatureToggle(prompt.id)}
                            className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${prompt.featured ? 'bg-purple-600' : 'bg-gray-600'}`}
                            role="switch"
                            aria-checked={prompt.featured}
                          >
                            <span className="sr-only">Feature prompt</span>
                            <span
                              aria-hidden="true"
                              className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${prompt.featured ? 'translate-x-5' : 'translate-x-0'}`}
                            ></span>
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link href={`/admin/prompts/${prompt.id}`} className="text-purple-400 hover:text-purple-300">
                              View
                            </Link>
                            <Link href={`/admin/prompts/${prompt.id}/edit`} className="text-blue-400 hover:text-blue-300">
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(prompt.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
