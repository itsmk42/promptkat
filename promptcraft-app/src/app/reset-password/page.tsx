"use client";
import { useState, useEffect, FormEvent, Suspense } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    if (!token || !email) {
      setError('Invalid or missing reset token. Please request a new password reset link.');
    }
  }, [token, email]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token || !email) {
      setError('Invalid or missing reset token. Please request a new password reset link.');
      return;
    }

    if (!password) {
      setError('Please enter a new password');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reset password');
      }

      setIsSubmitted(true);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error: any) {
      console.error('Password reset error:', error);
      setError(error.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Reset Password</h1>
        <p className="text-lg text-gray-300 mb-8 max-w-xl text-center">
          Enter your new password below.
        </p>
        <div className="w-full max-w-md bg-gray-800/60 rounded-xl p-8 border border-gray-700 shadow-lg">
          {isSubmitted ? (
            <div className="text-center">
              <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg mb-6">
                <p className="font-medium">Password reset successful!</p>
                <p className="text-sm mt-2">
                  Your password has been updated. You will be redirected to the login page in a few seconds.
                </p>
              </div>
              <Link href="/login" className="text-purple-400 hover:text-purple-300">
                Go to login
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter new password"
                    disabled={isLoading || !token || !email}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Confirm new password"
                    disabled={isLoading || !token || !email}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition flex items-center justify-center"
                  disabled={isLoading || !token || !email}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Resetting...
                    </>
                  ) : 'Reset Password'}
                </button>

                <div className="text-center mt-4 text-sm text-gray-400">
                  <Link href="/forgot-password" className="text-purple-400 hover:text-purple-300">Request a new reset link</Link>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

// Loading fallback component
function ResetPasswordLoading() {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        <p className="mt-4 text-gray-300">Loading reset password form...</p>
      </div>
    </Layout>
  );
}

// Main component with Suspense boundary
export default function ResetPassword() {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
