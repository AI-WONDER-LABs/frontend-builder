import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Frontend Builder
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            A powerful SaaS website and app builder with drag-and-drop UI, AI integration, and more
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link 
            href="/builder" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Builder →
            </h2>
            <p className="text-gray-600">
              Drag-and-drop interface to build your website visually
            </p>
          </Link>

          <Link 
            href="/editor" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Code Editor →
            </h2>
            <p className="text-gray-600">
              Edit code directly and export your project
            </p>
          </Link>

          <Link 
            href="/templates" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Templates →
            </h2>
            <p className="text-gray-600">
              Browse and use pre-built templates
            </p>
          </Link>

          <Link 
            href="/ai" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              AI Assistant →
            </h2>
            <p className="text-gray-600">
              Use AI to generate components and layouts
            </p>
          </Link>

          <Link 
            href="/marketplace" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Marketplace →
            </h2>
            <p className="text-gray-600">
              Find and share components and templates
            </p>
          </Link>

          <Link 
            href="/analytics" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Analytics →
            </h2>
            <p className="text-gray-600">
              Track your website performance and insights
            </p>
          </Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Features</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              Drag-and-drop UI builder
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              Code export functionality
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              Multi-page support
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              AI model integration
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              API generator
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              Domain management
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              Analytics dashboard
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              Template marketplace
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
