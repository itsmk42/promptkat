"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AdminLayout from '@/components/AdminLayout';

export default function AdminFeedback() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Feedback form state
  const [feedback, setFeedback] = useState({
    category: 'general',
    title: '',
    description: '',
    rating: 3,
    email: '',
    name: '',
  });
  
  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/admin/feedback');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin' && session?.user?.role !== 'superadmin') {
      router.push('/unauthorized');
    } else if (status === 'authenticated') {
      // Pre-fill email and name if available
      setFeedback(prev => ({
        ...prev,
        email: session?.user?.email || '',
        name: session?.user?.name || '',
      }));
      setLoading(false);
    }
  }, [status, session, router]);
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFeedback(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // In a real app, you would send feedback to your API
      // Example: await fetch('/api/admin/feedback', { method: 'POST', body: JSON.stringify(feedback) });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', text: 'Thank you for your feedback! We appreciate your input and will use it to improve the admin dashboard.' });
      
      // Reset form
      setFeedback({
        category: 'general',
        title: '',
        description: '',
        rating: 3,
        email: session?.user?.email || '',
        name: session?.user?.name || '',
      });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error submitting feedback. Please try again.' });
    } finally {
      setSubmitting(false);
      
      // Clear success message after 5 seconds
      if (message.type === 'success') {
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      }
    }
  };
  
  if (status === 'loading' || loading) {
    return (
      <AdminLayout>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-white">Feedback</h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-10 bg-gray-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="h-60 bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-white">Admin Dashboard Feedback</h1>
          <p className="mt-2 text-gray-400">
            Your feedback helps us improve the admin dashboard. Please share your thoughts and suggestions.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
          {/* Message alert */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-md ${message.type === 'success' ? 'bg-green-900/50 text-green-400 border border-green-800' : 'bg-red-900/50 text-red-400 border border-red-800'}`}>
              {message.text}
            </div>
          )}
          
          {/* Feedback form */}
          <form onSubmit={handleSubmit} className="bg-gray-800 shadow overflow-hidden sm:rounded-lg p-6">
            <div className="space-y-6">
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-400">Feedback Category</label>
                <select
                  id="category"
                  name="category"
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                  value={feedback.category}
                  onChange={handleChange}
                  required
                >
                  <option value="general">General Feedback</option>
                  <option value="ui">User Interface</option>
                  <option value="features">Features</option>
                  <option value="bugs">Bug Report</option>
                  <option value="performance">Performance</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-400">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                  placeholder="Brief summary of your feedback"
                  value={feedback.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-400">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                  placeholder="Please provide detailed feedback..."
                  value={feedback.description}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {/* Rating */}
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-400">Overall Rating</label>
                <div className="mt-2 flex items-center">
                  <span className="text-gray-400 mr-2">1</span>
                  <input
                    type="range"
                    id="rating"
                    name="rating"
                    min="1"
                    max="5"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    value={feedback.rating}
                    onChange={handleChange}
                  />
                  <span className="text-gray-400 ml-2">5</span>
                </div>
                <div className="mt-1 text-center text-sm text-gray-400">
                  {feedback.rating === '1' && 'Very Poor'}
                  {feedback.rating === '2' && 'Poor'}
                  {feedback.rating === '3' && 'Average'}
                  {feedback.rating === '4' && 'Good'}
                  {feedback.rating === '5' && 'Excellent'}
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                    value={feedback.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                    value={feedback.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              {/* Submit button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : 'Submit Feedback'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
