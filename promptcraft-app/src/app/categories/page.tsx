"use client";
import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Categories() {
  // Categories data
  const categories = [
    {
      name: "Creative Writing",
      description: "Story starters, poetry, and more for writers and creatives.",
      color: "purple",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      slug: "creative-writing"
    },
    {
      name: "Marketing",
      description: "Prompts for campaigns, branding, and content creation.",
      color: "pink",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      slug: "marketing"
    },
    {
      name: "Programming",
      description: "Debugging, code generation, and developer tools.",
      color: "orange",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      slug: "programming"
    },
    {
      name: "Personal Development",
      description: "Productivity, wellness, and growth prompts.",
      color: "yellow",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      slug: "personal-development"
    },
    {
      name: "Business",
      description: "Strategy, management, and entrepreneurship prompts.",
      color: "blue",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      slug: "business"
    },
    {
      name: "Education",
      description: "Learning aids, tutoring, and academic prompts.",
      color: "green",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      slug: "education"
    },
    {
      name: "Design",
      description: "Visual, UI/UX, and creative design prompts.",
      color: "teal",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      slug: "design"
    },
    {
      name: "Lifestyle",
      description: "Health, travel, and everyday living prompts.",
      color: "red",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      slug: "lifestyle"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Prompt Categories</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our diverse collection of AI prompts organized by category to find exactly what you need
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/categories/${category.slug}`}
                className={`group block bg-gray-800/50 border border-gray-700 rounded-xl p-8 hover:border-${category.color}-500/50 transition-all transform hover:-translate-y-1 hover:shadow-xl duration-300`}
              >
                <div className="flex items-center mb-4">
                  <span className={`w-12 h-12 flex items-center justify-center rounded-full bg-${category.color}-500/20 text-${category.color}-400 mr-4`}>
                    {category.icon}
                  </span>
                  <span className="font-semibold text-xl">{category.name}</span>
                </div>
                <p className="text-gray-400 mb-4">{category.description}</p>
                <div className={`flex items-center text-${category.color}-400 group-hover:text-${category.color}-300`}>
                  <span className="text-sm font-medium">Explore category</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-6">Can't Find What You're Looking For?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Our collection is constantly growing. If you need a specific type of prompt that isn't listed here, let us know!
            </p>
            <Link href="/request-category" className="bg-gradient-to-r from-purple-500 to-pink-600 px-8 py-4 rounded-lg text-lg font-medium hover:opacity-90 transition inline-block">
              Request a Category
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}