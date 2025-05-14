"use client";
import { useState } from 'react';
import Layout from '@/components/Layout';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Settings() {
  const { data: session } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Profile form state
  const [name, setName] = useState(session?.user?.name || '');
  const [email, setEmail] = useState(session?.user?.email || '');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');

  // Notification preferences state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [purchaseReceipts, setPurchaseReceipts] = useState(true);

  // Handle profile update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');

    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setSuccessMessage('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle notification preferences update
  const handleNotificationUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');

    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setSuccessMessage('Notification preferences updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error updating notification preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session?.user) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Settings</h1>
          <p className="text-lg text-gray-300 mb-8 max-w-xl text-center">
            Please sign in to access your settings.
          </p>
          <Link href="/login" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition">
            Sign In
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Settings</h1>
                <p className="text-gray-400">Manage your account preferences</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link href="/dashboard" className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Dashboard
                </Link>
              </div>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-3 rounded-lg mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                {successMessage}
              </div>
            )}

            <div className="bg-gray-800/40 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-gray-700">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`py-4 px-6 font-medium text-sm ${
                    activeTab === 'profile'
                      ? 'bg-gray-700/50 text-white'
                      : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/30'
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`py-4 px-6 font-medium text-sm ${
                    activeTab === 'notifications'
                      ? 'bg-gray-700/50 text-white'
                      : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/30'
                  }`}
                >
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`py-4 px-6 font-medium text-sm ${
                    activeTab === 'security'
                      ? 'bg-gray-700/50 text-white'
                      : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/30'
                  }`}
                >
                  Security
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Profile Settings */}
                {activeTab === 'profile' && (
                  <form onSubmit={handleProfileUpdate}>
                    <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
                    
                    <div className="mb-6">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Your email"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Tell us about yourself"
                      ></textarea>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        id="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition flex items-center"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                  <form onSubmit={handleNotificationUpdate}>
                    <h2 className="text-xl font-bold mb-6">Notification Preferences</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="email-notifications"
                            type="checkbox"
                            checked={emailNotifications}
                            onChange={(e) => setEmailNotifications(e.target.checked)}
                            className="w-4 h-4 text-purple-600 border-gray-700 rounded focus:ring-purple-500 focus:ring-offset-gray-800"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="email-notifications" className="font-medium text-white">Email Notifications</label>
                          <p className="text-gray-400">Receive email notifications about your account activity.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="marketing-emails"
                            type="checkbox"
                            checked={marketingEmails}
                            onChange={(e) => setMarketingEmails(e.target.checked)}
                            className="w-4 h-4 text-purple-600 border-gray-700 rounded focus:ring-purple-500 focus:ring-offset-gray-800"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="marketing-emails" className="font-medium text-white">Marketing Emails</label>
                          <p className="text-gray-400">Receive emails about new features, prompts, and special offers.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="purchase-receipts"
                            type="checkbox"
                            checked={purchaseReceipts}
                            onChange={(e) => setPurchaseReceipts(e.target.checked)}
                            className="w-4 h-4 text-purple-600 border-gray-700 rounded focus:ring-purple-500 focus:ring-offset-gray-800"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="purchase-receipts" className="font-medium text-white">Purchase Receipts</label>
                          <p className="text-gray-400">Receive email receipts for your purchases.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-8">
                      <button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition flex items-center"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          'Save Preferences'
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* Security Settings */}
                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-xl font-bold mb-6">Security Settings</h2>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-4">Change Password</h3>
                      <Link href="/change-password" className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition inline-block">
                        Change Password
                      </Link>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                      <p className="text-gray-400 mb-4">Add an extra layer of security to your account by enabling two-factor authentication.</p>
                      <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition">
                        Enable 2FA
                      </button>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4 text-red-400">Danger Zone</h3>
                      <p className="text-gray-400 mb-4">Permanently delete your account and all associated data.</p>
                      <button className="bg-red-600/30 hover:bg-red-600/50 text-red-400 font-semibold py-2 px-4 rounded-lg transition border border-red-600/50">
                        Delete Account
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
