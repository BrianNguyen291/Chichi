'use client'

import { useState, useEffect } from 'react'
import { getSlugOptions, generateBetterSlug } from '@/lib/wordpress-api'
import { generateCleanUrl, getUrlVariations } from '@/lib/url-rewriter'

interface CleanUrlGeneratorProps {
  originalSlug: string
  locale?: string
  onUrlSelect?: (selectedUrl: string) => void
}

export default function CleanUrlGenerator({ 
  originalSlug, 
  locale = 'en', 
  onUrlSelect 
}: CleanUrlGeneratorProps) {
  const [selectedType, setSelectedType] = useState<'english' | 'numeric' | 'short' | 'auto'>('auto')
  const [urlVariations, setUrlVariations] = useState<ReturnType<typeof getUrlVariations> | null>(null)

  useEffect(() => {
    const variations = getUrlVariations(originalSlug, locale)
    setUrlVariations(variations)
  }, [originalSlug, locale])

  if (!urlVariations) return null

  const handleUrlSelect = (url: string) => {
    if (onUrlSelect) {
      onUrlSelect(url)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
      console.log('URL copied to clipboard:', text)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold">🔗 URL Options</h3>
      
      {/* Original URL */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Original URL:</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={urlVariations.original}
            readOnly
            className="flex-1 px-3 py-2 border rounded text-sm bg-gray-100"
          />
          <button
            onClick={() => copyToClipboard(urlVariations.original)}
            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
          >
            Copy
          </button>
        </div>
      </div>

      {/* URL Type Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Choose URL Type:</label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as any)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="auto">Auto (Recommended)</option>
          <option value="english">English Translation</option>
          <option value="numeric">Numeric (Shortest)</option>
          <option value="short">Short English</option>
        </select>
      </div>

      {/* Generated URLs */}
      <div className="space-y-3">
        <h4 className="font-medium">Generated URLs:</h4>
        
        {/* English URL */}
        <div className="space-y-1">
          <label className="text-sm text-gray-600">English Translation:</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={urlVariations.english}
              readOnly
              className="flex-1 px-3 py-2 border rounded text-sm bg-white"
            />
            <button
              onClick={() => {
                handleUrlSelect(urlVariations.english)
                copyToClipboard(urlVariations.english)
              }}
              className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
            >
              Use & Copy
            </button>
          </div>
        </div>

        {/* Numeric URL */}
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Numeric (Shortest):</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={urlVariations.numeric}
              readOnly
              className="flex-1 px-3 py-2 border rounded text-sm bg-white"
            />
            <button
              onClick={() => {
                handleUrlSelect(urlVariations.numeric)
                copyToClipboard(urlVariations.numeric)
              }}
              className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded text-sm"
            >
              Use & Copy
            </button>
          </div>
        </div>

        {/* Short URL */}
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Short English:</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={urlVariations.short}
              readOnly
              className="flex-1 px-3 py-2 border rounded text-sm bg-white"
            />
            <button
              onClick={() => {
                handleUrlSelect(urlVariations.short)
                copyToClipboard(urlVariations.short)
              }}
              className="px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded text-sm"
            >
              Use & Copy
            </button>
          </div>
        </div>

        {/* Auto URL */}
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Auto (Smart Choice):</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={urlVariations.auto}
              readOnly
              className="flex-1 px-3 py-2 border rounded text-sm bg-white"
            />
            <button
              onClick={() => {
                handleUrlSelect(urlVariations.auto)
                copyToClipboard(urlVariations.auto)
              }}
              className="px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded text-sm"
            >
              Use & Copy
            </button>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">💡 Recommendations:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>English Translation:</strong> Best for SEO and readability</li>
          <li>• <strong>Numeric:</strong> Shortest for social sharing</li>
          <li>• <strong>Short English:</strong> Balance between length and readability</li>
          <li>• <strong>Auto:</strong> Smart choice based on content</li>
        </ul>
      </div>
    </div>
  )
}
