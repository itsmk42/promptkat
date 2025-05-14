"use client";
import { useState } from 'react';
import Layout from '@/components/Layout';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

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
];

// This will be replaced with actual data from the API
const sampleFavorites = [
  {
    id: '3',
    title: 'Code Debugging Assistant',
    description: 'Describe your coding problem and get suggestions for debugging.',
    category: 'Programming',
    categoryColor: 'orange',
    price: 8.99,
    type: 'text'
  },
  {
    id: '4',
    title: 'Daily Productivity Planner',
    description: 'Structure your day for maximum productivity with this planning prompt.',
    category: 'Personal Development',
    categoryColor: 'yellow',
    price: 7.99,
    type: 'text'
  },
];

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('purchases');

  if (!session?.user) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Dashboard</h1>
          <p className="text-lg text-gray-300 mb-8 max-w-xl text-center">
            Please sign in to access your dashboard.
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
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Your Dashboard</h1>
                <p className="text-gray-400">Manage your purchased prompts and favorites</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Link href="/settings" className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </Link>
                <Link href="/profile" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </Link>
              </div>
            </div>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Purchased Prompts</h3>
                  <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold">{samplePurchasedPrompts.length}</div>
                <p className="text-gray-400 text-sm mt-1">Total purchased prompts</p>
                <Link href="/purchases" className="text-sm text-purple-400 hover:text-purple-300 mt-2 inline-block">
                  View All Purchases
                </Link>
              </div>

              <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Favorites</h3>
                  <div className="w-10 h-10 rounded-full bg-pink-600/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold">{sampleFavorites.length}</div>
                <p className="text-gray-400 text-sm mt-1">Saved favorites</p>
                <Link href="/favorites" className="text-sm text-purple-400 hover:text-purple-300 mt-2 inline-block">
                  View All Favorites
                </Link>
              </div>

              <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Total Spent</h3>
                  <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold">${samplePurchasedPrompts.reduce((total, prompt) => total + prompt.price, 0).toFixed(2)}</div>
                <p className="text-gray-400 text-sm mt-1">Lifetime purchases</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-700 mb-8">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('purchases')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'purchases'
                      ? 'border-purple-500 text-purple-500'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  Purchased Prompts
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'favorites'
                      ? 'border-purple-500 text-purple-500'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  Favorites
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'purchases' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Your Purchased Prompts</h2>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search purchases..."
                      className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {samplePurchasedPrompts.length === 0 ? (
                  <div className="bg-gray-800/40 rounded-xl p-8 border border-gray-700 text-center">
                    <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="text-xl font-bold mb-2">No purchased prompts yet</h3>
                    <p className="text-gray-400 mb-4">Browse our marketplace to find high-quality prompts</p>
                    <Link href="/prompts" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition">
                      Browse Prompts
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {samplePurchasedPrompts.map((prompt) => (
                      <div key={prompt.id} className="bg-gray-800/40 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all h-full flex flex-col">
                        {prompt.type === 'image' && prompt.image && (
                          <div className="relative h-48 w-full">
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60"></div>
                            <Image
                              src={prompt.image}
                              alt={prompt.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="p-6 flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <span className={`px-2 py-1 text-xs rounded-full bg-${prompt.categoryColor}-900/30 text-${prompt.categoryColor}-400 border border-${prompt.categoryColor}-800/50`}>
                              {prompt.category}
                            </span>
                            <span className="text-xs text-gray-400">Purchased: {prompt.purchaseDate}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-2">{prompt.title}</h3>
                          <p className="text-gray-400 text-sm mb-4">{prompt.description}</p>
                          <div className="mt-auto flex justify-between items-center">
                            <span className="font-bold text-purple-400">${prompt.price}</span>
                            <Link href={`/prompts/${prompt.id}`} className="text-sm text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-lg transition">
                              Use Prompt
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'favorites' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Your Favorites</h2>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search favorites..."
                      className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {sampleFavorites.length === 0 ? (
                  <div className="bg-gray-800/40 rounded-xl p-8 border border-gray-700 text-center">
                    <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <h3 className="text-xl font-bold mb-2">No favorites yet</h3>
                    <p className="text-gray-400 mb-4">Save prompts you're interested in for later</p>
                    <Link href="/prompts" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition">
                      Browse Prompts
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sampleFavorites.map((prompt) => (
                      <div key={prompt.id} className="bg-gray-800/40 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all h-full flex flex-col">
                        <div className="p-6 flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <span className={`px-2 py-1 text-xs rounded-full bg-${prompt.categoryColor}-900/30 text-${prompt.categoryColor}-400 border border-${prompt.categoryColor}-800/50`}>
                              {prompt.category}
                            </span>
                            <button className="text-pink-400 hover:text-pink-300 transition">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                          </div>
                          <h3 className="text-xl font-bold mb-2">{prompt.title}</h3>
                          <p className="text-gray-400 text-sm mb-4">{prompt.description}</p>
                          <div className="mt-auto flex justify-between items-center">
                            <span className="font-bold text-purple-400">${prompt.price}</span>
                            <Link href={`/prompts/${prompt.id}`} className="text-sm text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-lg transition">
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
