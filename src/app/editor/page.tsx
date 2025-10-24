"use client";

import { useState } from 'react';
import { useCodeExport } from '@/hooks/useCodeExport';
import { useBuilder } from '@/contexts/BuilderContext';

export default function EditorPage() {
  const { builderState } = useBuilder();
  const { exportCode, downloadCode, isExporting } = useCodeExport();
  const [code, setCode] = useState('');
  const [format, setFormat] = useState<'react' | 'html'>('react');

  const handleExport = async () => {
    const exported = await exportCode(builderState.pages, {
      format,
      includeStyles: true,
      minify: false,
    });
    setCode(exported);
  };

  const handleDownload = () => {
    const extension = format === 'react' ? 'jsx' : 'html';
    downloadCode(code, `exported-code.${extension}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Code Editor</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Export Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as 'react' | 'html')}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
              >
                <option value="react">React</option>
                <option value="html">HTML</option>
              </select>
            </div>

            <div className="flex gap-2 items-end">
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                {isExporting ? 'Exporting...' : 'Generate Code'}
              </button>
              {code && (
                <button
                  onClick={handleDownload}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Download
                </button>
              )}
            </div>
          </div>

          {code ? (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Generated Code</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                <code>{code}</code>
              </pre>
            </div>
          ) : (
            <div className="mt-6 text-center text-gray-500 py-12 border-2 border-dashed border-gray-300 rounded-lg">
              Click &quot;Generate Code&quot; to export your project
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Current Project Structure</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-gray-900">
            {JSON.stringify(builderState.pages, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
