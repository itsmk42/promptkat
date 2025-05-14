"use client";
import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function PersonalDevelopmentCategory() {
  // Category-specific data
  const categoryData = {
    name: "Personal Development",
    description: "Transform your life with AI prompts designed to enhance productivity, mindfulness, and personal growth.",
    color: "yellow",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    benefits: [
      "Develop effective habits and routines that align with your goals",
      "Overcome procrastination and increase your daily productivity",
      "Enhance your emotional intelligence and interpersonal skills",
      "Create personalized growth plans with actionable steps",
      "Cultivate mindfulness and reduce stress in your daily life"
    ],
    useCases: [
      {
        title: "Productivity Systems",
        description: "Custom workflows, time management techniques, and organization strategies."
      },
      {
        title: "Goal Setting & Achievement",
        description: "Frameworks for setting meaningful goals and creating action plans to achieve them."
      },
      {
        title: "Mindfulness & Wellbeing",
        description: "Practices for mental clarity, stress reduction, and emotional balance."
      },
      {
        title: "Habit Formation",
        description: "Strategies to build positive habits and break negative patterns."
      }
    ],
    featuredPrompts: [
      {
        title: "Personal Productivity Audit",
        description: "Analyze your current workflow and identify opportunities for improvement."
      },
      {
        title: "Goal Achievement Roadmap",
        description: "Create a detailed, step-by-step plan to reach your most important goals."
      },
      {
        title: "Daily Mindfulness Practice",
        description: "Develop a customized mindfulness routine to reduce stress and increase focus."
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
                <div key={index} className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 hover:border-yellow-500/50 transition-all">
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
                <div key={index} className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 hover:border-yellow-500/50 transition-all">
                  <h3 className="text-lg font-semibold mb-2 text-white">{prompt.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{prompt.description}</p>
                  <Link href="#" className="text-yellow-400 text-sm hover:text-yellow-300 flex items-center">
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
            <Link href="/prompts" className="bg-gradient-to-r from-yellow-500 to-orange-600 px-8 py-4 rounded-lg text-lg font-medium hover:opacity-90 transition inline-block">
              Explore All {categoryData.name} Prompts
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
