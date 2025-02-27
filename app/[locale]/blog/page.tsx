import { getPosts, getFeaturedPosts } from '@/lib/ghost';
import type { Post } from '@/lib/ghost';
import type { Locale } from '@/lib/i18n';
import BlogContent from '@/components/blog/BlogContent';

interface BlogPageProps {
  params: {
    locale: Locale;
  };
}

export default async function BlogPage({ params: { locale } }: BlogPageProps) {
  try {
    // Fetch posts and handle potential null values
    const [postsResult, featuredPostsResult] = await Promise.all([
      getPosts(locale).catch(() => []),
      getFeaturedPosts(locale).catch(() => [])
    ]);

    // Convert dates to strings and remove any circular references
    const posts = postsResult.map(post => ({
      ...post,
      published_at: post.published_at.toString(),
      tags: post.tags.map(tag => ({ ...tag })),
      authors: post.authors.map(author => ({ ...author }))
    }));

    const featuredPosts = featuredPostsResult.map(post => ({
      ...post,
      published_at: post.published_at.toString(),
      tags: post.tags.map(tag => ({ ...tag })),
      authors: post.authors.map(author => ({ ...author }))
    }));

    return (
      <BlogContent 
        posts={posts} 
        featuredPosts={featuredPosts} 
        locale={locale} 
      />
    );
  } catch (error) {
    console.error('Error in BlogPage:', error);
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Blog</h2>
        <p className="text-red-600">Error loading posts, please try again later</p>
      </div>
    );
  }
} 