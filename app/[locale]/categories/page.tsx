'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCategories, WPCategory } from '@/lib/wordpress-api'
import { colors } from '@/lib/colors'

interface CategoriesPageProps {
  params: {
    locale: string
  }
}

export default function CategoriesPage({ params }: CategoriesPageProps) {
  const [categories, setCategories] = useState<WPCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoading(true)
        setError(null)
        const fetchedCategories = await getCategories(params.locale)
        setCategories(fetchedCategories)
      } catch (err) {
        setError('Failed to load categories')
        console.error('Error loading categories:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadCategories()
  }, [params.locale])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 
        className="mb-8 text-3xl font-bold"
        style={{ color: colors.darkOlive }}
      >
        Categories
      </h1>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}

      {error && (
        <div 
          className="rounded-md bg-red-50 p-4 text-center"
          style={{ color: colors.darkOlive }}
        >
          {error}
        </div>
      )}

      {!isLoading && !error && categories.length === 0 && (
        <div 
          className="text-center py-12"
          style={{ color: colors.darkOlive }}
        >
          No categories found.
        </div>
      )}

      {!isLoading && !error && categories.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${params.locale}/category/${category.slug}`}
              className="block overflow-hidden rounded-lg bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <h2 
                className="mb-2 text-xl font-semibold"
                style={{ color: colors.darkOlive }}
              >
                {category.name}
              </h2>
              {category.description && (
                <p 
                  className="mb-4 text-sm"
                  style={{ color: colors.darkOlive }}
                >
                  {category.description}
                </p>
              )}
              <div 
                className="text-sm"
                style={{ color: colors.primary }}
              >
                {category.count} posts
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
} 