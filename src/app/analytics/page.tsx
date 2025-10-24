"use client";

import { useEffect, useState } from 'react';
import { analyticsService } from '@/services/analyticsService';

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState({
    totalPageViews: 0,
    uniqueVisitors: 0,
    averageSessionDuration: 0,
    bounceRate: 0,
  });

  useEffect(() => {
    // Simulate tracking page view
    analyticsService.trackPageView('/analytics', 'Analytics Dashboard');

    // Load metrics
    analyticsService.getMetrics().then(setMetrics);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Analytics Dashboard</h1>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Page Views</h3>
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{metrics.totalPageViews}</p>
            <p className="text-sm text-green-600 mt-2">↑ 12% from last week</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Unique Visitors</h3>
              <span className="text-2xl">👥</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{metrics.uniqueVisitors}</p>
            <p className="text-sm text-green-600 mt-2">↑ 8% from last week</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Avg. Session</h3>
              <span className="text-2xl">⏱️</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {Math.floor(metrics.averageSessionDuration / 60)}m {metrics.averageSessionDuration % 60}s
            </p>
            <p className="text-sm text-green-600 mt-2">↑ 5% from last week</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Bounce Rate</h3>
              <span className="text-2xl">📉</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {(metrics.bounceRate * 100).toFixed(1)}%
            </p>
            <p className="text-sm text-red-600 mt-2">↓ 3% from last week</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Traffic Over Time</h2>
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
              <p className="text-gray-500">Chart visualization would go here</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Top Pages</h2>
            <div className="space-y-4">
              {[
                { path: '/', views: 1250 },
                { path: '/builder', views: 890 },
                { path: '/templates', views: 650 },
                { path: '/ai', views: 420 },
                { path: '/marketplace', views: 380 },
              ].map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">{page.path}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(page.views / 1250) * 100}%` }}
                      />
                    </div>
                    <span className="text-gray-900 font-medium w-12 text-right">
                      {page.views}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Events Section */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Recent Events</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-gray-700">Event Name</th>
                  <th className="text-left py-3 px-4 text-gray-700">Timestamp</th>
                  <th className="text-left py-3 px-4 text-gray-700">User</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">Component Added</td>
                  <td className="py-3 px-4 text-gray-600">2 minutes ago</td>
                  <td className="py-3 px-4 text-gray-600">Anonymous</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">Template Used</td>
                  <td className="py-3 px-4 text-gray-600">15 minutes ago</td>
                  <td className="py-3 px-4 text-gray-600">Anonymous</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">Code Exported</td>
                  <td className="py-3 px-4 text-gray-600">1 hour ago</td>
                  <td className="py-3 px-4 text-gray-600">Anonymous</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
