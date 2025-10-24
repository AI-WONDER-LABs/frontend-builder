"use client";

import { useBuilder } from '@/contexts/BuilderContext';
import { useState } from 'react';

export default function PreviewPage() {
  const { builderState } = useBuilder();
  const [selectedPageId, setSelectedPageId] = useState(builderState.currentPageId);

  const currentPage = builderState.pages.find(p => p.id === selectedPageId);

  const renderComponent = (component: any) => {
    switch (component.type) {
      case 'button':
        return (
          <button
            key={component.id}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Button
          </button>
        );
      case 'text':
        return (
          <p key={component.id} className="text-gray-700">
            Sample text content
          </p>
        );
      case 'heading':
        return (
          <h2 key={component.id} className="text-2xl font-bold text-gray-900">
            Heading
          </h2>
        );
      case 'input':
        return (
          <input
            key={component.id}
            type="text"
            placeholder="Input field"
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        );
      case 'image':
        return (
          <div
            key={component.id}
            className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center"
          >
            <span className="text-gray-500">Image Placeholder</span>
          </div>
        );
      case 'container':
        return (
          <div key={component.id} className="p-4 border border-gray-300 rounded-lg">
            {component.children?.map(renderComponent)}
          </div>
        );
      default:
        return (
          <div key={component.id} className="p-2 bg-gray-100 rounded">
            {component.type}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Preview</h1>
          <div className="flex items-center gap-4">
            <select
              value={selectedPageId || ''}
              onChange={(e) => setSelectedPageId(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
            >
              {builderState.pages.map(page => (
                <option key={page.id} value={page.id}>
                  {page.name}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <button className="px-3 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300">
                📱 Mobile
              </button>
              <button className="px-3 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300">
                💻 Desktop
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg min-h-[600px] p-8">
          {currentPage?.components.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              No components to preview. Add components in the builder.
            </div>
          ) : (
            <div className="space-y-4">
              {currentPage?.components.map(renderComponent)}
            </div>
          )}
        </div>
      </div>

      {/* Page Info */}
      <div className="fixed bottom-8 right-8 bg-white rounded-lg shadow-lg p-4 max-w-xs">
        <h3 className="font-semibold text-gray-900 mb-2">Page Info</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Name:</strong> {currentPage?.name}</p>
          <p><strong>Path:</strong> {currentPage?.path}</p>
          <p><strong>Components:</strong> {currentPage?.components.length || 0}</p>
        </div>
      </div>
    </div>
  );
}
