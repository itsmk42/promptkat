"use client";
import { useState } from 'react';
import Layout from '@/components/Layout';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut({ callbackUrl: '/' });
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session?.user) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Profile</h1>
          <p className="text-lg text-gray-300 mb-8 max-w-xl text-center">
            Please sign in to view your profile.
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
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Profile</h1>

            <div className="bg-gray-800/40 rounded-xl p-8 border border-gray-700 shadow-lg mb-8">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center text-2xl font-bold mr-4">
                  {session.user.name ? session.user.name.charAt(0).toUpperCase() : session.user.email?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{session.user.name || 'User'}</h2>
                  <p className="text-gray-400">{session.user.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Account Information</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex justify-between">
                      <span>Email:</span>
                      <span>{session.user.email}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Name:</span>
                      <span>{session.user.name || 'Not set'}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Email verified:</span>
                      <span>{(session.user as any).emailVerified ? 'Yes' : 'No'}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Account Actions</h3>
                  <div className="space-y-3">
                    <Link href="/settings" className="block w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition text-center">
                      Edit Profile
                    </Link>
                    <Link href="/change-password" className="block w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition text-center">
                      Change Password
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition flex items-center justify-center"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Signing Out...
                        </>
                      ) : 'Sign Out'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/40 rounded-xl p-8 border border-gray-700 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Your Activity</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-purple-400">0</h3>
                  <p className="text-gray-300">Purchased Prompts</p>
                  <Link href="/purchases" className="text-sm text-purple-400 hover:text-purple-300 mt-2 inline-block">
                    View Purchases
                  </Link>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-purple-400">0</h3>
                  <p className="text-gray-300">Created Prompts</p>
                  <Link href="/my-prompts" className="text-sm text-purple-400 hover:text-purple-300 mt-2 inline-block">
                    Manage Prompts
                  </Link>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-purple-400">0</h3>
                  <p className="text-gray-300">Saved Prompts</p>
                  <Link href="/saved-prompts" className="text-sm text-purple-400 hover:text-purple-300 mt-2 inline-block">
                    View Saved
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
