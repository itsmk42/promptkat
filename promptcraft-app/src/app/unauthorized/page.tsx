"use client";

import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function Unauthorized() {
  const router = useRouter();

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4">
        <div className="text-red-500 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Access Denied</h1>
        
        <p className="text-xl text-gray-300 mb-8 max-w-xl text-center">
          You don't have permission to access this page.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.back()}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Go Back
          </button>
          
          <Link href="/" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition text-center">
            Return to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
}
