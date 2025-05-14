"use client";
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import FavoriteButton from '@/components/FavoriteButton';

// This will be replaced with actual data from the API
const sampleFavorites = [
  {
    id: '3',
    title: 'Code Debugging Assistant',
    description: 'Describe your coding problem and get suggestions for debugging.',
    category: 'Programming',
    categoryColor: 'orange',
    price: 8.99,
    rating: 4.9,
    reviews: 152,
    type: 'text'
  },
  {
    id: '4',
    title: 'Daily Productivity Planner',
    description: 'Structure your day for maximum productivity with this planning prompt.',
    category: 'Personal Development',
    categoryColor: 'yellow',
    price: 7.99,
    rating: 4.6,
    reviews: 93,
    type: 'text'
  },
  {
    id: '5',
    title: 'Business Plan Generator',
    description: 'Create a comprehensive business plan for your startup or new venture.',
    category: 'Business',
    categoryColor: 'blue',
    price: 19.99,
    rating: 4.7,
    reviews: 68,
    type: 'text'
  },
];

export default function FavoritesPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState(sampleFavorites);

  // Filter favorites based on search query
  const filteredFavorites = favorites.filter(favorite => {
    if (!searchQuery) return true;
    
    return (
      favorite.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      favorite.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      favorite.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // In a real app, we would fetch favorites from the API
  useEffect(() => {
    if (session?.user) {
      setIsLoading(true);
      
      // This would be an API call in a real application
      // fetch('/api/favorites')
      //   .then(res => res.json())
      //   .then(data => {
      //     setFavorites(data);
      //     setIsLoading(false);
      //   })
      //   .catch(error => {
      //     console.error('Error fetching favorites:', error);
      //     setIsLoading(false);
      //   });
      
      // For now, just simulate loading
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [session]);

  // Handle removing a favorite
  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(favorite => favorite.id !== id));
  };

  if (!session?.user) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Favorites</h1>
          <p className="text-lg text-gray-300 mb-8 max-w-xl text-center">
            Please sign in to view your favorited prompts.
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
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Your Favorites</h1>
                <p className="text-gray-400">Prompts you've saved for later</p>
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
                  placeholder="Search your favorites..."
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

            {/* Favorites List */}
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <svg className="animate-spin h-8 w-8 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : filteredFavorites.length === 0 ? (
              <div className="bg-gray-800/40 rounded-xl p-8 border border-gray-700 text-center">
                {searchQuery ? (
                  <>
                    <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="text-xl font-bold mb-2">No results found</h3>
                    <p className="text-gray-400 mb-4">No favorites match your search query "{searchQuery}"</p>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <h3 className="text-xl font-bold mb-2">No favorites yet</h3>
                    <p className="text-gray-400 mb-4">Save prompts you're interested in for later</p>
                    <Link href="/prompts" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition">
                      Browse Prompts
                    </Link>
                  </>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFavorites.map((favorite) => (
                  <div key={favorite.id} className="bg-gray-800/40 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all h-full flex flex-col">
                    <div className="p-6 flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <span className={`px-2 py-1 text-xs rounded-full bg-${favorite.categoryColor}-900/30 text-${favorite.categoryColor}-400 border border-${favorite.categoryColor}-800/50`}>
                          {favorite.category}
                        </span>
                        <FavoriteButton 
                          promptId={favorite.id} 
                          initialFavorited={true}
                          size="md"
                        />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{favorite.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{favorite.description}</p>
                      <div className="mt-auto flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="font-bold text-purple-400">${favorite.price}</span>
                          <div className="ml-2 flex items-center text-yellow-400 text-sm">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {favorite.rating}
                          </div>
                        </div>
                        <Link href={`/prompts/${favorite.id}`} className="text-sm text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-lg transition">
                          View Details
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
