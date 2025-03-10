import { WORDPRESS_API_URL } from '@/config'

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
  featured_media: number
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
    }>
  }
}

async function fetchFromWordPress(endpoint: string, params: Record<string, any> = {}) {
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
        revalidate: 60 // Cache for 60 seconds
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

export async function getCategories(locale: string = 'en'): Promise<WPCategory[]> {
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

    console.log('📁 Categories fetched:', data)
    return data
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
    search?: string
  } = {}
): Promise<WPPost[]> {
  const {
    locale,
    page = 1,
    perPage = 10,
    categories,
    search,
  } = params

  try {
    const data = await fetchFromWordPress('posts', {
      per_page: perPage,
      page,
      categories: categories?.join(','),
      search,
      lang: locale,
      _embed: true
    })

    if (!Array.isArray(data)) {
      console.error('❌ Invalid posts data:', data)
      return []
    }

    return data
  } catch (error) {
    console.error('❌ Error fetching posts:', error)
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

export function organizeCategories(categories: WPCategory[]): {
  mainCategories: WPCategory[]
  subCategories: { [parentId: number]: WPCategory[] }
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
  }, {} as { [parentId: number]: WPCategory[] })

  return { mainCategories, subCategories }
} 