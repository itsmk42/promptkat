"use client";
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function RequestCategoryPage() {
  const { data: session, status } = useSession();
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [examples, setExamples] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // In a real application, this would be an API call to submit the category request
      // For now, we'll simulate a successful submission after a short delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form and show success message
      setCategoryName('');
      setCategoryDescription('');
      setExamples('');
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError('There was an error submitting your request. Please try again.');
      console.error('Error submitting category request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Request a New Category</h1>
          <p className="text-gray-400">
            Don't see a category that fits your needs? Request a new one and help us expand our prompt collection.
          </p>
        </div>

        {!session && status !== 'loading' ? (
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 text-center">
            <h2 className="text-xl font-bold mb-4">Sign in to Request Categories</h2>
            <p className="text-gray-400 mb-6">
              You need to be signed in to request new categories. This helps us track and respond to your requests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/login" 
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition"
              >
                Sign In
              </Link>
              <Link 
                href="/join" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-2 px-6 rounded-lg hover:opacity-90 transition"
              >
                Create Account
              </Link>
            </div>
          </div>
        ) : submitSuccess ? (
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-8 border border-green-500/30 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Request Submitted!</h2>
            <p className="text-gray-400 mb-6">
              Thank you for your category suggestion. Our team will review it and get back to you soon.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setSubmitSuccess(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition"
              >
                Submit Another Request
              </button>
              <Link 
                href="/categories" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-2 px-6 rounded-lg hover:opacity-90 transition"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-300 mb-2">
                  Category Name <span className="text-pink-500">*</span>
                </label>
                <input
                  type="text"
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2.5 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Data Science, Legal Writing, Game Design"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-300 mb-2">
                  Description <span className="text-pink-500">*</span>
                </label>
                <textarea
                  id="categoryDescription"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2.5 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[120px]"
                  placeholder="Describe what this category would include and why it would be valuable..."
                  required
                />
              </div>

              <div className="mb-8">
                <label htmlFor="examples" className="block text-sm font-medium text-gray-300 mb-2">
                  Example Prompts
                </label>
                <textarea
                  id="examples"
                  value={examples}
                  onChange={(e) => setExamples(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2.5 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[100px]"
                  placeholder="List a few example prompts that would fit in this category..."
                />
                <p className="text-xs text-gray-400 mt-2">Optional, but helps us understand your request better</p>
              </div>

              {submitError && (
                <div className="mb-6 p-4 bg-red-900/30 border border-red-500/30 rounded-lg text-red-300 text-sm">
                  {submitError}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-2.5 px-8 rounded-lg hover:opacity-90 transition flex items-center ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="mt-12 bg-gray-800/40 rounded-xl p-6 border border-gray-700/30">
          <h2 className="text-xl font-bold mb-4">How We Review Category Requests</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-400 font-bold">1</span>
                </div>
                <h3 className="font-bold">Initial Review</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Our team reviews all category requests within 3-5 business days to assess their potential value.
              </p>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-pink-400 font-bold">2</span>
                </div>
                <h3 className="font-bold">Community Interest</h3>
              </div>
              <p className="text-gray-400 text-sm">
                We gauge interest from our community and consider how many users might benefit from the new category.
              </p>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-400 font-bold">3</span>
                </div>
                <h3 className="font-bold">Implementation</h3>
              </div>
              <p className="text-gray-400 text-sm">
                If approved, we'll create the category and notify you when it's live on the platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
