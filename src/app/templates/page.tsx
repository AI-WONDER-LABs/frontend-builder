"use client";

import { useState } from 'react';

const templates = [
  {
    id: '1',
    name: 'Landing Page',
    category: 'Marketing',
    description: 'Modern landing page with hero section, features, and CTA',
    preview: '🎨',
  },
  {
    id: '2',
    name: 'Dashboard',
    category: 'Admin',
    description: 'Admin dashboard with charts and data tables',
    preview: '📊',
  },
  {
    id: '3',
    name: 'E-commerce',
    category: 'Store',
    description: 'Product listing and shopping cart',
    preview: '🛒',
  },
  {
    id: '4',
    name: 'Blog',
    category: 'Content',
    description: 'Blog layout with article grid',
    preview: '📝',
  },
  {
    id: '5',
    name: 'Portfolio',
    category: 'Personal',
    description: 'Creative portfolio showcase',
    preview: '🎭',
  },
  {
    id: '6',
    name: 'Pricing Page',
    category: 'Marketing',
    description: 'Pricing tiers and comparison',
    preview: '💰',
  },
];

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(templates.map(t => t.category)))];
  
  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Templates</h1>

        {/* Categories */}
        <div className="mb-8 flex gap-2 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(template => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <span className="text-6xl">{template.preview}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {template.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
