import { getPosts, getFeaturedPosts } from '@/lib/ghost';
import type { Post } from '@/lib/ghost';
import BlogCard from '@/components/blog/BlogCard';
import { useTranslations } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface BlogPageProps {
  params: {
    locale: Locale;
  };
}

export default async function BlogPage({ params: { locale } }: BlogPageProps) {
  const { translate } = useTranslations(locale);
  
  try {
    const [posts, featuredPosts] = await Promise.all([
      getPosts(locale),
      getFeaturedPosts(locale)
    ]);

    if (posts.length === 0 && featuredPosts.length === 0) {
      return (
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">{translate('blog', 'common')}</h2>
          <p className="text-gray-600">{translate('no_posts', 'blog')}</p>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-16">
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{translate('featured', 'blog')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} locale={locale} />
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        {posts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">{translate('latest', 'blog')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} locale={locale} />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">{translate('blog', 'common')}</h2>
        <p className="text-red-600">{translate('error_loading', 'blog')}</p>
      </div>
    );
  }
} 