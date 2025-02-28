import { fetchPosts, fetchCategories } from '@/lib/wordpress/api';
import { Metadata } from 'next';
import { WP_CONFIG } from '@/lib/wordpress/config';
import SearchBar from '../../components/SearchBar';
import clsx from 'clsx';

export const revalidate = 60; // Revalidate every minute

interface BlogPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    page?: string;
    category?: string;
    search?: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const locale = params.locale;
  const localizedConfig = WP_CONFIG.languages[locale as keyof typeof WP_CONFIG.languages];

  const title = {
    'zh-Hant': '教育資源與學習心得 | Chi Chi Education',
    'vi': 'Tài liệu Giáo dục & Kinh nghiệm Học tập | Chi Chi Education',
    'en': 'Educational Resources & Learning Tips | Chi Chi Education',
  }[locale] || 'Educational Resources & Learning Tips | Chi Chi Education';

  const description = {
    'zh-Hant': '探索專業教師分享的學習方法、教育資源和實用技巧。從基礎課程到進階學習，幫助學生達到學習目標。',
    'vi': 'Khám phá phương pháp học tập, tài liệu giáo dục và các kỹ năng thực tế được chia sẻ bởi giáo viên chuyên nghiệp.',
    'en': 'Explore learning methods, educational resources, and practical tips shared by professional teachers. From basic courses to advanced learning.',
  }[locale] || 'Explore learning methods, educational resources, and practical tips shared by professional teachers.';

  const keywords = {
    'zh-Hant': '教育資源,學習方法,課程規劃,台北補習班,教育心得,教學經驗',
    'vi': 'tài liệu giáo dục,phương pháp học,lập kế hoạch khóa học,lớp học thêm Đài Bắc,kinh nghiệm giáo dục,kinh nghiệm giảng dạy',
    'en': 'education resources,learning methods,course planning,taipei tutoring,education tips,teaching experience',
  }[locale] || 'education resources,learning methods,course planning,taipei tutoring,education tips,teaching experience';

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
  };
}

type TranslationType = {
  [K in 'home' | 'blog' | 'searchPlaceholder' | 'allCategories' | 'noResults' | 'clearFilters' | 'mostPopular' | 'aboutUs' | 'subscribe' | 'readMore']: {
    [locale: string]: string;
  };
} & {
  pageInfo: {
    [locale: string]: (current: number, total: number, showing: number, totalPosts: number) => string;
  };
};

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
};

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const category = searchParams.category;
  const search = searchParams.search;
  const postsPerPage = WP_CONFIG.postsPerPage;
  const isChineseLocale = params.locale === 'zh-Hant' || params.locale === 'zh-Hans';
  const isVietnameseLocale = params.locale === 'vi';

  // Fetch posts and categories
  const [allPosts, categories] = await Promise.all([
    fetchPosts({
      page: currentPage,
      per_page: postsPerPage * 2, // Fetch more posts for popular section
      categories: category ? [category] : undefined,
      search,
    }),
    fetchCategories(),
  ]);

  // Split posts into regular and popular
  const popularPosts = allPosts.filter(post => post.featured).slice(0, 3);
  const regularPosts = allPosts.filter(post => !post.featured);
  const totalPages = Math.ceil(regularPosts.length / postsPerPage);

  const t = (key: keyof typeof translations): string => {
    const translation = translations[key];
    if (typeof translation === 'object' && !('pageInfo' in translation)) {
      return translation[params.locale] || translation['en'];
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <header className="text-center mb-16">
          <h1 className={clsx(
            "text-5xl font-bold text-gray-900 mb-6",
            (isChineseLocale || isVietnameseLocale) && "chinese-font"
          )}>
            {t('blog')}
          </h1>
          <div className="max-w-2xl mx-auto">
            <SearchBar 
              placeholder={t('searchPlaceholder')}
              initialValue={search}
            />
          </div>
        </header>

        {/* Categories */}
        <div className="flex justify-center flex-wrap gap-3 mb-16">
          <a
            href={`/${params.locale}/blog`}
            className={clsx(
              "px-6 py-2 rounded-full border transition-colors",
              !category ? 'bg-[#C4A86D] border-[#C4A86D] text-white' : 'border-gray-200 text-gray-700 hover:bg-gray-50',
              (isChineseLocale || isVietnameseLocale) && "chinese-font"
            )}
          >
            {t('allCategories')}
          </a>
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/${params.locale}/blog?category=${cat.id}`}
              className={clsx(
                "px-6 py-2 rounded-full border transition-colors",
                category === cat.id ? 'bg-[#C4A86D] border-[#C4A86D] text-white' : 'border-gray-200 text-gray-700 hover:bg-gray-50',
                (isChineseLocale || isVietnameseLocale) && "chinese-font"
              )}
            >
              {cat.name}
            </a>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {regularPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className={clsx(
                  "text-gray-500",
                  (isChineseLocale || isVietnameseLocale) && "chinese-font"
                )}>
                  {t('noResults')}
                </p>
                <a 
                  href={`/${params.locale}/blog`}
                  className={clsx(
                    "mt-4 text-[#C4A86D] hover:underline inline-block",
                    (isChineseLocale || isVietnameseLocale) && "chinese-font"
                  )}
                >
                  {t('clearFilters')}
                </a>
              </div>
            ) : (
              <div className="grid gap-8">
                {regularPosts.map((post) => (
                  <article 
                    key={post.id}
                    className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <a href={`/${params.locale}/blog/${post.slug}`} className="grid md:grid-cols-2 gap-6">
                      <div className="relative aspect-[16/9] md:aspect-square overflow-hidden">
                        <img
                          src={post.featured_media}
                          alt={post.title.rendered}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <time className="text-sm text-gray-500" dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString(
                            params.locale === 'zh-Hant' ? 'zh-TW' : 
                            params.locale === 'vi' ? 'vi-VN' : 'en-US'
                          )}
                        </time>
                        <h2 
                          className={clsx(
                            "text-xl font-semibold mt-2 mb-3 text-gray-900 line-clamp-2 group-hover:text-[#C4A86D] transition-colors",
                            (isChineseLocale || isVietnameseLocale) && "chinese-font"
                          )}
                          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />
                        <div 
                          className={clsx(
                            "text-gray-600 text-sm mb-4 line-clamp-3",
                            (isChineseLocale || isVietnameseLocale) && "chinese-font"
                          )}
                          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                        />
                        <span className={clsx(
                          "inline-flex items-center text-[#C4A86D] text-sm group-hover:translate-x-2 transition-transform",
                          (isChineseLocale || isVietnameseLocale) && "chinese-font"
                        )}>
                          {t('readMore')} →
                        </span>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <a
                    key={page}
                    href={`/${params.locale}/blog?page=${page}${category ? `&category=${category}` : ''}${search ? `&search=${search}` : ''}`}
                    className={clsx(
                      "px-4 py-2 rounded-full text-sm transition-colors",
                      currentPage === page
                        ? 'bg-[#C4A86D] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                      (isChineseLocale || isVietnameseLocale) && "chinese-font"
                    )}
                  >
                    {page}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Most Popular */}
            <section className="bg-gray-50 rounded-xl p-6">
              <h2 className={clsx(
                "text-xl font-semibold mb-6 text-gray-900",
                (isChineseLocale || isVietnameseLocale) && "chinese-font"
              )}>
                {t('mostPopular')}
              </h2>
              <div className="space-y-6">
                {popularPosts.map((post, index) => (
                  <a 
                    key={post.id}
                    href={`/${params.locale}/blog/${post.slug}`}
                    className="group flex items-start gap-4"
                  >
                    <span className="text-2xl font-bold text-[#C4A86D]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 
                        className={clsx(
                          "text-base font-medium text-gray-900 group-hover:text-[#C4A86D] transition-colors line-clamp-2",
                          (isChineseLocale || isVietnameseLocale) && "chinese-font"
                        )}
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                      <time className="text-sm text-gray-500 mt-1 block">
                        {new Date(post.date).toLocaleDateString(
                          params.locale === 'zh-Hant' ? 'zh-TW' : 
                          params.locale === 'vi' ? 'vi-VN' : 'en-US'
                        )}
                      </time>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* About Section */}
            <section className="bg-gray-50 rounded-xl p-6">
              <h2 className={clsx(
                "text-xl font-semibold mb-4 text-gray-900",
                (isChineseLocale || isVietnameseLocale) && "chinese-font"
              )}>
                {t('aboutUs')}
              </h2>
              <p className={clsx(
                "text-gray-600 text-sm",
                (isChineseLocale || isVietnameseLocale) && "chinese-font"
              )}>
                {params.locale === 'zh-Hant' 
                  ? '我們致力於提供優質的教育資源和學習經驗，幫助學生實現他們的學習目標。'
                  : params.locale === 'vi'
                  ? 'Chúng tôi cam kết cung cấp tài liệu giáo dục chất lượng và trải nghiệm học tập, giúp học sinh đạt được mục tiêu học tập của họ.'
                  : 'We are dedicated to providing quality educational resources and learning experiences to help students achieve their learning goals.'}
              </p>
            </section>

            {/* Subscribe Section */}
            <section className="bg-[#C4A86D] rounded-xl p-6 text-white">
              <h2 className={clsx(
                "text-xl font-semibold mb-4",
                (isChineseLocale || isVietnameseLocale) && "chinese-font"
              )}>
                {t('subscribe')}
              </h2>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <button
                  type="submit"
                  className={clsx(
                    "w-full px-4 py-2 bg-white text-[#C4A86D] rounded-lg font-medium hover:bg-white/90 transition-colors",
                    (isChineseLocale || isVietnameseLocale) && "chinese-font"
                  )}
                >
                  {t('subscribe')}
                </button>
              </form>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
} 