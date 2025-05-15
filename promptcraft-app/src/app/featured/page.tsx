'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import PromptCard from '@/components/PromptCard';
import Link from 'next/link';

// Sample featured prompts data
const featuredPrompts = [
  {
    id: 'fp1',
    title: 'Advanced Story Generator',
    description: 'Create compelling narratives with complex characters and engaging plots. Perfect for novelists, screenwriters, and creative writing enthusiasts.',
    category: 'Creative Writing',
    categoryColor: 'purple',
    price: 14.99,
    rating: 4.9,
    reviews: 218,
    type: 'text' as 'text',
    featured: true,
    tags: ['writing', 'storytelling', 'fiction']
  },
  {
    id: 'fp2',
    title: 'SEO Content Optimizer',
    description: 'Generate SEO-friendly content that ranks well on search engines while engaging your audience. Includes keyword optimization strategies.',
    category: 'Marketing',
    categoryColor: 'pink',
    price: 19.99,
    rating: 4.8,
    reviews: 176,
    type: 'text' as 'text',
    featured: true,
    tags: ['marketing', 'seo', 'content']
  },
  {
    id: 'fp3',
    title: 'Product Description Creator',
    description: 'Craft compelling product descriptions that convert browsers into buyers. Highlights benefits and features in an engaging way.',
    category: 'E-commerce',
    categoryColor: 'blue',
    price: 12.99,
    rating: 4.7,
    reviews: 142,
    type: 'text' as 'text',
    featured: true,
    tags: ['ecommerce', 'sales', 'copywriting']
  },
  {
    id: 'fp4',
    title: 'Scientific Paper Assistant',
    description: 'Structure and draft academic papers with proper formatting, citations, and technical language appropriate for scholarly publications.',
    category: 'Academic',
    categoryColor: 'green',
    price: 24.99,
    rating: 4.9,
    reviews: 89,
    type: 'text' as 'text',
    featured: true,
    tags: ['academic', 'research', 'science']
  },
  {
    id: 'fp5',
    title: 'Social Media Campaign Planner',
    description: 'Plan and create engaging social media content across multiple platforms with consistent messaging and optimal posting schedules.',
    category: 'Marketing',
    categoryColor: 'pink',
    price: 17.99,
    rating: 4.6,
    reviews: 203,
    type: 'text' as 'text',
    featured: true,
    tags: ['social media', 'marketing', 'content']
  },
  {
    id: 'fp6',
    title: 'Code Refactoring Assistant',
    description: 'Improve your code quality with suggestions for refactoring, optimizing performance, and following best practices in multiple programming languages.',
    category: 'Programming',
    categoryColor: 'orange',
    price: 21.99,
    rating: 4.8,
    reviews: 156,
    type: 'text' as 'text',
    featured: true,
    tags: ['programming', 'development', 'coding']
  },
  {
    id: 'fp7',
    title: 'Email Marketing Sequence',
    description: 'Create a series of engaging emails that nurture leads and drive conversions. Includes subject lines, body content, and call-to-actions.',
    category: 'Marketing',
    categoryColor: 'pink',
    price: 16.99,
    rating: 4.7,
    reviews: 128,
    type: 'text' as 'text',
    featured: true,
    tags: ['email', 'marketing', 'sales']
  },
  {
    id: 'fp8',
    title: 'Character Development Framework',
    description: 'Build deep, believable characters with complex motivations, backgrounds, and arcs for your novels, screenplays, or games.',
    category: 'Creative Writing',
    categoryColor: 'purple',
    price: 13.99,
    rating: 4.9,
    reviews: 167,
    type: 'text' as 'text',
    featured: true,
    tags: ['writing', 'characters', 'fiction']
  }
];

// Available categories for filtering
const categories = [
  { name: 'All Categories', value: 'all' },
  { name: 'Creative Writing', value: 'Creative Writing' },
  { name: 'Marketing', value: 'Marketing' },
  { name: 'E-commerce', value: 'E-commerce' },
  { name: 'Academic', value: 'Academic' },
  { name: 'Programming', value: 'Programming' }
];

export default function Featured() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Filter prompts based on selected category
  const filteredPrompts = selectedCategory === 'all'
    ? featuredPrompts
    : featuredPrompts.filter(prompt => prompt.category === selectedCategory);

  // Sort prompts based on selected sort option
  const sortedPrompts = [...filteredPrompts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviews - a.reviews;
    // Default: featured
    return 0; // Keep original order for featured
  });

  return (
    <Layout>
      <div className="min-h-screen text-white">
        {/* Hero Section */}
        <div className="relative py-12 mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30 z-0"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80')] bg-cover bg-center opacity-10"></div>
          <div className="container mx-auto relative z-10 px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">Featured Prompts</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto text-center mb-8">
              Discover our handpicked selection of top-performing AI prompts, curated for maximum impact and creativity.
            </p>
            <div className="flex justify-center">
              <Link href="/prompts" className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-3 rounded-lg text-base font-medium hover:opacity-90 transition text-center shadow-lg">
                Browse All Prompts
              </Link>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="container mx-auto px-4 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col xs:flex-row gap-4">
                <div>
                  <label htmlFor="category-filter" className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                  <select
                    id="category-filter"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="sort-by" className="block text-sm font-medium text-gray-400 mb-1">Sort By</label>
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="reviews">Most Reviewed</option>
                  </select>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                Showing <span className="font-medium text-white">{sortedPrompts.length}</span> prompts
              </div>
            </div>
          </div>
        </div>

        {/* Prompts Grid */}
        <div className="container mx-auto px-4 mb-12">
          {sortedPrompts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedPrompts.map((prompt) => (
                <PromptCard key={prompt.id} {...prompt} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 text-center">
              <p className="text-gray-400">No prompts found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSortBy('featured');
                }}
                className="mt-4 text-purple-400 hover:text-purple-300"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="container mx-auto px-4 mb-16">
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-gray-700 text-center">
            <h2 className="text-2xl font-bold mb-4">Want to Create Your Own Prompts?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join our community of prompt engineers and share your expertise with thousands of AI enthusiasts.
            </p>
            <Link href="/sellers" className="inline-block bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-3 rounded-lg text-base font-medium hover:opacity-90 transition text-center shadow-lg">
              Become a Seller
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}