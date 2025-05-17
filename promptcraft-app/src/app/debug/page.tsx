"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DebugPage() {
  const { data: session, status } = useSession();
  const [envVars, setEnvVars] = useState({
    NEXTAUTH_URL: "",
    NEXT_PUBLIC_APP_URL: "",
  });

  useEffect(() => {
    // Client-side environment variables (only NEXT_PUBLIC_ ones are available)
    setEnvVars({
      NEXTAUTH_URL: "Not available client-side",
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "Not set",
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Debug Page</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Environment Variables (Client-side)</h2>
        <div className="bg-gray-700 p-4 rounded-lg mb-4">
          <pre className="bg-gray-900 p-3 rounded overflow-auto">
            {JSON.stringify(envVars, null, 2)}
          </pre>
        </div>
        <p className="text-yellow-400 text-sm mb-4">
          Note: Only NEXT_PUBLIC_ environment variables are available on the client side.
          Check the server logs for all environment variables.
        </p>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Session Status: {status}</h2>
        
        {status === "authenticated" ? (
          <div>
            <p className="mb-2">Logged in as: {session?.user?.email}</p>
            <p className="mb-2">User role: {session?.user?.role || "No role found"}</p>
            
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold mb-2">Session Data:</h3>
              <pre className="bg-gray-900 p-3 rounded overflow-auto max-h-60">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>
          </div>
        ) : status === "loading" ? (
          <p>Loading session...</p>
        ) : (
          <p>Not logged in</p>
        )}
      </div>
      
      <div className="flex space-x-4">
        <Link href="/login" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">
          Login Page
        </Link>
        <Link href="/admin" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
          Admin Dashboard
        </Link>
        <Link href="/admin-test" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
          Admin Test
        </Link>
        <Link href="/" className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded">
          Home
        </Link>
      </div>
    </div>
  );
}
