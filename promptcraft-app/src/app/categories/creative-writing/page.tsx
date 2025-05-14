"use client";
import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function CreativeWritingCategory() {
  // Category-specific data
  const categoryData = {
    name: "Creative Writing",
    description: "Unlock your creativity and craft compelling narratives with our collection of creative writing prompts.",
    color: "purple",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    benefits: [
      "Generate engaging story ideas and overcome writer's block",
      "Develop rich, multi-dimensional characters with depth and authenticity",
      "Craft compelling dialogue that advances your narrative",
      "Create vivid settings and immersive worlds for your stories",
      "Structure your plot with professional storytelling techniques"
    ],
    useCases: [
      {
        title: "Novel Development",
        description: "Prompts designed to help you outline, structure, and write compelling novels across genres."
      },
      {
        title: "Short Story Creation",
        description: "Focused prompts for crafting concise, impactful short stories with memorable characters."
      },
      {
        title: "Poetry Inspiration",
        description: "Specialized prompts for various poetic forms, styles, and themes to inspire your verse."
      },
      {
        title: "Character Development",
        description: "Deep-dive prompts to create complex, believable characters with unique voices."
      }
    ],
    featuredPrompts: [
      {
        title: "Character Backstory Generator",
        description: "Create rich, detailed character histories that inform their motivations and actions."
      },
      {
        title: "Plot Twist Developer",
        description: "Generate unexpected yet believable plot twists that will captivate your readers."
      },
      {
        title: "World-Building Framework",
        description: "Construct immersive fictional worlds with consistent rules, cultures, and environments."
      }
    ]
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pt-24 pb-16">
        {/* Hero Section */}
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
            <div className={`w-20 h-20 rounded-full bg-${categoryData.color}-500/20 text-${categoryData.color}-400 flex items-center justify-center mb-6`}>
              {categoryData.icon}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{categoryData.name} Prompts</h1>
            <p className="text-xl text-gray-300 max-w-3xl">{categoryData.description}</p>
          </div>

          {/* Benefits Section */}
          <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">What You Can Achieve</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className={`w-6 h-6 rounded-full bg-${categoryData.color}-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-200">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Popular Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryData.useCases.map((useCase, index) => (
                <div key={index} className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-all">
                  <h3 className="text-xl font-semibold mb-3 text-white">{useCase.title}</h3>
                  <p className="text-gray-300">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Prompts Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Featured Prompts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categoryData.featuredPrompts.map((prompt, index) => (
                <div key={index} className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-all">
                  <h3 className="text-lg font-semibold mb-2 text-white">{prompt.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{prompt.description}</p>
                  <Link href="#" className="text-purple-400 text-sm hover:text-purple-300 flex items-center">
                    View prompt
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Link href="/prompts" className="bg-gradient-to-r from-purple-500 to-pink-600 px-8 py-4 rounded-lg text-lg font-medium hover:opacity-90 transition inline-block">
              Explore All {categoryData.name} Prompts
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
