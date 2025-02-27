'use client';

import { useTranslations } from '@/lib/i18n';
import type { Post } from '@/lib/ghost';
import type { Locale } from '@/lib/i18n';
import BlogCard from './BlogCard';

interface BlogContentProps {
  posts: Post[];
  featuredPosts: Post[];
  locale: Locale;
}

export default function BlogContent({ posts, featuredPosts, locale }: BlogContentProps) {
  const { translate } = useTranslations(locale);

  if (!posts || posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">{translate('no_posts', 'blog')}</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">{translate('featured', 'blog')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} locale={locale} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-3xl font-bold mb-8">{translate('latest', 'blog')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
} 