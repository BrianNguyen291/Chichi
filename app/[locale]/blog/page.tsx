import { getPosts } from '@/lib/ghost';
import type { Post } from '@/lib/ghost';
import { useTranslations } from '@/lib/i18n';

interface BlogPageProps {
  params: {
    locale: string;
  };
}

export default async function BlogPage({ params: { locale } }: BlogPageProps) {
  const posts = await getPosts(locale);
  const { translate } = useTranslations(locale);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">{translate('blog', 'navigation')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: Post) => (
          <div key={post.id} className="border rounded-lg overflow-hidden shadow-lg">
            {post.feature_image && (
              <img 
                src={post.feature_image} 
                alt={post.title} 
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <a 
                href={`/${locale}/blog/${post.slug}`} 
                className="text-blue-600 hover:underline"
              >
                {translate('readMore', 'blog')}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 