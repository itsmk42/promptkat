"use client";
import { useState, FormEvent } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function ForgotPassword() {

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Call the API to send verification code
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, type: 'password-reset' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send password reset email');
      }

      setIsSubmitted(true);

      // In development, show the code (remove in production)
      if (data.code) {
        alert(`For development purposes only:\nReset code: ${data.code}\n\nIn production, this would be sent via email with a reset link.`);
      }
    } catch (error: any) {
      console.error('Password reset error:', error);
      setError(error.message || 'Failed to send password reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Reset Password</h1>
        <p className="text-lg text-gray-300 mb-8 max-w-xl text-center">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <div className="w-full max-w-md bg-gray-800/60 rounded-xl p-8 border border-gray-700 shadow-lg">
          {isSubmitted ? (
            <div className="text-center">
              <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg mb-6">
                <p className="font-medium">Password reset email sent!</p>
                <p className="text-sm mt-2">
                  Check your inbox for instructions to reset your password.
                </p>
              </div>
              <Link href="/login" className="text-purple-400 hover:text-purple-300">
                Return to login
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="you@example.com"
                    disabled={isLoading}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : 'Send Reset Link'}
                </button>

                <div className="text-center mt-4 text-sm text-gray-400">
                  Remember your password? <Link href="/login" className="text-purple-400 hover:text-purple-300">Login</Link>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
