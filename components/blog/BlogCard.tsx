import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { vi, enUS, zhTW, zhCN } from 'date-fns/locale';
import type { Post } from '@/lib/ghost';
import { useTranslations } from '@/lib/i18n';

interface BlogCardProps {
  post: Post;
  locale: string;
}

const dateLocales = {
  vi: vi,
  en: enUS,
  'zh-Hant': zhTW,
  'zh-Hans': zhCN,
};

export default function BlogCard({ post, locale }: BlogCardProps) {
  const dateLocale = dateLocales[locale as keyof typeof dateLocales] || enUS;
  const { translate } = useTranslations(locale as any);

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {post.feature_image && (
        <div className="relative h-48 w-full">
          <Image
            src={post.feature_image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {post.tags?.map((tag) => (
            <Link
              key={tag.id}
              href={`/${locale}/blog/tags/${tag.slug}`}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {tag.name}
            </Link>
          ))}
        </div>
        <Link href={`/${locale}/blog/${post.slug}`}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {post.authors?.[0] && (
              <>
                {post.authors[0].profile_image && (
                  <Image
                    src={post.authors[0].profile_image}
                    alt={post.authors[0].name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {post.authors[0].name}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatDistanceToNow(new Date(post.published_at), {
                addSuffix: true,
                locale: dateLocale,
              })}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {post.reading_time} {translate('min_read', 'blog')}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
} 