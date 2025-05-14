"use client";

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';

// Available colors for categories
const colorOptions = [
  { name: 'Red', value: 'red' },
  { name: 'Pink', value: 'pink' },
  { name: 'Purple', value: 'purple' },
  { name: 'Indigo', value: 'indigo' },
  { name: 'Blue', value: 'blue' },
  { name: 'Cyan', value: 'cyan' },
  { name: 'Teal', value: 'teal' },
  { name: 'Green', value: 'green' },
  { name: 'Yellow', value: 'yellow' },
  { name: 'Orange', value: 'orange' },
];

// Available icons for categories
const iconOptions = [
  { name: 'Document', value: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { name: 'Tag', value: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
  { name: 'Megaphone', value: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
  { name: 'Light Bulb', value: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { name: 'Code', value: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  { name: 'Briefcase', value: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { name: 'Chart', value: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { name: 'Camera', value: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' },
  { name: 'Globe', value: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
];

export default function NewCategory() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('purple');
  const [icon, setIcon] = useState(iconOptions[0].value);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/admin/categories/new');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin' && session?.user?.role !== 'superadmin') {
      router.push('/unauthorized');
    }
  }, [status, session, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !description || !color || !icon) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          color,
          icon,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create category');
      }

      // Redirect to categories page
      router.push('/admin/categories');
    } catch (error: any) {
      console.error('Error creating category:', error);
      setError(error.message || 'An error occurred while creating the category');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <AdminLayout>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-white">Add New Category</h1>
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
      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">Add New Category</h1>
            <Link href="/admin/categories" className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700">
              Cancel
            </Link>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-6">
            <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <div className="px-5 py-6 sm:p-6">
                {error && (
                  <div className="mb-5 bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-xs">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-7">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-gray-300">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1.5 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-1.5 px-3 text-sm text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., Marketing"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-xs font-medium text-gray-300">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="mt-1.5 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-1.5 px-3 text-sm text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., Prompts for marketing content, social media, and advertising"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="color" className="block text-xs font-medium text-gray-300">
                      Color <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2 grid grid-cols-5 gap-3">
                      {colorOptions.map((option) => (
                        <div key={option.value} className="relative">
                          <input
                            type="radio"
                            id={`color-${option.value}`}
                            name="color"
                            value={option.value}
                            checked={color === option.value}
                            onChange={() => setColor(option.value)}
                            className="sr-only"
                          />
                          <label
                            htmlFor={`color-${option.value}`}
                            className={`
                              flex items-center justify-center h-8 w-full rounded-md cursor-pointer
                              ${color === option.value ? `ring-2 ring-offset-2 ring-offset-gray-800 ring-${option.value}-500` : ''}
                              bg-${option.value}-500/20 hover:bg-${option.value}-500/30
                            `}
                          >
                            <span className={`h-3 w-3 rounded-full bg-${option.value}-500`}></span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="icon" className="block text-xs font-medium text-gray-300">
                      Icon <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2 grid grid-cols-5 gap-3">
                      {iconOptions.map((option) => (
                        <div key={option.name} className="relative">
                          <input
                            type="radio"
                            id={`icon-${option.name}`}
                            name="icon"
                            value={option.value}
                            checked={icon === option.value}
                            onChange={() => setIcon(option.value)}
                            className="sr-only"
                          />
                          <label
                            htmlFor={`icon-${option.name}`}
                            className={`
                              flex items-center justify-center h-8 w-full rounded-md cursor-pointer
                              ${icon === option.value ? `ring-2 ring-offset-2 ring-offset-gray-800 ring-${color}-500` : ''}
                              bg-gray-700 hover:bg-gray-600
                            `}
                          >
                            <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={option.value} />
                            </svg>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating...
                        </>
                      ) : 'Create Category'}
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
