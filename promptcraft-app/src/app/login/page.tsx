"use client";
import { useState, FormEvent } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { useSession, signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // For demo purposes, show credentials
      alert(`For demo purposes, use:\n\nRegular User:\nEmail: user@example.com\nPassword: password\n\nAdmin User:\nEmail: ballery@example.com\nPassword: ballery@619`);

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // Redirect to home page or dashboard
      router.push('/');
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    setError('');
    try {
      // Using signIn with redirect: true to handle the OAuth flow
      // The callbackUrl is where the user will be redirected after successful authentication
      await signIn(provider, {
        callbackUrl: '/',
        redirect: true
      });
      // Note: The code below won't execute as the page will redirect
    } catch (error) {
      console.error(`${provider} login error:`, error);
      setError(`Failed to login with ${provider}. Please try again or use email/password.`);
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Login</h1>
        <p className="text-lg text-gray-300 mb-8 max-w-xl text-center">Access your account to manage your prompts, purchases, and profile.</p>
        <div className="w-full max-w-md bg-gray-800/60 rounded-xl p-8 border border-gray-700 shadow-lg">
          <button
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition mb-4"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
            Continue with Google
          </button>
          <button
            className="w-full flex items-center justify-center gap-3 bg-gray-900 border border-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-800 transition"
            onClick={() => handleSocialLogin('github')}
            disabled={isLoading}
          >
            <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" className="w-6 h-6" />
            Continue with GitHub
          </button>
          <div className="my-4 border-t border-gray-700"></div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
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
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                <Link href="/forgot-password" className="text-xs text-purple-400 hover:text-purple-300">Forgot password?</Link>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                disabled={isLoading}
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-700 rounded"
                disabled={isLoading}
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
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
                  Logging in...
                </>
              ) : 'Login'}
            </button>

            <div className="text-center mt-4 text-sm text-gray-400">
              Don't have an account? <Link href="/join" className="text-purple-400 hover:text-purple-300">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}