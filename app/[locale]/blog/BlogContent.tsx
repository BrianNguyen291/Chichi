'use client'

import { useEffect, useState } from 'react'
import { getPosts, WPPost } from '@/lib/wordpress-api'
import { CategoryGrid } from '@/components/category/CategoryGrid'
import { colors } from '@/lib/colors'
import SearchBar from '../../components/SearchBar'
import clsx from 'clsx'

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
  const postsPerPage = 12

  useEffect(() => {
    loadPosts()
  }, [params.locale])

  async function loadPosts(loadMore = false) {
    try {
      setIsLoading(true)
      setError(null)

      const newPage = loadMore ? page + 1 : 1
      console.log('Loading posts for locale:', params.locale, 'page:', newPage)

      const newPosts = await getPosts({
        locale: params.locale,
        page: newPage,
        perPage: postsPerPage
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
      <h1 
        className="text-4xl font-bold mb-8 text-center"
        style={{ color: colors.darkOlive }}
      >
        {translations.blog[params.locale] || translations.blog.en}
      </h1>

      {error && (
        <div 
          className="rounded-md bg-red-50 p-4 text-center mb-8"
          style={{ color: colors.darkOlive }}
        >
          {error}
        </div>
      )}

      {posts.length > 0 && (
        <CategoryGrid posts={posts} locale={params.locale} />
      )}

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}

      {!isLoading && hasMore && posts.length > 0 && (
        <div className="text-center mt-8">
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