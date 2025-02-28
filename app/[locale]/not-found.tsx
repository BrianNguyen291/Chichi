import Link from 'next/link'
import { useTranslations } from '@/lib/i18n'

interface NotFoundProps {
  params?: {
    locale?: string;
  };
}

const translations = {
  vi: {
    title: '404',
    heading: 'Không Tìm Thấy Trang',
    description: 'Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.',
    button: 'Về Trang Chủ'
  },
  en: {
    title: '404',
    heading: 'Page Not Found',
    description: 'The page you are looking for does not exist or has been moved.',
    button: 'Go Home'
  },
  'zh-Hant': {
    title: '404',
    heading: '找不到頁面',
    description: '您要查找的頁面不存在或已被移動。',
    button: '返回首頁'
  },
  'zh-Hans': {
    title: '404',
    heading: '找不到页面',
    description: '您要查找的页面不存在或已被移动。',
    button: '返回首页'
  }
}

export default function NotFound({ params }: NotFoundProps) {
  // Default to 'en' if locale is not provided
  const locale = params?.locale || 'en'
  const t = translations[locale as keyof typeof translations] || translations.en

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">{t.title}</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          {t.heading}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {t.description}
        </p>
        <Link
          href={`/${locale}`}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t.button}
        </Link>
      </div>
    </div>
  )
} 