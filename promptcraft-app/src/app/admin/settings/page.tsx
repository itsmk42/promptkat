"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AdminLayout from '@/components/AdminLayout';
import Dropdown from '@/components/Dropdown';

export default function AdminSettings() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Settings state
  const [settings, setSettings] = useState({
    siteName: 'PromptCat',
    siteDescription: 'A marketplace for high-quality AI prompts',
    featuredPromptsCount: 6,
    newPromptsCount: 8,
    enablePayments: true,
    enableRegistration: true,
    maintenanceMode: false,
    contactEmail: 'support@promptcat.com',
    // SEO settings
    metaTitle: 'PromptCat - AI Prompt Marketplace',
    metaDescription: 'Discover and purchase high-quality prompts for ChatGPT, Claude, and other AI models.',
    ogImage: '/images/og-image.jpg',
    // Social media
    twitterHandle: '@promptcat',
    facebookPage: 'promptcat',
    instagramHandle: 'promptcat',
  });

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/admin/settings');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin' && session?.user?.role !== 'superadmin') {
      router.push('/unauthorized');
    } else if (status === 'authenticated') {
      // In a real app, you would fetch settings from your API
      // For now, we'll just use the default values
      setLoading(false);
    }
  }, [status, session, router]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    // Handle checkbox inputs
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setSettings(prev => ({ ...prev, [name]: checked }));
    } else {
      setSettings(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // In a real app, you would save settings to your API
      // Example: await fetch('/api/admin/settings', { method: 'POST', body: JSON.stringify(settings) });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMessage({ type: 'success', text: 'Settings saved successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving settings. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <AdminLayout>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-white">Settings</h1>
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
          <h1 className="text-2xl font-semibold text-white">Settings</h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-4">
          <form onSubmit={handleSubmit}>
            {/* Message alert */}
            {message.text && (
              <div className={`mb-4 p-4 rounded-md ${message.type === 'success' ? 'bg-green-900/50 text-green-400 border border-green-800' : 'bg-red-900/50 text-red-400 border border-red-800'}`}>
                {message.text}
              </div>
            )}

            {/* General Settings */}
            <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
                <h3 className="text-lg leading-6 font-medium text-white">General Settings</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-400">Basic site configuration.</p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="siteName" className="block text-sm font-medium text-gray-400">Site Name</label>
                    <input
                      type="text"
                      name="siteName"
                      id="siteName"
                      className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                      value={settings.siteName}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-400">Contact Email</label>
                    <input
                      type="email"
                      name="contactEmail"
                      id="contactEmail"
                      className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                      value={settings.contactEmail}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-400">Site Description</label>
                    <textarea
                      name="siteDescription"
                      id="siteDescription"
                      rows={3}
                      className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                      value={settings.siteDescription}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="featuredPromptsCount" className="block text-sm font-medium text-gray-400">Featured Prompts Count</label>
                    <input
                      type="number"
                      name="featuredPromptsCount"
                      id="featuredPromptsCount"
                      min="1"
                      max="20"
                      className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                      value={settings.featuredPromptsCount}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="newPromptsCount" className="block text-sm font-medium text-gray-400">New Prompts Count</label>
                    <input
                      type="number"
                      name="newPromptsCount"
                      id="newPromptsCount"
                      min="1"
                      max="20"
                      className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                      value={settings.newPromptsCount}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="enablePayments"
                      id="enablePayments"
                      className="h-4 w-4 bg-gray-700 border-gray-600 rounded text-purple-600 focus:ring-purple-500"
                      checked={settings.enablePayments}
                      onChange={handleChange}
                    />
                    <label htmlFor="enablePayments" className="ml-2 block text-sm text-gray-400">Enable Payments</label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="enableRegistration"
                      id="enableRegistration"
                      className="h-4 w-4 bg-gray-700 border-gray-600 rounded text-purple-600 focus:ring-purple-500"
                      checked={settings.enableRegistration}
                      onChange={handleChange}
                    />
                    <label htmlFor="enableRegistration" className="ml-2 block text-sm text-gray-400">Enable User Registration</label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="maintenanceMode"
                      id="maintenanceMode"
                      className="h-4 w-4 bg-gray-700 border-gray-600 rounded text-purple-600 focus:ring-purple-500"
                      checked={settings.maintenanceMode}
                      onChange={handleChange}
                    />
                    <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-400">Maintenance Mode</label>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
                <h3 className="text-lg leading-6 font-medium text-white">SEO Settings</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-400">Search engine optimization configuration.</p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-400">Meta Title</label>
                    <input
                      type="text"
                      name="metaTitle"
                      id="metaTitle"
                      className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                      value={settings.metaTitle}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-400">Meta Description</label>
                    <textarea
                      name="metaDescription"
                      id="metaDescription"
                      rows={3}
                      className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                      value={settings.metaDescription}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="ogImage" className="block text-sm font-medium text-gray-400">OG Image URL</label>
                    <input
                      type="text"
                      name="ogImage"
                      id="ogImage"
                      className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                      value={settings.ogImage}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Settings */}
            <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
                <h3 className="text-lg leading-6 font-medium text-white">Social Media</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-400">Social media account information.</p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="twitterHandle" className="block text-sm font-medium text-gray-400">Twitter Handle</label>
                    <input
                      type="text"
                      name="twitterHandle"
                      id="twitterHandle"
                      className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                      value={settings.twitterHandle}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="facebookPage" className="block text-sm font-medium text-gray-400">Facebook Page</label>
                    <input
                      type="text"
                      name="facebookPage"
                      id="facebookPage"
                      className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                      value={settings.facebookPage}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="instagramHandle" className="block text-sm font-medium text-gray-400">Instagram Handle</label>
                    <input
                      type="text"
                      name="instagramHandle"
                      id="instagramHandle"
                      className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white"
                      value={settings.instagramHandle}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
