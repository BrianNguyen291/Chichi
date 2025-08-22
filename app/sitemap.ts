import { MetadataRoute } from 'next'
import { getPosts } from '@/lib/wordpress-api'
import type { Locale } from '@/lib/i18n'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chichivietnamese.com'
  const locales: Locale[] = ['zh-Hant', 'zh-Hans', 'en']
  
  const sitemap: MetadataRoute.Sitemap = [
    // Static pages
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/teacher-team`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Add blog posts for each locale
  for (const locale of locales) {
    try {
      const posts = await getPosts({ locale, perPage: 100 })
      
      posts.forEach((post) => {
        sitemap.push({
          url: `${baseUrl}/${locale}/post/${post.slug}`,
          lastModified: new Date(post.modified),
          changeFrequency: 'weekly',
          priority: 0.6,
        })
      })
    } catch (error) {
      console.error(`Error fetching posts for locale ${locale}:`, error)
    }
  }

  // Add category pages
  for (const locale of locales) {
    sitemap.push({
      url: `${baseUrl}/${locale}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  }

  return sitemap
}
