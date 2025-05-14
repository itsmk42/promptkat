"use client";

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  color: string;
}

export default function NewPrompt() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('text');
  const [categoryId, setCategoryId] = useState('');
  const [tags, setTags] = useState('');
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/admin/prompts/new');
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
        { id: '1', name: 'Marketing', color: 'pink' },
        { id: '2', name: 'Creative Writing', color: 'purple' },
        { id: '3', name: 'Programming', color: 'blue' },
        { id: '4', name: 'Business', color: 'green' },
        { id: '5', name: 'Education', color: 'yellow' },
      ];
      
      setCategories(mockCategories);
      
      // Set default category
      if (mockCategories.length > 0 && !categoryId) {
        setCategoryId(mockCategories[0].id);
      }
    }
  }, [status, session, categoryId]);
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!title || !description || !content || !price || !type || !categoryId) {
      setError('Please fill in all required fields');
      return;
    }
    
    // Validate price
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      setError('Please enter a valid price');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Process tags
      const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const response = await fetch('/api/admin/prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          content,
          price: priceValue,
          type,
          categoryId,
          tags: tagArray,
          featured,
          image,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create prompt');
      }
      
      // Redirect to prompts page
      router.push('/admin/prompts');
    } catch (error: any) {
      console.error('Error creating prompt:', error);
      setError(error.message || 'An error occurred while creating the prompt');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (status === 'loading') {
    return (
      <AdminLayout>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-white">Add New Prompt</h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-40 bg-gray-700 rounded"></div>
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
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-white">Add New Prompt</h1>
            <Link href="/admin/prompts" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700">
              Cancel
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                {error && (
                  <div className="mb-4 bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., Professional LinkedIn Profile Writer"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., Create a compelling LinkedIn profile that highlights your professional achievements."
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-300">
                      Prompt Content <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={6}
                      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter the actual prompt content here..."
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-300">
                        Price ($) <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-400 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          id="price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 pl-7 pr-3 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                          placeholder="9.99"
                          step="0.01"
                          min="0.99"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-300">
                        Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        required
                      >
                        <option value="text">Text</option>
                        <option value="image">Image</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="categoryId" className="block text-sm font-medium text-gray-300">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="categoryId"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      required
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-300">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      id="tags"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., linkedin, profile, professional"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-300">
                      Image URL
                    </label>
                    <input
                      type="text"
                      id="image"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., https://example.com/image.jpg"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="featured"
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-300">
                      Feature this prompt on the homepage
                    </label>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating...
                        </>
                      ) : 'Create Prompt'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
