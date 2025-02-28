import { fetchPost, fetchPosts } from '@/lib/wordpress/api';
import { formatDate } from '@/lib/wordpress/utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title.rendered,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, ''),
    openGraph: {
      title: post.title.rendered,
      description: post.excerpt.rendered.replace(/<[^>]*>/g, ''),
      images: post.featured_media ? [{ url: post.featured_media }] : [],
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

    return (
      <a
        href={shareUrls[platform as keyof typeof shareUrls]}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center px-4 py-2 rounded text-white transition-opacity hover:opacity-90
          ${platform === 'facebook' ? 'bg-[#1877F2]' : ''}
          ${platform === 'twitter' ? 'bg-[#1DA1F2]' : ''}
          ${platform === 'line' ? 'bg-[#00B900]' : ''}`}
      >
        {platform.charAt(0).toUpperCase() + platform.slice(1)}
      </a>
    );
  };

  return (
    <div className="bg-[#FDF8F7]">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb Navigation */}
        <nav className="mb-12 flex items-center space-x-2 text-sm">
          <a href={`/${params.locale}`} className="text-gray-500 hover:text-[#C4A86D]">
            首頁
          </a>
          <span className="text-gray-400">/</span>
          <a href={`/${params.locale}/blog`} className="text-gray-500 hover:text-[#C4A86D]">
            部落格
          </a>
          <span className="text-gray-400">/</span>
          <span className="text-[#C4A86D]" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        </nav>

        <article className="max-w-3xl mx-auto">
          {/* Article Header */}
          <header className="text-center mb-16">
            {post.featured_media && (
              <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={post.featured_media}
                  alt={post.title.rendered}
                  className="w-full h-auto"
                />
              </div>
            )}
            <div className="mb-4">
              <time
                className="text-sm text-gray-500 bg-[#FCF2EF] px-4 py-1 rounded-full"
                dateTime={post.date}
              >
                {formatDate(post.date, params.locale)}
              </time>
            </div>
            <h1
              className="text-3xl md:text-4xl font-normal mb-6 text-gray-800"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#FCF2EF] flex items-center justify-center mr-2">
                  <span className="text-[#C4A86D]">AN</span>
                </div>
                <span>Anne Nails</span>
              </div>
              <span className="text-gray-400">•</span>
              <span>
                閱讀時間 {Math.ceil(post.content.rendered.length / 500)} 分鐘
              </span>
            </div>
            <div className="w-24 h-[1px] bg-[#C4A86D] mx-auto mt-8"></div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              className="text-gray-700 leading-relaxed"
            />
          </div>

          {/* Share Buttons */}
          <div className="border-t border-gray-200 pt-8 mb-12">
            <h3 className="text-lg mb-4">分享此文：</h3>
            <div className="flex space-x-4">
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