"use client";
import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';

export default function SellersPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 mb-12 border border-gray-700/50 shadow-xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-3/5 mb-8 md:mb-0 md:pr-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
                Monetize Your AI Prompts
              </h1>
              <p className="text-gray-300 text-lg mb-6">
                Join promptKat's marketplace and turn your prompt engineering skills into income. 
                Sell your high-quality prompts to a growing community of AI enthusiasts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/join" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition text-center"
                >
                  Start Selling Today
                </Link>
                <Link 
                  href="#how-it-works" 
                  className="bg-gray-700/50 text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-700 transition text-center"
                >
                  Learn How It Works
                </Link>
              </div>
            </div>
            <div className="md:w-2/5">
              <div className="relative h-64 w-full md:h-80">
                <Image
                  src="/images/seller-hero.svg"
                  alt="Seller illustration"
                  fill
                  style={{ objectFit: 'contain' }}
                  className="drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Sell on promptKat?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Earn Passive Income</h3>
              <p className="text-gray-400">Create once, sell repeatedly. Your prompts continue to generate income without additional work.</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Reach a Targeted Audience</h3>
              <p className="text-gray-400">Connect with users actively looking for quality prompts in your area of expertise.</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Secure Platform</h3>
              <p className="text-gray-400">Our platform handles payments, delivery, and customer support so you can focus on creating.</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-800/30 rounded-xl p-6 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-xl font-bold">1</div>
              <h3 className="text-lg font-bold mb-2 mt-2">Create an Account</h3>
              <p className="text-gray-400">Sign up for a seller account with your basic information and payment details.</p>
            </div>
            
            <div className="bg-gray-800/30 rounded-xl p-6 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-xl font-bold">2</div>
              <h3 className="text-lg font-bold mb-2 mt-2">Create Your Prompts</h3>
              <p className="text-gray-400">Craft high-quality prompts that solve problems or inspire creativity.</p>
            </div>
            
            <div className="bg-gray-800/30 rounded-xl p-6 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-xl font-bold">3</div>
              <h3 className="text-lg font-bold mb-2 mt-2">List Your Prompts</h3>
              <p className="text-gray-400">Upload your prompts with descriptions, categories, and set your price.</p>
            </div>
            
            <div className="bg-gray-800/30 rounded-xl p-6 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-xl font-bold">4</div>
              <h3 className="text-lg font-bold mb-2 mt-2">Get Paid</h3>
              <p className="text-gray-400">Receive payments directly to your account when customers purchase your prompts.</p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Seller Pricing</h2>
          <div className="bg-gray-800/40 rounded-xl p-8 border border-gray-700/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Commission Structure</h3>
                <p className="text-gray-300 mb-4">
                  promptKat takes a small commission on each sale to maintain the platform and provide seller services.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Standard Rate:</strong> 15% commission on each sale</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Premium Sellers:</strong> 10% commission for sellers with over 100 sales</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Payouts:</strong> Processed every 14 days</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Pricing Your Prompts</h3>
                <p className="text-gray-300 mb-4">
                  You have full control over your prompt pricing. Here are our recommendations:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-purple-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Basic Prompts:</strong> $1.99 - $4.99</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-purple-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Advanced Prompts:</strong> $5.99 - $9.99</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-purple-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Premium Prompts:</strong> $10.99 - $29.99</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-8 text-center border border-purple-500/20">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Selling?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join our community of prompt engineers and start earning from your creativity today.
          </p>
          <Link 
            href="/join" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-3 px-8 rounded-lg hover:opacity-90 transition inline-block"
          >
            Create Seller Account
          </Link>
        </section>
      </div>
    </Layout>
  );
}
