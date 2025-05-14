"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import FilterDropdown from '@/components/FilterDropdown';

// This will be replaced with data from the API
const samplePromptsData = [
  {
    id: '1',
    title: 'Professional LinkedIn Profile Writer',
    description: 'Create a compelling LinkedIn profile that highlights your professional achievements and attracts recruiters.',
    category: 'Marketing',
    categoryColor: 'pink',
    price: 9.99,
    rating: 4.8,
    reviews: 124,
    type: 'text',
    featured: true
  },
  {
    id: '2',
    title: 'Photorealistic Product Visualization',
    description: 'Generate stunning, photorealistic 3D product renders for marketing materials and presentations.',
    category: 'Design',
    categoryColor: 'teal',
    price: 14.99,
    rating: 4.9,
    reviews: 87,
    type: 'image',
    image: '/images/placeholder-image.svg',
    featured: true
  },
  {
    id: '3',
    title: 'Advanced SQL Query Generator',
    description: 'Generate optimized SQL queries for complex database operations and data analysis.',
    category: 'Programming',
    categoryColor: 'orange',
    price: 12.99,
    rating: 4.7,
    reviews: 56,
    type: 'text',
    featured: false
  },
  {
    id: '4',
    title: 'Fantasy Character Creator',
    description: 'Generate detailed fantasy characters with unique backstories, abilities, and visual descriptions.',
    category: 'Creative Writing',
    categoryColor: 'purple',
    price: 7.99,
    rating: 4.6,
    reviews: 92,
    type: 'text',
    featured: false
  },
  {
    id: '5',
    title: 'Cinematic Scene Generator',
    description: 'Create stunning cinematic scenes with dramatic lighting, composition, and atmosphere.',
    category: 'Design',
    categoryColor: 'teal',
    price: 16.99,
    rating: 4.9,
    reviews: 73,
    type: 'image',
    image: '/images/placeholder-image.svg',
    featured: true
  },
  {
    id: '6',
    title: 'Business Plan Generator',
    description: 'Create comprehensive business plans with financial projections, market analysis, and strategy.',
    category: 'Business',
    categoryColor: 'blue',
    price: 19.99,
    rating: 4.8,
    reviews: 41,
    type: 'text',
    featured: false
  },
  {
    id: '7',
    title: 'Stylized Portrait Creator',
    description: 'Generate beautiful stylized portraits in various artistic styles from simple descriptions.',
    category: 'Design',
    categoryColor: 'teal',
    price: 11.99,
    rating: 4.7,
    reviews: 68,
    type: 'image',
    image: '/images/placeholder-image.svg',
    featured: false
  },
  {
    id: '8',
    title: 'Email Marketing Sequence',
    description: 'Create effective email marketing sequences that nurture leads and drive conversions.',
    category: 'Marketing',
    categoryColor: 'pink',
    price: 13.99,
    rating: 4.6,
    reviews: 37,
    type: 'text',
    featured: false
  },
  {
    id: '9',
    title: 'Productivity System Creator',
    description: 'Design a personalized productivity system tailored to your work style and goals.',
    category: 'Personal Development',
    categoryColor: 'yellow',
    price: 8.99,
    rating: 4.5,
    reviews: 52,
    type: 'text',
    featured: false
  }
];

// Categories for filtering
const categories = [
  { name: 'All Categories', value: 'all' },
  { name: 'Creative Writing', value: 'creative writing' },
  { name: 'Marketing', value: 'marketing' },
  { name: 'Programming', value: 'programming' },
  { name: 'Personal Development', value: 'personal development' },
  { name: 'Business', value: 'business' },
  { name: 'Education', value: 'education' },
  { name: 'Design', value: 'design' },
  { name: 'Lifestyle', value: 'lifestyle' }
];

// Types for filtering
const types = [
  { name: 'All Types', value: 'all' },
  { name: 'Text Prompts', value: 'text' },
  { name: 'Image Prompts', value: 'image' }
];

// Sort options
const sortOptions = [
  { name: 'Most Popular', value: 'popular' },
  { name: 'Newest', value: 'newest' },
  { name: 'Price: Low to High', value: 'price_asc' },
  { name: 'Price: High to Low', value: 'price_desc' },
  { name: 'Rating', value: 'rating' }
];

export default function PromptsPage() {
  // State for filters
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  // State for prompts data
  const [promptsData, setPromptsData] = useState([]);
  const [featuredPrompts, setFeaturedPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalPrompts, setTotalPrompts] = useState(0);

  // Fetch prompts from API
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setLoading(true);

        // Build query parameters
        const params = new URLSearchParams();
        if (selectedCategory !== 'all') params.append('category', selectedCategory);
        if (selectedType !== 'all') params.append('type', selectedType);
        if (selectedSort) params.append('sort', selectedSort);
        if (searchQuery) params.append('search', searchQuery);

        // Fetch prompts
        const response = await fetch(`/api/prompts?${params.toString()}`);

        if (!response.ok) {
          throw new Error('Failed to fetch prompts');
        }

        const data = await response.json();
        console.log('API Response:', {
          total: data.pagination?.total,
          promptsCount: data.prompts?.length,
          firstFewPrompts: data.prompts?.slice(0, 3).map(p => p.title)
        });
        setPromptsData(data.prompts || []);
        setTotalPrompts(data.pagination?.total || 0);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching prompts:', err);
        setError('Failed to load prompts. Please try again later.');
        setLoading(false);
      }
    };

    // Fetch featured prompts separately (only once)
    const fetchFeaturedPrompts = async () => {
      try {
        // Fetch up to 10 featured prompts
        const response = await fetch('/api/prompts?featured=true&limit=10');

        if (!response.ok) {
          throw new Error('Failed to fetch featured prompts');
        }

        const data = await response.json();
        console.log('Featured prompts:', {
          count: data.prompts?.length,
          titles: data.prompts?.map(p => p.title)
        });
        setFeaturedPrompts(data.prompts || []);
      } catch (err) {
        console.error('Error fetching featured prompts:', err);
      }
    };

    fetchPrompts();

    // Only fetch featured prompts once
    if (featuredPrompts.length === 0) {
      fetchFeaturedPrompts();
    }
  }, [selectedCategory, selectedType, selectedSort, searchQuery]);

  // Use the fetched prompts directly - no need to filter or sort as the API does that
  const filteredPrompts = promptsData;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse Prompts</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover premium prompts crafted by experts to help you get the most out of AI
            </p>
          </div>

          {/* Filters and Search */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mb-12 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Search */}
              <div className="col-span-1 md:col-span-4 mb-2">
                <label className="block text-xs font-medium text-gray-400 mb-1 font-mono">search_prompts</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter keywords to find prompts..."
                    className="w-full px-4 py-2.5 bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 pl-10 text-xs font-mono shadow-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <svg className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {searchQuery && (
                    <button
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      onClick={() => setSearchQuery('')}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <FilterDropdown
                label="filter_by_category"
                options={categories}
                value={selectedCategory}
                onChange={setSelectedCategory}
              />

              {/* Type Filter */}
              <FilterDropdown
                label="filter_by_type"
                options={types}
                value={selectedType}
                onChange={setSelectedType}
              />

              {/* Sort */}
              <FilterDropdown
                label="sort_results"
                options={sortOptions}
                value={selectedSort}
                onChange={setSelectedSort}
              />

              {/* Results Count */}
              <div className="col-span-1 md:col-span-4 flex items-center justify-between mt-2 border-t border-gray-700/30 pt-3">
                <span className="text-gray-400 text-xs font-mono">
                  showing_{filteredPrompts.length}_of_{totalPrompts}_prompts
                </span>

                {(selectedCategory !== 'all' || selectedType !== 'all' || searchQuery) && (
                  <button
                    className="bg-gray-700/50 hover:bg-gray-700/70 text-xs text-white font-mono py-1.5 px-3 rounded-md transition flex items-center"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedType('all');
                      setSearchQuery('');
                    }}
                  >
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    reset_filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Featured Prompts (only show if no filters are applied) */}
          {selectedCategory === 'all' && selectedType === 'all' && !searchQuery && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Featured Prompts</h2>
              {featuredPrompts.length === 0 ? (
                <div className="bg-gray-800/40 rounded-xl p-8 text-center">
                  <p className="text-gray-400">Loading featured prompts...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredPrompts.map((prompt) => (
                    <Link href={`/prompts/${prompt.id}`} key={prompt.id} className="group">
                      <div className="bg-gray-800/40 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all h-full flex flex-col">
                        {prompt.type === 'image' && prompt.image && (
                          <div className="relative h-48 w-full">
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60"></div>
                            <Image
                              src={prompt.image || '/images/placeholder-image.svg'}
                              alt={prompt.title}
                              fill
                              style={{ objectFit: 'cover' }}
                              className="transition-transform group-hover:scale-105"
                            />
                          </div>
                        )}
                        <div className="p-6 flex-grow flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <span className="px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-400">
                              {prompt.category}
                            </span>
                            <span className="font-bold text-purple-400">${prompt.price.toFixed(2)}</span>
                          </div>
                          <h3 className="font-bold text-lg mb-2 group-hover:text-purple-400 transition">{prompt.title}</h3>
                          <p className="text-gray-400 text-sm mb-4 flex-grow">{prompt.description}</p>
                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center">
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <svg key={i} className={`w-4 h-4 ${i < Math.floor(prompt.rating) ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="ml-1 text-xs text-gray-400">({prompt.reviews})</span>
                            </div>
                            <span className="text-xs text-gray-500 uppercase">{prompt.type}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* All Prompts */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              {selectedCategory !== 'all'
                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Prompts`
                : 'All Prompts'}
            </h2>

            {loading ? (
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 text-center shadow-lg">
                <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 font-mono">loading_prompts</h3>
                <p className="text-gray-400 text-sm font-mono">please_wait_while_we_fetch_the_prompts</p>
              </div>
            ) : error ? (
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-8 border border-red-700/50 text-center shadow-lg">
                <div className="w-16 h-16 bg-red-700/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 font-mono">error_loading_prompts</h3>
                <p className="text-gray-400 mb-6 text-sm font-mono">{error}</p>
                <button
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white font-mono text-xs py-2.5 px-6 rounded-md transition shadow-lg hover:opacity-90 flex items-center mx-auto"
                  onClick={() => window.location.reload()}
                >
                  <svg className="w-3.5 h-3.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  retry
                </button>
              </div>
            ) : filteredPrompts.length === 0 ? (
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 text-center shadow-lg">
                <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 font-mono">no_results_found</h3>
                <p className="text-gray-400 mb-6 text-sm font-mono">try_adjusting_filters_or_search_query</p>
                <button
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white font-mono text-xs py-2.5 px-6 rounded-md transition shadow-lg hover:opacity-90 flex items-center mx-auto"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedType('all');
                    setSearchQuery('');
                  }}
                >
                  <svg className="w-3.5 h-3.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  reset_all_filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrompts.map((prompt) => (
                  <Link href={`/prompts/${prompt.id}`} key={prompt.id} className="group">
                    <div className="bg-gray-800/40 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all h-full flex flex-col">
                      {prompt.type === 'image' && prompt.image && (
                        <div className="relative h-48 w-full">
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60"></div>
                          <Image
                            src={prompt.image || '/images/placeholder-image.svg'}
                            alt={prompt.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="transition-transform group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-6 flex-grow flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <span className="px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-400">
                            {prompt.category}
                          </span>
                          <span className="font-bold text-purple-400">${prompt.price.toFixed(2)}</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2 group-hover:text-purple-400 transition">{prompt.title}</h3>
                        <p className="text-gray-400 text-sm mb-4 flex-grow">{prompt.description}</p>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-4 h-4 ${i < Math.floor(prompt.rating) ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="ml-1 text-xs text-gray-400">({prompt.reviews})</span>
                          </div>
                          <span className="text-xs text-gray-500 uppercase">{prompt.type}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
