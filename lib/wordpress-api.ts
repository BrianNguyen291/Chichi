import { WORDPRESS_API_URL } from '@/config'
import { categoryTranslations } from '@/translations/categories'

export interface WPCategory {
  id: number
  name: string
  slug: string
  description: string
  parent: number
  count: number
  link: string
  meta: any[]
}

export interface TranslatedCategory extends WPCategory {
  translatedName: string
}

export interface WPPost {
  id: number
  date: string
  slug: string
  status: string
  type: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  categories: number[]
  tags?: number[]
  featured_media: number
  jetpack_featured_media_url?: string // WordPress.com specific
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
    }>
  }
}

export interface WPTag {
  id: number
  name: string
  slug: string
  description: string
  count: number
}

// Rate limiting
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second between requests

async function fetchFromWordPress(endpoint: string, params: Record<string, any> = {}) {
  // Rate limiting
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await new Promise(resolve => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest));
  }
  lastRequestTime = Date.now();

  // Build query string from params
  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&')

  const url = `${WORDPRESS_API_URL}/${endpoint}${queryString ? `?${queryString}` : ''}`
  console.log('🔍 Fetching from WordPress:', url)

  try {
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      next: {
        revalidate: 300 // Cache for 5 minutes instead of 60 seconds
      }
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('❌ WordPress API Error:', {
        status: res.status,
        statusText: res.statusText,
        url,
        response: text
      })
      throw new Error(`WordPress API Error: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    console.log('✅ WordPress API Response:', {
      endpoint,
      params,
      dataLength: Array.isArray(data) ? data.length : 'single item',
      data: data // Log the actual data for debugging
    })
    return data
  } catch (error) {
    console.error('❌ WordPress API Error:', {
      error,
      endpoint,
      params,
      url
    })
    throw error
  }
}

export async function getCategories(locale: string = 'en'): Promise<TranslatedCategory[]> {
  console.log('📁 Fetching categories for locale:', locale)
  try {
    const data = await fetchFromWordPress('categories', {
      per_page: 100,
      _fields: 'id,name,slug,description,parent,count,link,meta',
      lang: locale,
      hide_empty: false
    })

    if (!Array.isArray(data)) {
      console.error('❌ Invalid categories data:', data)
      return []
    }

    // Filter out the "Uncategorized" category
    let filteredCategories = data
      .filter(category => 
        category.id !== 1 && category.slug !== 'uncategorized'
      )

    console.log('📁 Categories before translation:', 
      JSON.stringify(filteredCategories.map(c => ({
        id: c.id,
        name: c.name,
        slug: c.slug
      })), null, 2)
    )

    // Add translations from categoryTranslations
    const translatedCategories = filteredCategories.map(category => {
      const translation = categoryTranslations[category.slug as keyof typeof categoryTranslations]
      console.log('🔍 Translation lookup for:', JSON.stringify({
        slug: category.slug,
        locale: locale,
        foundTranslation: !!translation,
        availableTranslation: translation?.[locale as keyof typeof translation],
        finalName: translation?.[locale as keyof typeof translation] || category.name,
        allTranslations: translation,
        categoryTranslationsKeys: Object.keys(categoryTranslations)
      }, null, 2))
      
      return {
        ...category,
        translatedName: translation?.[locale as keyof typeof translation] || category.name
      }
    })

    console.log('📁 Categories after translation:', 
      JSON.stringify(translatedCategories.map(c => ({
        id: c.id,
        name: c.name,
        translatedName: c.translatedName,
        slug: c.slug
      })), null, 2)
    )
    
    return translatedCategories
  } catch (error) {
    console.error('❌ Error fetching categories:', error)
    return []
  }
}

export async function getPosts(
  params: {
    locale?: string
    page?: number
    perPage?: number
    categories?: number[]
    tags?: number[]
    search?: string
  } = {}
): Promise<WPPost[]> {
  const {
    locale,
    page = 1,
    perPage = 10,
    categories,
    tags,
    search,
  } = params

  try {
    // Fetch posts
    const data = await fetchFromWordPress('posts', {
      per_page: perPage,
      page,
      categories: categories?.join(','),
      tags: tags?.join(','),
      search,
      lang: locale,
      _embed: true
    })

    if (!Array.isArray(data)) {
      console.error('❌ Invalid posts data:', data)
      return []
    }

    // If localized query returns very few posts, try a fallback without locale (show more posts)
    if (Array.isArray(data) && data.length <= 1 && locale) {
      try {
        const fallback = await fetchFromWordPress('posts', {
          per_page: perPage,
          page,
          categories: categories?.join(','),
          search,
          _embed: true
        })
        if (Array.isArray(fallback) && fallback.length > data.length) {
          return fallback
        }
      } catch (e) {
        // ignore fallback errors
      }
    }

    return data
  } catch (error) {
    console.error('❌ Error fetching posts:', error)
    return []
  }
}

export async function getTags(params: {
  locale?: string
  perPage?: number
  search?: string
} = {}): Promise<WPTag[]> {
  const { locale, perPage = 100, search } = params
  try {
    const data = await fetchFromWordPress('tags', {
      per_page: perPage,
      lang: locale,
      search,
      _fields: 'id,name,slug,description,count'
    })

    if (!Array.isArray(data)) {
      console.error('❌ Invalid tags data:', data)
      return []
    }

    return data
  } catch (error) {
    console.error('❌ Error fetching tags:', error)
    return []
  }
}

// Function to sanitize slug by removing invisible characters and normalizing
function sanitizeSlug(slug: string): string {
  // Remove invisible characters and zero-width spaces, including specific problematic chars
  return slug
    .replace(/[\u200B-\u200D\uFEFF\u2060\u200E\u200F\u202A-\u202E\u2069]/g, '') // Remove invisible characters including ⁩
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
}

// Helper function to find posts by partial title match
async function findPostByPartialMatch(partialSlug: string, locale: string): Promise<WPPost | null> {
  try {
    // Get recent posts to search through
    const posts = await fetchFromWordPress('posts', {
      per_page: 20, // Reduced to avoid API limits
      lang: locale,
      _embed: true
    })

    if (!Array.isArray(posts) || posts.length === 0) {
      return null
    }

    // Look for posts with titles that start with our partial slug
    const partialSlugLower = partialSlug.toLowerCase()

    for (const post of posts) {
      if (!post.title?.rendered) continue

      const title = post.title.rendered.toLowerCase()

      // Check if the post title starts with our partial slug
      if (title.startsWith(partialSlugLower)) {
        return post
      }

      // Also check if partial slug matches the beginning of the title (before special characters)
      const titleBeforeSpecial = title.split(/[｜？]/)[0]
      if (titleBeforeSpecial === partialSlugLower) {
        return post
      }
    }

    return null
  } catch (error) {
    console.error('Error in partial matching:', error)
    return null
  }
}

export async function getPost(slug: string, locale: string = 'en'): Promise<WPPost | null> {
  try {
    // Next.js automatically URL-decodes route parameters, so the slug parameter is already decoded
    // We only need to sanitize invisible characters
    const sanitizedSlug = sanitizeSlug(slug)

    // WordPress uses lowercase URL encoding, so we need to match that format
    const wordpressEncodedSlug = encodeURIComponent(sanitizedSlug).toLowerCase()

    let data = await fetchFromWordPress('posts', {
      slug: wordpressEncodedSlug,
      lang: locale,
      _embed: true
    })

    if (!Array.isArray(data) || data.length === 0) {
      // Try partial matching if exact slug fails
      const partialMatch = await findPostByPartialMatch(sanitizedSlug, locale)
      if (partialMatch) {
        return partialMatch
      }
      return null
    }

    return data[0]
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function getCategoryBySlug(slug: string, locale: string = 'en'): Promise<WPCategory | null> {
  try {
    const data = await fetchFromWordPress('categories', {
      slug,
      lang: locale,
      hide_empty: false
    })

    if (!Array.isArray(data) || data.length === 0) {
      console.error('❌ Category not found:', slug)
      return null
    }

    return data[0]
  } catch (error) {
    console.error('❌ Error fetching category:', error)
    return null
  }
}

export function organizeCategories(categories: TranslatedCategory[]): {
  mainCategories: TranslatedCategory[]
  subCategories: { [parentId: number]: TranslatedCategory[] }
} {
  if (!Array.isArray(categories)) {
    console.error('❌ Invalid categories array:', categories)
    return { mainCategories: [], subCategories: {} }
  }

  const mainCategories = categories.filter(cat => cat.parent === 0)
  const subCategories = categories.reduce((acc, cat) => {
    if (cat.parent !== 0) {
      if (!acc[cat.parent]) {
        acc[cat.parent] = []
      }
      acc[cat.parent].push(cat)
    }
    return acc
  }, {} as { [parentId: number]: TranslatedCategory[] })

  return { mainCategories, subCategories }
} 