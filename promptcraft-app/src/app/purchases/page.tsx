"use client";
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';

// This will be replaced with actual data from the API
const samplePurchasedPrompts = [
  {
    id: '1',
    title: 'Professional LinkedIn Profile Writer',
    description: 'Create a compelling LinkedIn profile that highlights your professional achievements.',
    category: 'Marketing',
    categoryColor: 'pink',
    price: 9.99,
    purchaseDate: '2023-12-15',
    type: 'text'
  },
  {
    id: '2',
    title: 'Photorealistic Product Visualization',
    description: 'Generate stunning, photorealistic 3D product renders for marketing materials.',
    category: 'Design',
    categoryColor: 'teal',
    price: 14.99,
    purchaseDate: '2023-11-28',
    type: 'image',
    image: '/images/placeholder-image.svg'
  },
  {
    id: '3',
    title: 'Advanced SQL Query Generator',
    description: 'Generate optimized SQL queries for complex database operations and data analysis.',
    category: 'Programming',
    categoryColor: 'orange',
    price: 12.99,
    purchaseDate: '2023-10-05',
    type: 'text'
  },
];

export default function PurchasesPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [purchases, setPurchases] = useState(samplePurchasedPrompts);

  // Filter purchases based on search query
  const filteredPurchases = purchases.filter(purchase => {
    if (!searchQuery) return true;
    
    return (
      purchase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      purchase.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      purchase.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // In a real app, we would fetch purchases from the API
  useEffect(() => {
    if (session?.user) {
      setIsLoading(true);
      
      // This would be an API call in a real application
      // fetch('/api/purchases')
      //   .then(res => res.json())
      //   .then(data => {
      //     setPurchases(data);
      //     setIsLoading(false);
      //   })
      //   .catch(error => {
      //     console.error('Error fetching purchases:', error);
      //     setIsLoading(false);
      //   });
      
      // For now, just simulate loading
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [session]);

  if (!session?.user) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Purchases</h1>
          <p className="text-lg text-gray-300 mb-8 max-w-xl text-center">
            Please sign in to view your purchased prompts.
          </p>
          <Link href="/login" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition">
            Sign In
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Your Purchases</h1>
                <p className="text-gray-400">Access and use your purchased prompts</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link href="/dashboard" className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Dashboard
                </Link>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search your purchases..."
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <button
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-300"
                    onClick={() => setSearchQuery('')}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Purchases List */}
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <svg className="animate-spin h-8 w-8 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : filteredPurchases.length === 0 ? (
              <div className="bg-gray-800/40 rounded-xl p-8 border border-gray-700 text-center">
                {searchQuery ? (
                  <>
                    <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="text-xl font-bold mb-2">No results found</h3>
                    <p className="text-gray-400 mb-4">No purchases match your search query "{searchQuery}"</p>
                    <button
                      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition"
                      onClick={() => setSearchQuery('')}
                    >
                      Clear Search
                    </button>
                  </>
                ) : (
                  <>
                    <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="text-xl font-bold mb-2">No purchases yet</h3>
                    <p className="text-gray-400 mb-4">Browse our marketplace to find high-quality prompts</p>
                    <Link href="/prompts" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition">
                      Browse Prompts
                    </Link>
                  </>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPurchases.map((purchase) => (
                  <div key={purchase.id} className="bg-gray-800/40 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all h-full flex flex-col">
                    {purchase.type === 'image' && purchase.image && (
                      <div className="relative h-48 w-full">
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60"></div>
                        <Image
                          src={purchase.image}
                          alt={purchase.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6 flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <span className={`px-2 py-1 text-xs rounded-full bg-${purchase.categoryColor}-900/30 text-${purchase.categoryColor}-400 border border-${purchase.categoryColor}-800/50`}>
                          {purchase.category}
                        </span>
                        <span className="text-xs text-gray-400">Purchased: {purchase.purchaseDate}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{purchase.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{purchase.description}</p>
                      <div className="mt-auto flex justify-between items-center">
                        <span className="font-bold text-purple-400">${purchase.price}</span>
                        <Link href={`/prompts/${purchase.id}`} className="text-sm text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-lg transition">
                          Use Prompt
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
