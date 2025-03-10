'use client'

import { useEffect, useState } from 'react'
import { getPosts, getCategoryBySlug, WPPost, WPCategory } from '@/lib/wordpress-api'
import { CategoryGrid } from '@/components/category/CategoryGrid'
import { colors } from '@/lib/colors'

interface CategoryPageProps {
  params: {
    locale: string
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [posts, setPosts] = useState<WPPost[]>([])
  const [category, setCategory] = useState<WPCategory | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCategoryAndPosts() {
      try {
        setIsLoading(true)
        setError(null)

        // First get the category details
        const categoryData = await getCategoryBySlug(params.slug, params.locale)
        if (!categoryData) {
          throw new Error('Category not found')
        }
        setCategory(categoryData)

        // Then get posts for this category
        const categoryPosts = await getPosts({
          locale: params.locale,
          categories: [categoryData.id],
          perPage: 100 // Increase if you have more posts
        })
        setPosts(categoryPosts)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load content')
        console.error('Error loading category content:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadCategoryAndPosts()
  }, [params.locale, params.slug])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 
        className="mb-8 text-3xl font-bold"
        style={{ color: colors.darkOlive }}
      >
        {category?.name || params.slug.replace(/-/g, ' ')}
      </h1>

      {category?.description && (
        <div 
          className="mb-8 text-lg"
          style={{ color: colors.darkOlive }}
        >
          {category.description}
        </div>
      )}

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

      {!isLoading && !error && posts.length === 0 && (
        <div 
          className="text-center py-12"
          style={{ color: colors.darkOlive }}
        >
          No posts found in this category.
        </div>
      )}

      {!isLoading && !error && posts.length > 0 && (
        <CategoryGrid posts={posts} locale={params.locale} />
      )}
    </div>
  )
} 