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
  const [category, setCategory] = useState<WPCategory | null>(null)
  const [posts, setPosts] = useState<WPPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCategoryAndPosts() {
      try {
        setIsLoading(true)
        setError(null)

        console.log('Loading category:', params.slug, 'locale:', params.locale)

        // First get the category info
        const categoryInfo = await getCategoryBySlug(params.slug, params.locale)
        console.log('Category info:', categoryInfo)
        setCategory(categoryInfo)

        if (categoryInfo) {
          // Then get posts for this category
          const categoryPosts = await getPosts({
            categories: [categoryInfo.id],
            perPage: 100, // Adjust as needed
            locale: params.locale
          })
          console.log('Category posts:', categoryPosts)
          setPosts(categoryPosts)
        }
      } catch (err) {
        setError('Failed to load category content')
        console.error('Error loading category and posts:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadCategoryAndPosts()
  }, [params.slug, params.locale])

  return (
    <div className="container mx-auto px-4 py-8">
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

      {!isLoading && !error && category && (
        <>
          <div className="mb-8">
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ color: colors.darkOlive }}
            >
              {category.name}
            </h1>
            {category.description && (
              <p 
                className="text-lg"
                style={{ color: colors.darkOlive }}
              >
                {category.description}
              </p>
            )}
          </div>

          {posts.length === 0 ? (
            <div 
              className="text-center py-12"
              style={{ color: colors.darkOlive }}
            >
              No posts found in this category.
            </div>
          ) : (
            <CategoryGrid posts={posts} locale={params.locale} />
          )}
        </>
      )}
    </div>
  )
} 
        </>
      )}
    </div>
  )
} 
        </>
      )}
    </div>
  )
} 