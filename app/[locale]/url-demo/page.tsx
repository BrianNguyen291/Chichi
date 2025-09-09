'use client'

import { useState } from 'react'
import CleanUrlGenerator from '@/components/CleanUrlGenerator'

export default function UrlDemoPage() {
  const [inputSlug, setInputSlug] = useState('越南語言真相解密|法語?英語?其實我們最愛說')
  const [selectedLocale, setSelectedLocale] = useState('zh-Hant')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔗 URL Cleaner Demo</h1>
        
        <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Test Your Chinese URLs</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Chinese Slug:
              </label>
              <input
                type="text"
                value={inputSlug}
                onChange={(e) => setInputSlug(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your Chinese slug here..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Locale:
              </label>
              <select
                value={selectedLocale}
                onChange={(e) => setSelectedLocale(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="zh-Hant">Traditional Chinese</option>
                <option value="vi">Vietnamese</option>
              </select>
            </div>
          </div>
        </div>

        {inputSlug && (
          <CleanUrlGenerator
            originalSlug={inputSlug}
            locale={selectedLocale}
            onUrlSelect={(url) => {
              console.log('Selected URL:', url)
              // You can add additional logic here
            }}
          />
        )}

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">📚 How It Works</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>English Translation:</strong> Converts Chinese characters to English equivalents using a built-in dictionary.
            </p>
            <p>
              <strong>Numeric:</strong> Creates a short, unique identifier based on the original slug's hash.
            </p>
            <p>
              <strong>Short English:</strong> Limits the English translation to a maximum length (default: 30 characters).
            </p>
            <p>
              <strong>Auto:</strong> Intelligently chooses between English and numeric based on content length and complexity.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">🚀 Implementation</h4>
          <p className="text-sm text-blue-800">
            The URL rewriting system automatically handles redirects from old Chinese URLs to new clean URLs.
            Your existing links will continue to work while new links will use the cleaner format.
          </p>
        </div>
      </div>
    </div>
  )
}
