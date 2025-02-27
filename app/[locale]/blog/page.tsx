import { getPosts, getFeaturedPosts } from '@/lib/ghost';
import type { Post } from '@/lib/ghost';
import BlogCard from '@/components/blog/BlogCard';
import { useTranslations } from '@/lib/i18n';

interface BlogPageProps {
  params: {
    locale: string;
  };
}

export default async function BlogPage({ params: { locale } }: BlogPageProps) {
  const [posts, featuredPosts] = await Promise.all([
    getPosts(locale),
    getFeaturedPosts(locale),
  ]);

  const { translate } = useTranslations(locale as any);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{translate('featured', 'blog')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post: Post) => (
              <BlogCard key={post.id} post={post} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section>
        <h2 className="text-2xl font-bold mb-6">{translate('latest', 'blog')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: Post) => (
            <BlogCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
} 