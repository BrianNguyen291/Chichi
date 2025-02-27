import Image from 'next/image';
import { format } from 'date-fns';
import { vi, enUS, zhTW, zhCN } from 'date-fns/locale';
import { getPost, getRelatedPosts } from '@/lib/ghost';
import type { Post, Tag } from '@/lib/ghost';
import BlogCard from '@/components/blog/BlogCard';
import { useTranslations } from '@/lib/i18n';

interface PostPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

const dateLocales = {
  vi: vi,
  en: enUS,
  'zh-Hant': zhTW,
  'zh-Hans': zhCN,
};

export default async function PostPage({ params: { locale, slug } }: PostPageProps) {
  const post = await getPost(slug, locale);
  
  if (!post) {
    return <div>Post not found</div>;
  }

  const relatedPosts = await getRelatedPosts(post.id, locale);
  const dateLocale = dateLocales[locale as keyof typeof dateLocales] || enUS;
  const { translate } = useTranslations(locale as any);

  return (
    <article className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          {post.tags?.map((tag: Tag) => (
            <span
              key={tag.id}
              className="text-sm text-blue-600 dark:text-blue-400"
            >
              {tag.name}
            </span>
          ))}
        </div>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
          {post.authors?.[0] && (
            <div className="flex items-center gap-2">
              {post.authors[0].profile_image && (
                <Image
                  src={post.authors[0].profile_image}
                  alt={post.authors[0].name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <span>{post.authors[0].name}</span>
            </div>
          )}
          <span>
            {format(new Date(post.published_at), 'PPP', { locale: dateLocale })}
          </span>
          <span>{post.reading_time} {translate('min_read', 'blog')}</span>
        </div>
      </header>

      {/* Feature Image */}
      {post.feature_image && (
        <div className="relative h-96 w-full mb-8">
          <Image
            src={post.feature_image}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      {/* Content */}
      <div
        className="prose dark:prose-invert max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">{translate('related_posts', 'blog')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost: Post) => (
              <BlogCard
                key={relatedPost.id}
                post={relatedPost}
                locale={locale}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
} 