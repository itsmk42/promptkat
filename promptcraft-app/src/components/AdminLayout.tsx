"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import KatLogo from './KatLogo';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'dashboard()', href: '/admin', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', color: 'text-blue-400' },
    { name: 'prompts()', href: '/admin/prompts', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'text-green-400' },
    { name: 'categories()', href: '/admin/categories', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z', color: 'text-yellow-400' },
    { name: 'users()', href: '/admin/users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', color: 'text-pink-400' },
    { name: 'analytics()', href: '/admin/analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', color: 'text-orange-400' },
    { name: 'settings()', href: '/admin/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', color: 'text-purple-400' },
    { name: 'feedback()', href: '/admin/feedback', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', color: 'text-teal-400' },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 flex md:hidden ${sidebarOpen ? 'visible' : 'invisible'}`} role="dialog" aria-modal="true">
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-in-out duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" onClick={() => setSidebarOpen(false)}></div>

        <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-gray-800 transform transition ease-in-out duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 h-0 pt-6 pb-5 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <Link href="/" className="flex items-center space-x-1">
                <KatLogo size={24} />
                <div className="font-mono tracking-tight">
                  <span className="text-xs font-medium text-white">Prompt</span>
                  <span className="text-xs font-medium text-purple-400">Kat</span>
                  <span className="text-gray-400 text-xs ml-0.5">_</span>
                  <span className="text-gray-400 text-xs">()</span>
                </div>
              </Link>
            </div>
            <nav className="mt-7 px-3 space-y-1.5">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? 'bg-gray-900 text-white'
                      : `${item.color} hover:bg-gray-700 hover:brightness-125`
                  } group flex items-center px-2 py-1.5 text-xs font-medium rounded-sm font-mono`}
                >
                  <svg
                    className={`${
                      pathname === item.href ? 'text-white' : item.color
                    } mr-2 flex-shrink-0 h-3.5 w-3.5`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                  </svg>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
            <div className="flex-shrink-0 group block w-full">
              <div className="flex items-center">
                <div>
                  <div className="h-6 w-6 rounded-sm bg-purple-600 flex items-center justify-center text-white text-[10px] font-mono">
                    {session?.user?.name?.charAt(0) || 'A'}
                  </div>
                </div>
                <div className="ml-2 overflow-hidden">
                  <p className="text-[10px] font-medium text-white truncate font-mono">{session?.user?.name || 'Admin'}</p>
                  <p className="text-[10px] font-medium text-gray-400 group-hover:text-gray-300 truncate font-mono">{session?.user?.email || 'admin@example.com'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
          <div className="flex-1 flex flex-col pt-6 pb-5 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Link href="/" className="flex items-center space-x-1">
                <KatLogo size={24} />
                <div className="font-mono tracking-tight">
                  <span className="text-xs font-medium text-white">Prompt</span>
                  <span className="text-xs font-medium text-purple-400">Kat</span>
                  <span className="text-gray-400 text-xs ml-0.5">_</span>
                  <span className="text-gray-400 text-xs">()</span>
                </div>
              </Link>
            </div>
            <nav className="mt-7 flex-1 px-3 space-y-1.5">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? 'bg-gray-900 text-white'
                      : `${item.color} hover:bg-gray-700 hover:brightness-125`
                  } group flex items-center px-2 py-1.5 text-xs font-medium rounded-sm font-mono`}
                >
                  <svg
                    className={`${
                      pathname === item.href ? 'text-white' : item.color
                    } mr-2 flex-shrink-0 h-3.5 w-3.5`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                  </svg>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <div className="h-6 w-6 rounded-sm bg-purple-600 flex items-center justify-center text-white text-[10px] font-mono">
                    {session?.user?.name?.charAt(0) || 'A'}
                  </div>
                </div>
                <div className="ml-2 overflow-hidden">
                  <p className="text-[10px] font-medium text-white truncate font-mono">{session?.user?.name || 'Admin'}</p>
                  <p className="text-[10px] font-medium text-gray-400 group-hover:text-gray-300 truncate font-mono">{session?.user?.email || 'admin@example.com'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-800">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-10 w-10 inline-flex items-center justify-center rounded-sm text-gray-300 hover:text-white focus:outline-none focus:ring-1 focus:ring-inset focus:ring-purple-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <main className="flex-1 pb-4 pt-2">
          <div className="font-mono text-[10px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
