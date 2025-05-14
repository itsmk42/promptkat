"use client";
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyEmail() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  // Get email from query params or session
  useEffect(() => {
    const queryEmail = searchParams.get('email');
    if (queryEmail) {
      setEmail(queryEmail);
    } else if (session?.user?.email) {
      setEmail(session.user.email);
    }
  }, [searchParams, session]);

  // Auto-verify if token is in URL
  useEffect(() => {
    const token = searchParams.get('token');
    if (token && email) {
      handleVerify(token);
    }
  }, [searchParams, email]);

  const handleVerify = async (verificationCode: string) => {
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!verificationCode) {
      setError('Verification code is required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Call the API to verify the code
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code: verificationCode, type: 'email' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      setIsVerified(true);

      // Redirect to home page after 3 seconds
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (error: any) {
      console.error('Verification error:', error);
      setError(error.message || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleVerify(code);
  };

  const handleResendCode = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }

    setIsSending(true);
    setError('');

    try {
      // Call the API to send verification code
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, type: 'email' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send verification code');
      }

      // In development, show the code (remove in production)
      if (data.code) {
        alert(`Verification code: ${data.code}\n\nIn a production environment, this would be sent via email.`);
      } else {
        alert(`Verification code sent to ${email}. Please check your inbox.`);
      }
    } catch (error: any) {
      console.error('Error sending verification code:', error);
      setError(error.message || 'Failed to send verification code');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Verify Your Email</h1>
        <p className="text-lg text-gray-300 mb-8 max-w-xl text-center">
          Please verify your email address to complete your registration.
        </p>
        <div className="w-full max-w-md bg-gray-800/60 rounded-xl p-8 border border-gray-700 shadow-lg">
          {isVerified ? (
            <div className="text-center">
              <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg mb-6">
                <p className="font-medium">Email verified successfully!</p>
                <p className="text-sm mt-2">
                  Your email has been verified. You will be redirected to the home page in a few seconds.
                </p>
              </div>
              <Link href="/" className="text-purple-400 hover:text-purple-300">
                Go to home page
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
                    disabled={isLoading || isSending || !!session?.user?.email}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-gray-300 mb-1">Verification Code</label>
                  <input
                    type="text"
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter verification code"
                    disabled={isLoading || isSending}
                    required
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition flex items-center justify-center"
                    disabled={isLoading || isSending}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                      </>
                    ) : 'Verify Email'}
                  </button>

                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition flex items-center justify-center"
                    disabled={isLoading || isSending}
                  >
                    {isSending ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : 'Resend Code'}
                  </button>
                </div>

                <div className="text-center mt-4 text-sm text-gray-400">
                  <p>
                    Didn't receive a code? Check your spam folder or{' '}
                    <button
                      type="button"
                      onClick={handleResendCode}
                      className="text-purple-400 hover:text-purple-300 underline"
                      disabled={isLoading || isSending}
                    >
                      request a new one
                    </button>.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
