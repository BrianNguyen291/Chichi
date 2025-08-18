'use client'

import { useEffect, useMemo, useState } from 'react'
import { getPosts, WPPost, getCategories, TranslatedCategory, getTags } from '@/lib/wordpress-api'
import { CategoryGrid } from '@/components/category/CategoryGrid'
import { colors } from '@/lib/colors'
import { useDebounce } from '@/hooks/useDebounce'
import { Skeleton } from '@/components/ui/skeleton'
import ConsultationForm from '@/components/consultation-form'

interface BlogContentProps {
  params: {
    locale: string
  }
}

type TranslationType = {
  [K in 'home' | 'blog' | 'searchPlaceholder' | 'allCategories' | 'noResults' | 'clearFilters' | 'mostPopular' | 'aboutUs' | 'subscribe' | 'readMore']: {
    [locale: string]: string
  }
} & {
  pageInfo: {
    [locale: string]: (current: number, total: number, showing: number, totalPosts: number) => string
  }
}

const translations: TranslationType = {
  home: {
    'zh-Hant': '首頁',
    'vi': 'Trang chủ',
    'en': 'Home',
  },
  blog: {
    'zh-Hant': '部落格',
    'vi': 'Blog',
    'en': 'Blog Stories',
  },
  searchPlaceholder: {
    'zh-Hant': '搜尋文章...',
    'vi': 'Tìm kiếm bài viết...',
    'en': 'Search articles...',
  },
  allCategories: {
    'zh-Hant': '全部分類',
    'vi': 'Tất cả danh mục',
    'en': 'All Categories',
  },
  noResults: {
    'zh-Hant': '找不到相關文章',
    'vi': 'Không tìm thấy bài viết',
    'en': 'No articles found',
  },
  clearFilters: {
    'zh-Hant': '清除搜尋條件',
    'vi': 'Xóa bộ lọc',
    'en': 'Clear search filters',
  },
  mostPopular: {
    'zh-Hant': '熱門文章',
    'vi': 'Bài viết phổ biến',
    'en': 'Most Popular',
  },
  aboutUs: {
    'zh-Hant': '關於我們',
    'vi': 'Về chúng tôi',
    'en': 'About Chi Chi Education',
  },
  subscribe: {
    'zh-Hant': '訂閱最新消息',
    'vi': 'Đăng ký nhận tin',
    'en': 'Subscribe',
  },
  readMore: {
    'zh-Hant': '閱讀更多',
    'vi': 'Đọc thêm',
    'en': 'Read more',
  },
  pageInfo: {
    'zh-Hant': (current, total, showing, totalPosts) =>
      `第 ${current} 頁，共 ${total} 頁（顯示第 ${showing} 篇，共 ${totalPosts} 篇文章）`,
    'vi': (current, total, showing, totalPosts) =>
      `Trang ${current}/${total} (Hiển thị ${showing} trong số ${totalPosts} bài viết)`,
    'en': (current, total, showing, totalPosts) =>
      `Page ${current} of ${total} (Showing ${showing} of ${totalPosts} articles)`,
  },
}

export default function BlogContent({ params }: BlogContentProps) {
  const [posts, setPosts] = useState<WPPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [categories, setCategories] = useState<TranslatedCategory[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  const [selectedTagName, setSelectedTagName] = useState<string | null>(null)
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const postsPerPage = 12

  // Debounce applying the search to avoid excessive requests
  const applySearchDebounced = useDebounce((value: string) => {
    setSearchQuery(value)
  }, 400)

  // Load categories when locale changes
  useEffect(() => {
    let isMounted = true
      ; (async () => {
        try {
          const data = await getCategories(params.locale)
          if (!isMounted) return
          setCategories(data)
        } catch (err) {
          // Non-blocking for categories
          console.error('Failed to load categories', err)
        }
      })()
    return () => {
      isMounted = false
    }
  }, [params.locale])

  // If query has ?tag=... or ?category=..., support filtering when landing from hashtag
  useEffect(() => {
    let mounted = true
      ; (async () => {
        if (typeof window !== 'undefined') {
          const url = new URL(window.location.href)
          const tagQ = url.searchParams.get('tag')
          const catQ = url.searchParams.get('category')
          if (catQ) {
            const asNumber = Number(catQ)
            if (!Number.isNaN(asNumber)) setSelectedCategoryId(asNumber)
          }
          if (tagQ) {
            setSelectedTagName(tagQ)
            // Resolve tag name to ID for API filtering
            try {
              const allTags = await getTags({ locale: params.locale, perPage: 100 })
              if (!mounted) return
              const match = allTags.find(t => t.name.toLowerCase() === tagQ.toLowerCase())
              if (match) setSelectedTagId(match.id)
            } catch (e) {
              // ignore tag resolution errors
            }
          }
        }
      })()
    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Reload posts when locale, selected category, or search changes
  useEffect(() => {
    // Reset to first page when filters change
    setPage(1)
    setHasMore(true)
    loadPosts(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.locale, selectedCategoryId, selectedTagId, searchQuery])

  async function loadPosts(loadMore = false) {
    try {
      setIsLoading(true)
      setError(null)

      const newPage = loadMore ? page + 1 : 1
      console.log('Loading posts for locale:', params.locale, 'page:', newPage)

      const newPosts = await getPosts({
        locale: params.locale,
        page: newPage,
        perPage: postsPerPage,
        categories: selectedCategoryId ? [selectedCategoryId] : undefined,
        tags: selectedTagId ? [selectedTagId] : undefined,
        search: searchQuery || undefined,
      })

      if (newPosts.length < postsPerPage) {
        setHasMore(false)
      }

      setPosts(prev => loadMore ? [...prev, ...newPosts] : newPosts)
      setPage(newPage)
    } catch (err) {
      setError('Failed to load posts')
      console.error('Error loading posts:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <div className="mb-8 rounded-xl bg-gradient-to-br from-gray-50 to-white p-6 md:p-10 border border-gray-100">
        <h1
          className="text-4xl font-bold text-center"
          style={{ color: colors.darkOlive }}
        >
          {translations.blog[params.locale] || translations.blog.en}
        </h1>
        <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
          Khám phá câu chuyện, mẹo học tập và tin tức mới nhất từ Chi Chi Education.
        </p>

        {/* Search + Filters */}
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex items-center gap-3 max-w-xl mx-auto w-full">
            <input
              value={searchInput}
              onChange={(e) => {
                const value = e.target.value
                setSearchInput(value)
                applySearchDebounced(value)
              }}
              placeholder={translations.searchPlaceholder[params.locale] || translations.searchPlaceholder.en}
              className="w-full rounded-md border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b17f4a]/30"
            />
            {(searchQuery || selectedCategoryId !== null || selectedTagId !== null) && (
              <button
                onClick={() => {
                  setSearchInput('')
                  setSearchQuery('')
                  setSelectedCategoryId(null)
                  setSelectedTagName(null)
                  setSelectedTagId(null)
                }}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                {translations.clearFilters[params.locale] || translations.clearFilters.en}
              </button>
            )}
          </div>

          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedCategoryId(null)}
                className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${selectedCategoryId === null ? 'bg-[#b17f4a] text-white border-[#b17f4a]' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'}`}
              >
                {translations.allCategories[params.locale] || translations.allCategories.en}
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${selectedCategoryId === cat.id ? 'bg-[#b17f4a] text-white border-[#b17f4a]' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'}`}
                  title={cat.name}
                >
                  {cat.translatedName || cat.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div
          className="rounded-md bg-red-50 p-4 text-center mb-8"
          style={{ color: colors.darkOlive }}
        >
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {isLoading && posts.length === 0 && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="overflow-hidden rounded-lg border border-gray-100 bg-white">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-8 w-28" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {posts.length > 0 && (
            <CategoryGrid posts={posts} locale={params.locale} />
          )}

          {!isLoading && hasMore && posts.length > 0 && (
            <div className="text-center mt-2">
              <button
                onClick={() => loadPosts(true)}
                className="inline-block rounded-md px-6 py-3 text-sm font-medium transition-colors hover:opacity-90"
                style={{
                  backgroundColor: colors.secondary,
                  color: colors.lightCream
                }}
              >
                {translations.readMore[params.locale] || translations.readMore.en}
              </button>
            </div>
          )}
        </div>

        <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-6">
          <ConsultationForm locale={params.locale} />
        </aside>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-8" aria-busy>
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}



      {!isLoading && posts.length === 0 && !error && (
        <div
          className="text-center py-12"
          style={{ color: colors.darkOlive }}
        >
          {translations.noResults[params.locale] || translations.noResults.en}
        </div>
      )}
    </div>
  )
} 