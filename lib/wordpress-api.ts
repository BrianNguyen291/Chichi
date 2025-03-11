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
  featured_media: number
  jetpack_featured_media_url?: string // WordPress.com specific
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
    // First, get all categories to identify the "Uncategorized" category ID
    const allCategories = await getCategories(locale)
    const uncategorizedId = 1 // Default WordPress uncategorized category ID

    // Fetch posts
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

    // Filter out posts that are only in the "Uncategorized" category
    const filteredPosts = data.filter(post => {
      // If the post has multiple categories and one is uncategorized, keep it
      // Only filter out posts that are ONLY in uncategorized
      return !(post.categories.length === 1 && post.categories[0] === uncategorizedId)
    })

    return filteredPosts
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