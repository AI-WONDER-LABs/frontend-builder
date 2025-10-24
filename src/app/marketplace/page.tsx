"use client";

import { useState } from 'react';

const marketplaceItems = [
  {
    id: '1',
    name: 'Animated Button Pack',
    type: 'component',
    price: 'Free',
    rating: 4.8,
    downloads: 1250,
    author: 'John Doe',
  },
  {
    id: '2',
    name: 'Card Components',
    type: 'component',
    price: '$9.99',
    rating: 4.9,
    downloads: 2100,
    author: 'Jane Smith',
  },
  {
    id: '3',
    name: 'Form Builder',
    type: 'plugin',
    price: '$29.99',
    rating: 4.7,
    downloads: 850,
    author: 'DevTools Inc',
  },
  {
    id: '4',
    name: 'Data Visualization',
    type: 'plugin',
    price: '$49.99',
    rating: 4.9,
    downloads: 1500,
    author: 'Chart Masters',
  },
  {
    id: '5',
    name: 'Navigation Menu',
    type: 'component',
    price: 'Free',
    rating: 4.6,
    downloads: 3200,
    author: 'UI Experts',
  },
  {
    id: '6',
    name: 'Icon Library',
    type: 'asset',
    price: '$14.99',
    rating: 4.8,
    downloads: 1800,
    author: 'Icon Studio',
  },
];

export default function MarketplacePage() {
  const [filter, setFilter] = useState<string>('all');

  const filteredItems = filter === 'all' 
    ? marketplaceItems 
    : marketplaceItems.filter(item => item.type === filter);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Marketplace</h1>

        {/* Filters */}
        <div className="mb-8 flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('component')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'component'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Components
          </button>
          <button
            onClick={() => setFilter('plugin')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'plugin'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Plugins
          </button>
          <button
            onClick={() => setFilter('asset')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'asset'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Assets
          </button>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500">by {item.author}</p>
                </div>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded">
                  {item.type}
                </span>
              </div>
              
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span>{item.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>📥</span>
                  <span>{item.downloads}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">{item.price}</span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  {item.price === 'Free' ? 'Download' : 'Purchase'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
