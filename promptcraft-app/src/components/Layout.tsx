import React from 'react';
import Header from '@/components/Header';

interface LayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, fullWidth = false }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`flex-grow ${fullWidth ? 'w-full' : 'container mx-auto'} px-2 xs:px-3 py-3 sm:py-4 mt-[46px] sm:mt-[48px]`}>
        {children}
      </main>
      {/* Footer is already included in the root layout */}
    </div>
  );
};

export default Layout;