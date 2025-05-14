"use client";
import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function DesignCategory() {
  // Category-specific data
  const categoryData = {
    name: "Design",
    description: "Elevate your creative process with AI prompts designed for visual, UI/UX, and graphic designers.",
    color: "teal",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    benefits: [
      "Generate innovative design concepts and creative direction",
      "Create user-centered interfaces with improved usability",
      "Develop consistent brand identity and visual systems",
      "Produce effective design briefs and project specifications",
      "Optimize design workflows and collaboration processes"
    ],
    useCases: [
      {
        title: "UI/UX Design",
        description: "User interface elements, interaction patterns, and experience optimization strategies."
      },
      {
        title: "Graphic Design",
        description: "Visual concepts, layout ideas, and composition techniques for various media."
      },
      {
        title: "Brand Identity",
        description: "Brand strategy, visual language development, and identity system creation."
      },
      {
        title: "Design Systems",
        description: "Component libraries, style guides, and documentation for consistent design."
      }
    ],
    featuredPrompts: [
      {
        title: "UI Component Generator",
        description: "Create cohesive, accessible interface elements with detailed specifications."
      },
      {
        title: "Brand Identity Framework",
        description: "Develop comprehensive brand guidelines with visual and messaging components."
      },
      {
        title: "User Journey Mapper",
        description: "Map detailed user experiences with touchpoints, emotions, and opportunities."
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
                <div key={index} className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 hover:border-teal-500/50 transition-all">
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
                <div key={index} className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 hover:border-teal-500/50 transition-all">
                  <h3 className="text-lg font-semibold mb-2 text-white">{prompt.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{prompt.description}</p>
                  <Link href="#" className="text-teal-400 text-sm hover:text-teal-300 flex items-center">
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
            <Link href="/prompts" className="bg-gradient-to-r from-teal-500 to-blue-600 px-8 py-4 rounded-lg text-lg font-medium hover:opacity-90 transition inline-block">
              Explore All {categoryData.name} Prompts
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
