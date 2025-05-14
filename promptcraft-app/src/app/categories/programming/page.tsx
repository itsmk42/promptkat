"use client";
import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function ProgrammingCategory() {
  // Category-specific data
  const categoryData = {
    name: "Programming",
    description: "Accelerate your development workflow with AI prompts designed for coding, debugging, and software architecture.",
    color: "orange",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    benefits: [
      "Generate efficient, clean code in multiple programming languages",
      "Debug complex issues with step-by-step troubleshooting assistance",
      "Optimize existing code for better performance and readability",
      "Design robust software architecture and data structures",
      "Translate requirements into technical specifications and implementations"
    ],
    useCases: [
      {
        title: "Code Generation",
        description: "Create boilerplate code, algorithms, and functions across various programming languages."
      },
      {
        title: "Debugging Assistant",
        description: "Identify and fix bugs with intelligent error analysis and solution recommendations."
      },
      {
        title: "Code Refactoring",
        description: "Transform legacy code into clean, maintainable, and efficient implementations."
      },
      {
        title: "Documentation Generation",
        description: "Create comprehensive documentation for your code, APIs, and software systems."
      }
    ],
    featuredPrompts: [
      {
        title: "Algorithm Optimizer",
        description: "Improve the efficiency and performance of your algorithms with expert recommendations."
      },
      {
        title: "Full-Stack Component Builder",
        description: "Generate frontend and backend components that work seamlessly together."
      },
      {
        title: "Code Review Assistant",
        description: "Get detailed code reviews with actionable suggestions for improvement."
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
                <div key={index} className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-all">
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
                <div key={index} className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-all">
                  <h3 className="text-lg font-semibold mb-2 text-white">{prompt.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{prompt.description}</p>
                  <Link href="#" className="text-orange-400 text-sm hover:text-orange-300 flex items-center">
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
            <Link href="/prompts" className="bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 rounded-lg text-lg font-medium hover:opacity-90 transition inline-block">
              Explore All {categoryData.name} Prompts
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
