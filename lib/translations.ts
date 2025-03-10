export const translations = {
  blog: {
    'en': 'Blog',
    'vi': 'Blog',
    'zh-Hant': '部落格',
    'zh-Hans': '博客'
  },
  home: {
    'en': 'Home',
    'vi': 'Trang chủ',
    'zh-Hant': '首頁',
    'zh-Hans': '首页'
  },
  about: {
    'en': 'About Us',
    'vi': 'Về chúng tôi',
    'zh-Hant': '關於我們',
    'zh-Hans': '关于我们'
  },
  contact: {
    'en': 'Contact',
    'vi': 'Liên hệ',
    'zh-Hant': '聯絡我們',
    'zh-Hans': '联系我们'
  },
  menu: {
    'en': 'Menu',
    'vi': 'Menu',
    'zh-Hant': '選單',
    'zh-Hans': '菜单'
  },
  courses: {
    'en': 'Courses',
    'vi': 'Khóa học',
    'zh-Hant': '課程',
    'zh-Hans': '课程'
  },
  beginner: {
    'en': 'Beginner',
    'vi': 'Sơ cấp',
    'zh-Hant': '初級',
    'zh-Hans': '初级'
  },
  intermediate: {
    'en': 'Intermediate',
    'vi': 'Trung cấp',
    'zh-Hant': '中級',
    'zh-Hans': '中级'
  },
  advanced: {
    'en': 'Advanced',
    'vi': 'Cao cấp',
    'zh-Hant': '高級',
    'zh-Hans': '高级'
  },
  readMore: {
    'en': 'Read More',
    'vi': 'Đọc thêm',
    'zh-Hant': '閱讀更多',
    'zh-Hans': '阅读更多'
  },
  loadMore: {
    'en': 'Load More Posts',
    'vi': 'Tải thêm bài viết',
    'zh-Hant': '載入更多文章',
    'zh-Hans': '加载更多文章'
  },
  noPosts: {
    'en': 'No posts found.',
    'vi': 'Không tìm thấy bài viết nào.',
    'zh-Hant': '找不到任何文章。',
    'zh-Hans': '没有找到任何文章。'
  },
  errorLoading: {
    'en': 'Failed to load posts',
    'vi': 'Không thể tải bài viết',
    'zh-Hant': '載入文章失敗',
    'zh-Hans': '加载文章失败'
  }
}

export function getTranslation(key: keyof typeof translations, locale: string = 'en'): string {
  const translation = translations[key]
  return translation[locale as keyof typeof translation] || translation['en']
} 