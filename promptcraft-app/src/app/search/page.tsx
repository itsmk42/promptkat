"use client";
import { useState, useEffect, Suspense } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import SearchBar from '@/components/SearchBar';

// Sample prompt data - in a real app, this would come from an API or database
const promptsData = [
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
    tags: ['LinkedIn', 'Career', 'Professional']
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
    tags: ['3D', 'Product', 'Visualization']
  },
  {
    id: '3',
    title: 'Code Debugging Assistant',
    description: 'Describe your coding problem and get suggestions for debugging.',
    category: 'Programming',
    categoryColor: 'orange',
    price: 8.99,
    rating: 4.9,
    reviews: 152,
    type: 'text',
    tags: ['Debugging', 'Programming', 'Code']
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
    type: 'text',
    tags: ['Productivity', 'Planning', 'Organization']
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
    type: 'text',
    tags: ['Business', 'Startup', 'Planning']
  },
  {
    id: '6',
    title: 'Creative Story Starter',
    description: 'Kickstart your creative writing with detailed scene and character prompts.',
    category: 'Creative Writing',
    categoryColor: 'purple',
    price: 6.99,
    rating: 4.8,
    reviews: 105,
    type: 'text',
    tags: ['Writing', 'Creative', 'Fiction']
  },
  {
    id: '7',
    title: 'Fantasy Character Portrait',
    description: 'Generate detailed fantasy character portraits with customizable features.',
    category: 'Design',
    categoryColor: 'teal',
    price: 12.99,
    rating: 4.7,
    reviews: 76,
    type: 'image',
    image: '/images/placeholder-image.svg',
    tags: ['Fantasy', 'Character', 'Portrait']
  },
  {
    id: '8',
    title: 'SEO Content Optimizer',
    description: 'Enhance your content for search engines while maintaining readability and engagement.',
    category: 'Marketing',
    categoryColor: 'pink',
    price: 11.99,
    rating: 4.6,
    reviews: 89,
    type: 'text',
    tags: ['SEO', 'Content', 'Marketing']
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
    tags: ['Productivity', 'System', 'Organization']
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
  { name: 'Most Relevant', value: 'relevant' },
  { name: 'Most Popular', value: 'popular' },
  { name: 'Newest', value: 'newest' },
  { name: 'Price: Low to High', value: 'price_asc' },
  { name: 'Price: High to Low', value: 'price_desc' },
  { name: 'Rating', value: 'rating' }
];

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  // State for filters
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSort, setSelectedSort] = useState('relevant');
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from the prompts
  const allTags = Array.from(
    new Set(
      promptsData.flatMap(prompt => prompt.tags || [])
    )
  ).sort();

  // Filter prompts based on search query and filters
  const filteredPrompts = promptsData
    .filter(prompt => {
      // Filter by search query
      if (query && !prompt.title.toLowerCase().includes(query.toLowerCase()) &&
          !prompt.description.toLowerCase().includes(query.toLowerCase()) &&
          !(prompt.tags && prompt.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))) {
        return false;
      }

      // Filter by category
      if (selectedCategory !== 'all' && prompt.category.toLowerCase() !== selectedCategory) {
        return false;
      }

      // Filter by type
      if (selectedType !== 'all' && prompt.type !== selectedType) {
        return false;
      }

      // Filter by price range
      if (prompt.price < priceRange[0] || prompt.price > priceRange[1]) {
        return false;
      }

      // Filter by rating
      if (prompt.rating < ratingFilter) {
        return false;
      }

      // Filter by tags
      if (selectedTags.length > 0 &&
          !(prompt.tags && selectedTags.some(tag => prompt.tags.includes(tag)))) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Sort based on selected option
      switch (selectedSort) {
        case 'popular':
          return b.reviews - a.reviews;
        case 'newest':
          // In a real app, you would sort by date
          return 0;
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'relevant':
        default:
          // For relevance, prioritize exact title matches
          if (query) {
            const aTitle = a.title.toLowerCase();
            const bTitle = b.title.toLowerCase();
            const queryLower = query.toLowerCase();

            if (aTitle.includes(queryLower) && !bTitle.includes(queryLower)) {
              return -1;
            }
            if (!aTitle.includes(queryLower) && bTitle.includes(queryLower)) {
              return 1;
            }
          }
          return 0;
      }
    });

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedSort('relevant');
    setPriceRange([0, 50]);
    setRatingFilter(0);
    setSelectedTags([]);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {query ? `Search results for "${query}"` : 'Search Prompts'}
              </h1>
              <div className="mb-6">
                <SearchBar fullWidth placeholder="Refine your search..." />
              </div>
              <p className="text-gray-400">
                {filteredPrompts.length} {filteredPrompts.length === 1 ? 'result' : 'results'} found
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <div className="lg:w-1/4">
                <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700 sticky top-24">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Filters</h2>
                    <button
                      onClick={resetFilters}
                      className="text-sm text-purple-400 hover:text-purple-300"
                    >
                      Reset All
                    </button>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Category</h3>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Type Filter */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Type</h3>
                    <div className="flex space-x-2">
                      {types.map((type) => (
                        <button
                          key={type.value}
                          onClick={() => setSelectedType(type.value)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            selectedType === type.value
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {type.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Price Range</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">${priceRange[0]}</span>
                      <span className="text-sm text-gray-400">${priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="5"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Rating Filter */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Minimum Rating</h3>
                    <div className="flex space-x-2">
                      {[0, 3, 3.5, 4, 4.5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setRatingFilter(rating)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            ratingFilter === rating
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {rating === 0 ? 'Any' : `${rating}+`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tags Filter */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-2 py-1 rounded-full text-xs ${
                            selectedTags.includes(tag)
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Results */}
              <div className="lg:w-3/4">
                {/* Sort Options */}
                <div className="flex justify-end mb-6">
                  <div className="relative">
                    <select
                      value={selectedSort}
                      onChange={(e) => setSelectedSort(e.target.value)}
                      className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none pr-10"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                    <svg className="w-5 h-5 text-gray-400 absolute right-3 top-2.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {filteredPrompts.length === 0 ? (
                  <div className="bg-gray-800/40 rounded-xl p-8 border border-gray-700 text-center">
                    <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-bold mb-2">No results found</h3>
                    <p className="text-gray-400 mb-4">Try adjusting your search query or filters</p>
                    <button
                      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition"
                      onClick={resetFilters}
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPrompts.map((prompt) => (
                      <Link href={`/prompts/${prompt.id}`} key={prompt.id} className="group">
                        <div className="bg-gray-800/40 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all h-full flex flex-col">
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
                              <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">
                                {prompt.type === 'text' ? 'Text' : 'Image'}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{prompt.title}</h3>
                            <p className="text-gray-400 text-sm mb-4">{prompt.description}</p>

                            {/* Tags */}
                            {prompt.tags && prompt.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-4">
                                {prompt.tags.map((tag) => (
                                  <span key={tag} className="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="mt-auto flex justify-between items-center">
                              <div className="flex items-center">
                                <span className="font-bold text-purple-400">${prompt.price}</span>
                                <div className="ml-2 flex items-center text-yellow-400 text-sm">
                                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  {prompt.rating}
                                </div>
                              </div>
                              <span className="text-xs text-gray-400">{prompt.reviews} reviews</span>
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
        </div>
      </div>
    </Layout>
  );
}

// Loading fallback component
function SearchPageLoading() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Searching...
              </h1>
              <div className="animate-pulse h-12 bg-gray-700 rounded-lg mb-6"></div>
              <p className="text-gray-400">
                Loading results
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/4">
                <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700 h-96 animate-pulse"></div>
              </div>
              <div className="lg:w-3/4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-gray-800/40 rounded-xl overflow-hidden border border-gray-700 h-64 animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Main component with Suspense boundary
export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageLoading />}>
      <SearchPageContent />
    </Suspense>
  );
}
