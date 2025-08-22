import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { format } from 'date-fns'
import { getPost, getTags } from '@/lib/wordpress-api'
import type { Locale } from '@/lib/i18n'
import { colors } from '@/lib/colors'
import Script from 'next/script'

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

  // Try both WordPress.com and self-hosted WordPress featured image URLs
  const featuredImage =
    post.jetpack_featured_media_url ||
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url

  // Resolve tag names for display if post has tag IDs
  let tagNames: string[] = []
  try {
    if (post?.tags && post.tags.length > 0) {
      const allTags = await getTags({ locale, perPage: 100 })
      const tagIdSet = new Set(post.tags)
      tagNames = allTags.filter(t => tagIdSet.has(t.id)).map(t => t.name)
    }
  } catch {
    // ignore tag resolution errors
  }

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title.rendered.replace(/<[^>]*>/g, ''),
    "description": post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160),
    "image": featuredImage,
    "author": {
      "@type": "Organization",
      "name": "芝芝越南語",
      "url": "https://chichivietnamese.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "芝芝越南語",
      "logo": {
        "@type": "ImageObject",
        "url": "https://chichivietnamese.com/Logo.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://chichivietnamese.com/${locale}/post/${slug}`
    },
    "keywords": tagNames.join(', '),
    "articleSection": "Vietnamese Language Learning",
    "inLanguage": locale === 'zh-Hant' ? 'zh-Hant' : locale === 'zh-Hans' ? 'zh-Hans' : 'en'
  }

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
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
        {tagNames.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tagNames.map((name) => (
              <a
                key={name}
                href={`/${locale}/blog?tag=${encodeURIComponent(name)}`}
                className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                #{name}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Post content */}
      <div
        className="prose prose-lg max-w-none prose-headings:text-[#4a5043] prose-a:text-[#b17f4a] prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
      </article>
    </>
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
  const featuredImage = post.jetpack_featured_media_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chichivietnamese.com'
  const canonicalUrl = `${baseUrl}/${locale}/post/${slug}`

  // Get tags for keywords
  let tagNames: string[] = []
  try {
    if (post?.tags && post.tags.length > 0) {
      const allTags = await getTags({ locale, perPage: 100 })
      const tagIdSet = new Set(post.tags)
      tagNames = allTags.filter(t => tagIdSet.has(t.id)).map(t => t.name)
    }
  } catch {
    // ignore tag resolution errors
  }

  return {
    title,
    description,
    keywords: tagNames.join(', ') || 'Vietnamese language, learning, education',
    creator: '芝芝越南語',
    publisher: '芝芝越南語',
    authors: [{ name: '芝芝越南語' }],
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'zh-Hant': `${baseUrl}/zh-Hant/post/${slug}`,
        'zh-Hans': `${baseUrl}/zh-Hans/post/${slug}`,
        'en': `${baseUrl}/en/post/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: '芝芝越南語',
      locale: locale,
      type: 'article',
      publishedTime: post.date,
      authors: ['芝芝越南語'],
      images: featuredImage ? [
        {
          url: featuredImage,
          width: 1200,
          height: 630,
          alt: title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: featuredImage ? [featuredImage] : [],
      creator: '@chichilanguageschool',
      site: '@chichilanguageschool',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
} 