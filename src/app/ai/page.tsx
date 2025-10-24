"use client";

import { useState } from 'react';
import { aiService } from '@/services/aiService';

export default function AIPage() {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleGenerateComponent = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const code = await aiService.generateComponent(prompt);
      setGeneratedCode(code);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGetSuggestions = async () => {
    if (!generatedCode) return;

    const improvementSuggestions = await aiService.suggestImprovements(generatedCode);
    setSuggestions(improvementSuggestions);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">AI Assistant</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Generate Component</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe your component
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g., Create a hero section with a title, subtitle, and call-to-action button"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  rows={6}
                />
              </div>
              <button
                onClick={handleGenerateComponent}
                disabled={isGenerating || !prompt.trim()}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                {isGenerating ? 'Generating...' : 'Generate with AI'}
              </button>
            </div>

            {suggestions.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">AI Suggestions</h3>
                <ul className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="text-blue-600 mr-2">💡</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Output Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Generated Code</h2>
              {generatedCode && (
                <button
                  onClick={handleGetSuggestions}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  Get AI Suggestions
                </button>
              )}
            </div>
            {generatedCode ? (
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto max-h-[500px]">
                <code>{generatedCode}</code>
              </pre>
            ) : (
              <div className="text-center text-gray-500 py-12 border-2 border-dashed border-gray-300 rounded-lg">
                Your AI-generated code will appear here
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900">AI Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">Component Generation</h3>
              <p className="text-sm text-gray-600">
                Generate React components from natural language descriptions
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-gray-900 mb-2">Code Suggestions</h3>
              <p className="text-sm text-gray-600">
                Get AI-powered suggestions to improve your code
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-gray-900 mb-2">Layout Generation</h3>
              <p className="text-sm text-gray-600">
                Create responsive layouts with AI assistance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
