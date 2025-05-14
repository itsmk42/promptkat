"use client";
import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function LifestyleCategory() {
  // Category-specific data
  const categoryData = {
    name: "Lifestyle",
    description: "Enhance your everyday living with AI prompts designed for health, travel, home, and personal interests.",
    color: "red",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    benefits: [
      "Create personalized health and fitness plans tailored to your goals",
      "Plan memorable travel experiences with detailed itineraries",
      "Develop sustainable home organization and decoration systems",
      "Generate creative ideas for hobbies and personal interests",
      "Design balanced meal plans and recipe collections"
    ],
    useCases: [
      {
        title: "Health & Wellness",
        description: "Fitness routines, nutrition plans, and wellness practices for optimal health."
      },
      {
        title: "Travel Planning",
        description: "Itineraries, packing lists, and destination guides for memorable journeys."
      },
      {
        title: "Home Management",
        description: "Organization systems, decoration ideas, and household maintenance schedules."
      },
      {
        title: "Culinary Exploration",
        description: "Recipe development, meal planning, and cooking techniques for all skill levels."
      }
    ],
    featuredPrompts: [
      {
        title: "Personalized Fitness Plan",
        description: "Create a tailored workout routine based on your goals, equipment, and schedule."
      },
      {
        title: "Travel Itinerary Builder",
        description: "Design a detailed travel plan with activities, accommodations, and local insights."
      },
      {
        title: "Seasonal Meal Planner",
        description: "Develop weekly meal plans using seasonal ingredients with shopping lists included."
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
                <div key={index} className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 hover:border-red-500/50 transition-all">
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
                <div key={index} className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 hover:border-red-500/50 transition-all">
                  <h3 className="text-lg font-semibold mb-2 text-white">{prompt.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{prompt.description}</p>
                  <Link href="#" className="text-red-400 text-sm hover:text-red-300 flex items-center">
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
            <Link href="/prompts" className="bg-gradient-to-r from-red-500 to-pink-600 px-8 py-4 rounded-lg text-lg font-medium hover:opacity-90 transition inline-block">
              Explore All {categoryData.name} Prompts
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
