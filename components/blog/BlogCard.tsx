'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { vi, enUS, zhTW, zhCN } from 'date-fns/locale';
import type { WPPost, WPTag } from '@/lib/wordpress/types';
import clsx from 'clsx';

interface BlogCardProps {
  post: WPPost;
  locale: string;
  tags?: WPTag[];
}

const dateLocales = {
  vi: vi,
  en: enUS,
  'zh-Hant': zhTW,
  'zh-Hans': zhCN,
};

export default function BlogCard({ post, locale, tags }: BlogCardProps) {
  const dateLocale = dateLocales[locale as keyof typeof dateLocales] || enUS;
  const isChineseLocale = locale === 'zh-Hant' || locale === 'zh-Hans';

  return (
    <article className="group bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/${locale}/blog/${post.slug}`}>
        <div className="relative aspect-[16/9] overflow-hidden">
          {post.featured_media && (
            <img
              src={post.featured_media}
              alt={post.title.rendered}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          {post.featured && (
            <div className={clsx(
              "absolute top-4 right-4 bg-[#C4A86D] text-white px-3 py-1 rounded-full text-sm font-medium",
              isChineseLocale && "chinese-font"
            )}>
              {locale === 'zh-Hant' ? '精選文章' : 'Featured'}
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
              <span className="text-[#C4A86D] text-sm">CC</span>
            </div>
            <div>
              <p className={clsx(
                "text-sm text-gray-900",
                isChineseLocale && "chinese-font"
              )}>
                Chi Chi Education
              </p>
              <time 
                className={clsx(
                  "text-sm text-gray-500",
                  isChineseLocale && "chinese-font"
                )} 
                dateTime={post.date}
              >
                {formatDistanceToNow(new Date(post.date), {
                  addSuffix: true,
                  locale: dateLocale,
                })}
              </time>
            </div>
          </div>
          <h2 
            className={clsx(
              "text-xl font-semibold mb-3 text-gray-900 line-clamp-2 group-hover:text-[#C4A86D] transition-colors",
              isChineseLocale && "chinese-font"
            )}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div 
            className={clsx(
              "text-gray-600 text-sm mb-4 line-clamp-3",
              isChineseLocale && "chinese-font"
            )}
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />
          <span className={clsx(
            "inline-flex items-center text-[#C4A86D] text-sm group-hover:translate-x-2 transition-transform",
            isChineseLocale && "chinese-font"
          )}>
            {locale === 'zh-Hant' ? '閱讀更多 →' : 'Read more →'}
          </span>
        </div>
      </Link>
    </article>
  );
} 