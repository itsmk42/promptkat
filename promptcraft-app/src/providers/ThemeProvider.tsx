'use client';

import React, { createContext, useContext, useEffect } from 'react';

// Simplified context since we only have dark mode now
interface ThemeContextType {
  theme: 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize dark mode on client side
  useEffect(() => {
    // Always set dark mode
    document.documentElement.classList.add('dark-mode');
    document.documentElement.classList.remove('light-mode');

    // Store the theme preference in localStorage for consistency
    localStorage.setItem('theme', 'dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
