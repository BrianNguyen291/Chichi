'use client'

import { useEffect, useState } from 'react'
import { getPosts, WPPost } from '@/lib/wordpress-api'
import { CategoryGrid } from '@/components/category/CategoryGrid'
import { colors } from '@/lib/colors'
import { Metadata } from 'next'
import { WP_CONFIG } from '@/lib/wordpress/config'
import SearchBar from '../../components/SearchBar'
import clsx from 'clsx'

export const revalidate = 60 // Revalidate every minute

interface BlogPageProps {
  params: {
    locale: string
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const locale = params.locale
  const localizedConfig = WP_CONFIG.languages[locale as keyof typeof WP_CONFIG.languages]

  const title = {
    'zh-Hant': '教育資源與學習心得 | Chi Chi Education',
    'vi': 'Tài liệu Giáo dục & Kinh nghiệm Học tập | Chi Chi Education',
    'en': 'Educational Resources & Learning Tips | Chi Chi Education',
  }[locale] || 'Educational Resources & Learning Tips | Chi Chi Education'

  const description = {
    'zh-Hant': '探索專業教師分享的學習方法、教育資源和實用技巧。從基礎課程到進階學習，幫助學生達到學習目標。',
    'vi': 'Khám phá phương pháp học tập, tài liệu giáo dục và các kỹ năng thực tế được chia sẻ bởi giáo viên chuyên nghiệp.',
    'en': 'Explore learning methods, educational resources, and practical tips shared by professional teachers. From basic courses to advanced learning.',
  }[locale] || 'Explore learning methods, educational resources, and practical tips shared by professional teachers.'

  const keywords = {
    'zh-Hant': '教育資源,學習方法,課程規劃,台北補習班,教育心得,教學經驗',
    'vi': 'tài liệu giáo dục,phương pháp học,lập kế hoạch khóa học,lớp học thêm Đài Bắc,kinh nghiệm giáo dục,kinh nghiệm giảng dạy',
    'en': 'education resources,learning methods,course planning,taipei tutoring,education tips,teaching experience',
  }[locale] || 'education resources,learning methods,course planning,taipei tutoring,education tips,teaching experience'

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: localizedConfig.locale,
      url: `${WP_CONFIG.siteUrl}/${locale}/blog`,
    },
    alternates: {
      canonical: `${WP_CONFIG.siteUrl}/${locale}/blog`,
    },
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

export default function BlogPage({ params }: BlogPageProps) {
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
        Blog
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
            Load More Posts
          </button>
        </div>
      )}

      {!isLoading && posts.length === 0 && !error && (
        <div 
          className="text-center py-12"
          style={{ color: colors.darkOlive }}
        >
          No posts found.
        </div>
      )}
    </div>
  )
} 