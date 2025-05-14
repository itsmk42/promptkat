"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  promptCount: number;
}

export default function AdminCategories() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  
  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/admin/categories');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin' && session?.user?.role !== 'superadmin') {
      router.push('/unauthorized');
    }
  }, [status, session, router]);
  
  // Fetch categories
  useEffect(() => {
    if (status === 'authenticated' && (session?.user?.role === 'admin' || session?.user?.role === 'superadmin')) {
      // For now, we'll use mock data
      // In a real app, you would fetch this data from your API
      const mockCategories: Category[] = [
        {
          id: '1',
          name: 'Marketing',
          description: 'Prompts for marketing content, social media, and advertising',
          color: 'pink',
          icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
          promptCount: 12
        },
        {
          id: '2',
          name: 'Content',
          description: 'Prompts for blog posts, articles, and other written content',
          color: 'blue',
          icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
          promptCount: 8
        },
        {
          id: '3',
          name: 'E-commerce',
          description: 'Prompts for product descriptions, listings, and e-commerce content',
          color: 'green',
          icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
          promptCount: 6
        },
        {
          id: '4',
          name: 'Design',
          description: 'Prompts for graphic design, UI/UX, and visual content',
          color: 'purple',
          icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
          promptCount: 5
        },
        {
          id: '5',
          name: 'Development',
          description: 'Prompts for coding, programming, and development tasks',
          color: 'yellow',
          icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
          promptCount: 7
        },
      ];
      
      setCategories(mockCategories);
      setLoading(false);
    }
  }, [status, session]);
  
  // Filter and sort categories
  const filteredCategories = categories
    .filter(category => {
      // Search filter
      return category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             category.description.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      // Sort
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'prompts-high':
          return b.promptCount - a.promptCount;
        case 'prompts-low':
          return a.promptCount - b.promptCount;
        default:
          return 0;
      }
    });
  
  // Handle category deletion
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category? This will affect all prompts in this category.')) {
      setCategories(categories.filter(category => category.id !== id));
      
      // In a real app, you would call your API to delete the category
      // Example: await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
    }
  };
  
  if (status === 'loading' || loading) {
    return (
      <AdminLayout>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-white">Categories Management</h1>
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
            <h1 className="text-2xl font-semibold text-white">Categories Management</h1>
            <Link href="/admin/categories/new" className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Category
            </Link>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-4">
          {/* Filters */}
          <div className="bg-gray-800 p-4 rounded-lg shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-400">Search</label>
                <input
                  type="text"
                  id="search"
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="prompts-high">Prompts (High to Low)</option>
                  <option value="prompts-low">Prompts (Low to High)</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Categories grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCategories.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-gray-800 rounded-lg">
                <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-white">No categories found</h3>
                <p className="mt-1 text-sm text-gray-400">No categories match your search criteria.</p>
              </div>
            ) : (
              filteredCategories.map((category) => (
                <div key={category.id} className="bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 rounded-md p-3 bg-${category.color}-500/20`}>
                        <svg className={`h-6 w-6 text-${category.color}-400`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={category.icon} />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="truncate text-sm font-medium text-white">{category.name}</dt>
                          <dd>
                            <div className="text-sm text-gray-400">{category.promptCount} prompts</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-400">{category.description}</p>
                    </div>
                  </div>
                  <div className="bg-gray-700 px-5 py-3 flex justify-between items-center">
                    <div className="text-sm">
                      <Link href={`/admin/categories/${category.id}`} className="font-medium text-purple-400 hover:text-purple-300">View details</Link>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/admin/categories/${category.id}/edit`} className="text-sm font-medium text-blue-400 hover:text-blue-300">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="text-sm font-medium text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
