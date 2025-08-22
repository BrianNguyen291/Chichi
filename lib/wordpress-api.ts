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

  try {
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; ZhiyueNanyu/1.0)',
      },
      next: {
        revalidate: 300 // Cache for 5 minutes instead of 60 seconds
      }
    })

    if (!res.ok) {
      if (res.status === 429) {
        console.error('Rate limit exceeded, waiting 60 seconds...');
        await new Promise(resolve => setTimeout(resolve, 60000));
        return fetchFromWordPress(endpoint, params);
      }
      console.error('WordPress API Error:', res.status, res.statusText)
      throw new Error(`WordPress API Error: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('WordPress API Error:', error)
    throw error
  }
}

export async function getCategories(locale: string = 'en'): Promise<TranslatedCategory[]> {
  try {
    const data = await fetchFromWordPress('categories', {
      per_page: 100,
      _fields: 'id,name,slug,description,parent,count,link,meta',
      lang: locale,
      hide_empty: false
    })

    if (!Array.isArray(data)) {
      console.error('Invalid categories data')
      return []
    }

    // Filter out the "Uncategorized" category
    let filteredCategories = data
      .filter(category => 
        category.id !== 1 && category.slug !== 'uncategorized'
      )

    // Add translations from categoryTranslations
    const translatedCategories = filteredCategories.map(category => {
      const translation = categoryTranslations[category.slug as keyof typeof categoryTranslations]
      
      return {
        ...category,
        translatedName: translation?.[locale as keyof typeof translation] || category.name
      }
    })
    
    return translatedCategories
  } catch (error) {
    console.error('Error fetching categories:', error)
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

export async function getPost(slug: string, locale: string = 'en'): Promise<WPPost | null> {
  try {
    const data = await fetchFromWordPress('posts', {
      slug,
      lang: locale,
      _embed: true
    })

    if (!Array.isArray(data) || data.length === 0) {
      console.error('❌ Post not found:', slug)
      return null
    }

    return data[0]
  } catch (error) {
    console.error('❌ Error fetching post:', error)
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