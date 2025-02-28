import { fetchPost, fetchPosts } from '@/lib/wordpress/api';
import { formatDate } from '@/lib/wordpress/utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';

export const revalidate = 60; // Revalidate every minute

interface BlogPostPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

// Translations
const translations = {
  home: {
    'zh-Hant': '首頁',
    'vi': 'Trang chủ',
    'en': 'Home',
  },
  blog: {
    'zh-Hant': '部落格',
    'vi': 'Blog',
    'en': 'Inside Design',
  },
  readingTime: {
    'zh-Hant': '閱讀時間',
    'vi': 'Thời gian đọc',
    'en': 'Reading time',
  },
  minutes: {
    'zh-Hant': '分鐘',
    'vi': 'phút',
    'en': 'min read',
  },
  shareTitle: {
    'zh-Hant': '分享此文',
    'vi': 'Chia sẻ',
    'en': 'Share this article',
  },
  relatedPosts: {
    'zh-Hant': '相關文章',
    'vi': 'Bài viết liên quan',
    'en': 'Related articles',
  },
  subscribe: {
    'zh-Hant': '訂閱最新消息',
    'vi': 'Đăng ký nhận tin',
    'en': 'Subscribe to our newsletter',
  },
  subscribeDesc: {
    'zh-Hant': '訂閱以獲取最新的教育資源、學習方法和教學心得。',
    'vi': 'Đăng ký để nhận các tài liệu giáo dục, phương pháp học tập và kinh nghiệm giảng dạy mới nhất.',
    'en': 'Subscribe to learn about new educational resources, learning methods, and teaching insights.',
  },
};

const t = (key: keyof typeof translations, locale: string): string => {
  return translations[key][locale as keyof typeof translations[typeof key]] || translations[key]['en'];
};

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  // Decode the URL-encoded slug
  const decodedSlug = decodeURIComponent(params.slug);
  const post = await fetchPost(decodedSlug);
  
  if (!post) {
    return {
      title: t('blog', params.locale),
    };
  }

  const title = `${post.title.rendered} | Chi Chi Education`;
  const description = post.excerpt.rendered.replace(/<[^>]*>/g, '');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: post.featured_media ? [{ url: post.featured_media }] : [],
      type: 'article',
      locale: params.locale === 'zh-Hant' ? 'zh_TW' : params.locale === 'vi' ? 'vi_VN' : 'en_US',
    },
  };
}

// Generate static params for static generation
export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts.map((post) => ({
    slug: encodeURIComponent(post.slug),
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Decode the URL-encoded slug
  const decodedSlug = decodeURIComponent(params.slug);
  const post = await fetchPost(decodedSlug);
  const isChineseLocale = params.locale === 'zh-Hant' || params.locale === 'zh-Hans';
  const isVietnameseLocale = params.locale === 'vi';

  if (!post) {
    notFound();
  }

  // Fetch related posts (you'll need to implement this based on your needs)
  const relatedPosts = await fetchPosts({ per_page: 3 });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm mb-8">
            <Link 
              href={`/${params.locale}`}
              className={clsx(
                "text-gray-500 hover:text-[#C4A86D] transition-colors",
                (isChineseLocale || isVietnameseLocale) && "chinese-font"
              )}
            >
              {t('home', params.locale)}
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href={`/${params.locale}/blog`}
              className={clsx(
                "text-gray-500 hover:text-[#C4A86D] transition-colors",
                (isChineseLocale || isVietnameseLocale) && "chinese-font"
              )}
            >
              {t('blog', params.locale)}
            </Link>
          </nav>

          {/* Article Header */}
          <header className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <time 
                className={clsx(
                  "text-sm text-gray-500",
                  (isChineseLocale || isVietnameseLocale) && "chinese-font"
                )}
                dateTime={post.date}
              >
                {formatDate(post.date, params.locale)}
              </time>
              <span className="text-gray-300">•</span>
              <span className={clsx(
                "text-sm text-gray-500",
                (isChineseLocale || isVietnameseLocale) && "chinese-font"
              )}>
                {t('readingTime', params.locale)}: {Math.ceil(post.content.rendered.length / 1000)} {t('minutes', params.locale)}
              </span>
            </div>

            <h1 
              className={clsx(
                "text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight",
                (isChineseLocale || isVietnameseLocale) && "chinese-font"
              )}
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            {/* Tags */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
                {post.categories.map((category) => (
                  <Link
                    key={category}
                    href={`/${params.locale}/blog?category=${category}`}
                    className={clsx(
                      "px-3 py-1 text-sm rounded-full border border-[#C4A86D] text-[#C4A86D] hover:bg-[#C4A86D] hover:text-white transition-colors",
                      (isChineseLocale || isVietnameseLocale) && "chinese-font"
                    )}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </header>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Featured Image */}
        {post.featured_media && (
          <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={post.featured_media}
              alt={post.title.rendered}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Article Content */}
        <article className={clsx(
          "prose prose-lg max-w-none",
          (isChineseLocale || isVietnameseLocale) && "chinese-font",
          "prose-headings:text-gray-900 prose-headings:font-bold",
          "prose-p:text-gray-700 prose-p:leading-relaxed",
          "prose-a:text-[#C4A86D] prose-a:no-underline hover:prose-a:underline",
          "prose-strong:text-gray-900 prose-strong:font-semibold",
          "prose-ul:list-disc prose-ol:list-decimal",
          "prose-blockquote:border-l-4 prose-blockquote:border-[#C4A86D] prose-blockquote:pl-4 prose-blockquote:italic"
        )}>
          <div
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </article>

        {/* Share Section */}
        <div className="border-t border-gray-100 mt-12 pt-8">
          <h3 className={clsx(
            "text-lg font-semibold text-gray-900 mb-4",
            (isChineseLocale || isVietnameseLocale) && "chinese-font"
          )}>
            {t('shareTitle', params.locale)}
          </h3>
          <div className="flex flex-wrap gap-3">
            <ShareButton platform="facebook" url={`${process.env.NEXT_PUBLIC_SITE_URL}/${params.locale}/blog/${post.slug}`} title={post.title.rendered} />
            <ShareButton platform="twitter" url={`${process.env.NEXT_PUBLIC_SITE_URL}/${params.locale}/blog/${post.slug}`} title={post.title.rendered} />
            <ShareButton platform="line" url={`${process.env.NEXT_PUBLIC_SITE_URL}/${params.locale}/blog/${post.slug}`} title={post.title.rendered} />
          </div>
        </div>

        {/* Related Posts */}
        <div className="border-t border-gray-100 mt-12 pt-12">
          <h2 className={clsx(
            "text-2xl font-bold text-gray-900 mb-8",
            (isChineseLocale || isVietnameseLocale) && "chinese-font"
          )}>
            {t('relatedPosts', params.locale)}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/${params.locale}/blog/${relatedPost.slug}`}
                className="group"
              >
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
                  <img
                    src={relatedPost.featured_media}
                    alt={relatedPost.title.rendered}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 
                  className={clsx(
                    "text-lg font-semibold text-gray-900 group-hover:text-[#C4A86D] transition-colors line-clamp-2",
                    (isChineseLocale || isVietnameseLocale) && "chinese-font"
                  )}
                  dangerouslySetInnerHTML={{ __html: relatedPost.title.rendered }}
                />
                <time className="text-sm text-gray-500 mt-2 block">
                  {formatDate(relatedPost.date, params.locale)}
                </time>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-br from-[#C4A86D] to-[#D4B87D] rounded-2xl mt-16 p-8 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className={clsx(
              "text-2xl font-bold mb-4",
              (isChineseLocale || isVietnameseLocale) && "chinese-font"
            )}>
              {t('subscribe', params.locale)}
            </h2>
            <p className={clsx(
              "text-white/90 mb-6",
              (isChineseLocale || isVietnameseLocale) && "chinese-font"
            )}>
              {t('subscribeDesc', params.locale)}
            </p>
            <form className="flex gap-4">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button
                type="submit"
                className={clsx(
                  "px-6 py-2 bg-white text-[#C4A86D] rounded-lg font-medium hover:bg-white/90 transition-colors",
                  (isChineseLocale || isVietnameseLocale) && "chinese-font"
                )}
              >
                {t('subscribe', params.locale)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Share Button Component
function ShareButton({ platform, url, title }: { platform: string; url: string; title: string }) {
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    line: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`,
  };

  const platformIcons = {
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z"/>
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    ),
    line: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.365 9.863c.349 0 .63.285.631.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
      </svg>
    ),
  };

  return (
    <a
      href={shareUrls[platform as keyof typeof shareUrls]}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "inline-flex items-center space-x-2 px-4 py-2 rounded-full text-white transition-all hover:opacity-90",
        {
          'bg-[#1877F2]': platform === 'facebook',
          'bg-[#1DA1F2]': platform === 'twitter',
          'bg-[#00B900]': platform === 'line',
        }
      )}
    >
      {platformIcons[platform as keyof typeof platformIcons]}
      <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
    </a>
  );
} 