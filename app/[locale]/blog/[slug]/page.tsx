import { fetchPost, fetchPosts } from '@/lib/wordpress/api';
import { formatDate } from '@/lib/wordpress/utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import clsx from 'clsx';

export const revalidate = 60; // Revalidate every minute

interface BlogPostPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await fetchPost(params.slug);
  
  if (!post) {
    return {
      title: params.locale === 'zh-Hant' ? '找不到文章' : 'Post Not Found',
    };
  }

  return {
    title: `${post.title.rendered} | Chi Chi Education`,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, ''),
    openGraph: {
      title: `${post.title.rendered} | Chi Chi Education`,
      description: post.excerpt.rendered.replace(/<[^>]*>/g, ''),
      images: post.featured_media ? [{ url: post.featured_media }] : [],
      type: 'article',
      locale: params.locale === 'zh-Hant' ? 'zh_TW' : 'en_US',
    },
  };
}

// Generate static params for static generation
export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await fetchPost(params.slug);
  const isChineseLocale = params.locale === 'zh-Hant' || params.locale === 'zh-Hans';

  if (!post) {
    notFound();
  }

  // Function to handle social media sharing
  const ShareButton = ({ platform, url, title }: { platform: string; url: string; title: string }) => {
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      line: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`,
    };

    const platformIcons = {
      facebook: (
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z"/>
        </svg>
      ),
      twitter: (
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      line: (
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
        </svg>
      ),
    };

    return (
      <a
        href={shareUrls[platform as keyof typeof shareUrls]}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          "inline-flex items-center px-4 py-2 rounded-full text-white transition-all hover:opacity-90 hover:scale-105",
          isChineseLocale && "chinese-font",
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
  };

  return (
    <div className="bg-[#FDF8F7]">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb Navigation */}
        <nav className="mb-12 flex items-center space-x-2 text-sm">
          <a 
            href={`/${params.locale}`} 
            className={clsx(
              "text-gray-500 hover:text-[#C4A86D] transition-colors",
              isChineseLocale && "chinese-font"
            )}
          >
            {params.locale === 'zh-Hant' ? '首頁' : 'Home'}
          </a>
          <span className="text-gray-400">/</span>
          <a 
            href={`/${params.locale}/blog`} 
            className={clsx(
              "text-gray-500 hover:text-[#C4A86D] transition-colors",
              isChineseLocale && "chinese-font"
            )}
          >
            {params.locale === 'zh-Hant' ? '部落格' : 'Blog'}
          </a>
          <span className="text-gray-400">/</span>
          <span 
            className={clsx(
              "text-[#C4A86D]",
              isChineseLocale && "chinese-font"
            )}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
          />
        </nav>

        <article className="max-w-3xl mx-auto">
          {/* Article Header */}
          <header className="text-center mb-16">
            {post.featured_media && (
              <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={post.featured_media}
                  alt={post.title.rendered}
                  className="w-full h-auto"
                />
              </div>
            )}
            <div className="mb-4">
              <time
                className={clsx(
                  "text-sm text-gray-500 bg-[#FCF2EF] px-4 py-1 rounded-full",
                  isChineseLocale && "chinese-font"
                )}
                dateTime={post.date}
              >
                {formatDate(post.date, params.locale)}
              </time>
            </div>
            <h1
              className={clsx(
                "text-3xl md:text-4xl font-normal mb-6 text-gray-800",
                isChineseLocale && "chinese-font"
              )}
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#FCF2EF] flex items-center justify-center mr-2">
                  <span className="text-[#C4A86D]">CC</span>
                </div>
                <span className={clsx(isChineseLocale && "chinese-font")}>Chi Chi Education</span>
              </div>
              <span className="text-gray-400">•</span>
              <span className={clsx(isChineseLocale && "chinese-font")}>
                {params.locale === 'zh-Hant' ? '閱讀時間' : 'Reading time'}{' '}
                {Math.ceil(post.content.rendered.length / 500)}{' '}
                {params.locale === 'zh-Hant' ? '分鐘' : 'min'}
              </span>
            </div>
            <div className="w-24 h-[1px] bg-[#C4A86D] mx-auto mt-8"></div>
          </header>

          {/* Article Content */}
          <div 
            className={clsx(
              "prose prose-lg max-w-none mb-12",
              isChineseLocale && "chinese-font prose-headings:chinese-font"
            )}
          >
            <div
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              className="text-gray-700 leading-relaxed"
            />
          </div>

          {/* Share Buttons */}
          <div className="border-t border-gray-200 pt-8 mb-12">
            <h3 className={clsx(
              "text-lg mb-4",
              isChineseLocale && "chinese-font"
            )}>
              {params.locale === 'zh-Hant' ? '分享此文：' : 'Share this article:'}
            </h3>
            <div className="flex flex-wrap gap-4">
              <ShareButton
                platform="facebook"
                url={`${process.env.NEXT_PUBLIC_SITE_URL}/${params.locale}/blog/${post.slug}`}
                title={post.title.rendered}
              />
              <ShareButton
                platform="twitter"
                url={`${process.env.NEXT_PUBLIC_SITE_URL}/${params.locale}/blog/${post.slug}`}
                title={post.title.rendered}
              />
              <ShareButton
                platform="line"
                url={`${process.env.NEXT_PUBLIC_SITE_URL}/${params.locale}/blog/${post.slug}`}
                title={post.title.rendered}
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
} 