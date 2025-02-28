'use client';

import type { WPPost, WPTag } from '@/lib/wordpress/types';
import BlogCard from './BlogCard';
import clsx from 'clsx';

interface BlogContentProps {
  posts: WPPost[];
  featuredPosts?: WPPost[];
  tags?: WPTag[];
  locale: string;
}

export default function BlogContent({ posts, featuredPosts = [], tags, locale }: BlogContentProps) {
  const isChineseLocale = locale === 'zh-Hant' || locale === 'zh-Hans';

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className={clsx(
          "text-gray-500",
          isChineseLocale && "chinese-font"
        )}>
          {locale === 'zh-Hant' 
            ? '找不到相關文章'
            : 'No articles found'
          }
        </p>
        <a 
          href={`/${locale}/blog`}
          className={clsx(
            "mt-4 text-[#C4A86D] hover:underline inline-block",
            isChineseLocale && "chinese-font"
          )}
        >
          {locale === 'zh-Hant' 
            ? '清除搜尋條件'
            : 'Clear search filters'
          }
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <h2 className={clsx(
            "text-3xl font-bold text-gray-900 mb-8",
            isChineseLocale && "chinese-font"
          )}>
            {locale === 'zh-Hant' ? '精選文章' : 'Featured Posts'}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.slice(0, 2).map((post) => (
              <BlogCard key={post.id} post={post} locale={locale} tags={tags} />
            ))}
          </div>
          {featuredPosts.length > 2 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {featuredPosts.slice(2, 5).map((post) => (
                <BlogCard key={post.id} post={post} locale={locale} tags={tags} />
              ))}
            </div>
          )}
        </section>
      )}

      <section>
        <h2 className={clsx(
          "text-3xl font-bold text-gray-900 mb-8",
          isChineseLocale && "chinese-font"
        )}>
          {locale === 'zh-Hant' ? '最新文章' : 'Latest Posts'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} locale={locale} tags={tags} />
          ))}
        </div>
      </section>
    </div>
  );
} 