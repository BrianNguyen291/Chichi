import { Metadata } from 'next'
import { WP_CONFIG } from '@/lib/wordpress/config'
import BlogContent from './BlogContent'

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

export default function BlogPage({ params }: BlogPageProps) {
  return <BlogContent params={params} />
} 