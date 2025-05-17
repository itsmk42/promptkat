"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
import SearchBar from '@/components/SearchBar';

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-gray-800 backdrop-blur-md" style={{ backgroundColor: 'var(--nav-bg)', borderColor: 'var(--nav-border)' }}>
      <div className="container mx-auto px-2 py-2 flex items-center justify-between">
        <Link href="/" className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 flex items-center">
          <img src="/promptkat-logo.svg" alt="PromptKat Logo" className="inline-block w-10 h-10 sm:w-12 sm:h-12 mr-2 align-middle filter drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 hover:scale-110" />
          <div className="font-mono tracking-tight">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text text-sm sm:text-lg">prompt</span>
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text text-sm sm:text-lg font-bold">Kat</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
          <Link href="/#featured" className="hover:brightness-125 transition-colors text-sm font-mono text-blue-400">featured</Link>
          <Link href="/categories" className="hover:brightness-125 transition-colors text-sm font-mono text-green-400">categories</Link>
          <Link href="/request-category" className="hover:brightness-125 transition-colors text-sm font-mono text-cyan-400">requestCategory</Link>
          <Link href="/pricing" className="hover:brightness-125 transition-colors text-sm font-mono text-yellow-400">pricing</Link>
          <Link href="/sellers" className="hover:brightness-125 transition-colors text-sm font-mono text-pink-400">forSellers</Link>
          <SearchBar className="ml-2 hidden lg:block" />
        </div>

        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {status === 'loading' ? (
            <div className="w-6 h-6 rounded-sm bg-gray-700 animate-pulse"></div>
          ) : session?.user ? (
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center space-x-1 focus:outline-none"
                aria-expanded={isProfileMenuOpen}
                aria-haspopup="true"
              >
                <div className="w-6 h-6 rounded-sm bg-purple-600 flex items-center justify-center text-xs font-mono">
                  {session.user.name ? session.user.name.charAt(0).toUpperCase() : session.user.email?.charAt(0).toUpperCase()}
                </div>
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800/90 backdrop-blur-md rounded-md shadow-xl py-1 z-50 border border-gray-700/50 font-mono transform transition-all duration-150 ease-in-out">
                  <div className="px-4 py-2 border-b border-gray-700/50 bg-gradient-to-r from-purple-900/30 to-gray-800/30">
                    <p className="text-xs font-medium text-white truncate">{session.user.name || 'User'}</p>
                    <p className="text-[10px] text-gray-400 truncate">{session.user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="flex items-center px-4 py-2 text-xs text-gray-300 hover:bg-gray-700/70 hover:text-white font-mono group transition-colors"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <span className="text-blue-400 group-hover:text-blue-300 text-sm">.dashboard</span>
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 text-xs text-gray-300 hover:bg-gray-700/70 hover:text-white font-mono group transition-colors"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <span className="text-green-400 group-hover:text-green-300 text-sm">.profile</span>
                  </Link>
                  <Link
                    href="/my-prompts"
                    className="flex items-center px-4 py-2 text-xs text-gray-300 hover:bg-gray-700/70 hover:text-white font-mono group transition-colors"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <span className="text-yellow-400 group-hover:text-yellow-300 text-sm">.myPrompts</span>
                  </Link>
                  <Link
                    href="/purchases"
                    className="flex items-center px-4 py-2 text-xs text-gray-300 hover:bg-gray-700/70 hover:text-white font-mono group transition-colors"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <span className="text-pink-400 group-hover:text-pink-300 text-sm">.purchases</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center px-4 py-2 text-xs text-gray-300 hover:bg-gray-700/70 hover:text-white font-mono group transition-colors"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <span className="text-purple-400 group-hover:text-purple-300 text-sm">.settings</span>
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsProfileMenuOpen(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-gray-700/70 hover:text-red-300 border-t border-gray-700/50 font-mono group transition-colors mt-1"
                  >
                    <span className="text-red-400 group-hover:text-red-300 text-sm">.signOut</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="hover:text-purple-400 transition-colors text-sm font-mono">.login</Link>
              <Link href="/join" className="bg-gradient-to-r from-purple-500 to-pink-600 px-2 py-1 rounded-sm text-xs font-mono hover:opacity-90 transition">.join</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-1.5">
          {!isMenuOpen && (
            <>
              {session?.user ? (
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center focus:outline-none mr-1.5 ml-1.5"
                  aria-expanded={isProfileMenuOpen}
                  aria-haspopup="true"
                >
                  <div className="w-6 h-6 rounded-sm bg-purple-600 flex items-center justify-center text-xs font-mono">
                    {session.user.name ? session.user.name.charAt(0).toUpperCase() : session.user.email?.charAt(0).toUpperCase()}
                  </div>
                </button>
              ) : (
                <Link href="/login" className="text-[10px] hover:text-purple-400 transition-colors mr-1.5 ml-1.5 font-mono">.login</Link>
              )}
            </>
          )}
          <button
            className="text-sm p-1"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Open menu</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 fixed w-full top-[54px] left-0 right-0 max-h-[calc(100vh-54px)] overflow-y-auto shadow-lg">
          <div className="p-2 sticky top-0 bg-gray-800 z-10">
            <SearchBar fullWidth placeholder="search()" />
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1 font-mono">
            <Link
              href="/#featured"
              className="block px-2 py-1.5 rounded-sm text-xs font-medium text-blue-400 hover:bg-gray-700 active:bg-gray-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <svg className="w-3 h-3 mr-1.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                featured
              </div>
            </Link>
            <Link
              href="/categories"
              className="block px-2 py-1.5 rounded-sm text-xs font-medium text-green-400 hover:bg-gray-700 active:bg-gray-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <svg className="w-3 h-3 mr-1.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                categories
              </div>
            </Link>
            <Link
              href="/request-category"
              className="block px-2 py-1.5 rounded-sm text-xs font-medium text-cyan-400 hover:bg-gray-700 active:bg-gray-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <svg className="w-3 h-3 mr-1.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                requestCategory
              </div>
            </Link>
            <Link
              href="/pricing"
              className="block px-2 py-1.5 rounded-sm text-xs font-medium text-yellow-400 hover:bg-gray-700 active:bg-gray-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <svg className="w-3 h-3 mr-1.5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                pricing
              </div>
            </Link>
            <Link
              href="/sellers"
              className="block px-2 py-1.5 rounded-sm text-xs font-medium text-pink-400 hover:bg-gray-700 active:bg-gray-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <svg className="w-3 h-3 mr-1.5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                forSellers
              </div>
            </Link>

            {/* Mobile Auth Links */}
            {!session?.user && (
              <div className="pt-2 pb-1 border-t border-gray-700 mt-2">
                <Link
                  href="/login"
                  className="block px-2 py-1.5 rounded-sm text-[10px] font-medium text-white hover:bg-gray-700 active:bg-gray-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mr-1.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    .login
                  </div>
                </Link>
                <Link
                  href="/join"
                  className="block px-2 py-1.5 rounded-sm text-[10px] font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 active:from-purple-800 active:to-pink-800 mt-1.5 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center justify-center">
                    <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    .join
                  </div>
                </Link>
              </div>
            )}

            {/* Mobile Profile Links */}
            {session?.user && (
              <div className="pt-2 pb-1 border-t border-gray-700 mt-2">
                <div className="flex items-center px-2 mb-1.5">
                  <div className="w-6 h-6 rounded-sm bg-purple-600 flex items-center justify-center text-xs font-mono mr-2">
                    {session.user.name ? session.user.name.charAt(0).toUpperCase() : session.user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-[10px] font-medium text-white font-mono">{session.user.name || 'User'}</div>
                    <div className="text-[10px] font-medium text-gray-400 font-mono">{session.user.email}</div>
                  </div>
                </div>
                <div className="space-y-0.5">
                  <Link
                    href="/dashboard"
                    className="block px-2 py-1.5 rounded-sm text-[10px] font-medium text-white hover:bg-gray-700 active:bg-gray-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-1.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      .dashboard
                    </div>
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-2 py-1.5 rounded-sm text-[10px] font-medium text-white hover:bg-gray-700 active:bg-gray-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-1.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      .profile
                    </div>
                  </Link>
                  <Link
                    href="/my-prompts"
                    className="block px-2 py-1.5 rounded-sm text-[10px] font-medium text-white hover:bg-gray-700 active:bg-gray-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-1.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      .myPrompts
                    </div>
                  </Link>
                  <Link
                    href="/purchases"
                    className="block px-2 py-1.5 rounded-sm text-[10px] font-medium text-white hover:bg-gray-700 active:bg-gray-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-1.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      .purchases
                    </div>
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-2 py-1.5 rounded-sm text-[10px] font-medium text-white hover:bg-gray-700 active:bg-gray-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-1.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      .settings
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-2 py-1.5 rounded-sm text-[10px] font-medium text-red-400 hover:bg-gray-700 hover:text-red-300 active:bg-gray-600 transition-colors mt-1.5 border-t border-gray-700 pt-2"
                  >
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      .signOut
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;