import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  title?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ title = 'Frontend Builder' }) => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              {title}
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/builder" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Builder
            </Link>
            <Link href="/editor" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Editor
            </Link>
            <Link href="/templates" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Templates
            </Link>
            <Link href="/ai" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              AI
            </Link>
            <Link href="/marketplace" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Marketplace
            </Link>
            <Link href="/analytics" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Analytics
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
