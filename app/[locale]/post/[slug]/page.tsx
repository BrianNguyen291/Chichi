import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { format } from 'date-fns'
import { getPost } from '@/lib/wordpress-api'
import type { Locale } from '@/lib/i18n'
import { colors } from '@/lib/colors'

interface PostPageProps {
  params: {
    locale: Locale
    slug: string
  }
}

export default async function PostPage({ params: { locale, slug } }: PostPageProps) {
  const post = await getPost(slug, locale)

  if (!post) {
    notFound()
  }

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Featured image */}
      {featuredImage && (
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={featuredImage}
            alt={post.title.rendered}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Post header */}
      <header className="mb-8">
        <h1 
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: colors.darkOlive }}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <div className="text-gray-600">
          {format(new Date(post.date), 'MMMM d, yyyy')}
        </div>
      </header>

      {/* Post content */}
      <div 
        className="prose prose-lg max-w-none prose-headings:text-[#4a5043] prose-a:text-[#b17f4a] prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  )
}

export async function generateMetadata({ params: { locale, slug } }: PostPageProps): Promise<Metadata> {
  const post = await getPost(slug, locale)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const title = post.title.rendered.replace(/<[^>]*>/g, '')
  const description = post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160)
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url

  return {
    title,
    description,
    openGraph: featuredImage ? {
      images: [{ url: featuredImage }],
    } : undefined,
  }
} 