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

export async function getCategories(locale: string = 'en'): Promise<WPCategory[]> {
  try {
    const res = await fetch(
      `${WORDPRESS_API_URL}/categories?locale=${locale}&per_page=100&_fields=id,name,slug,description,parent,count,link,meta`,
      {
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store' // Disable caching to always get fresh data
      }
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`)
    }

    const categories = await res.json()
    return Array.isArray(categories) ? categories : []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getCategoryBySlug(slug: string, locale: string = 'en'): Promise<WPCategory | null> {
  try {
    const res = await fetch(
      `${WORDPRESS_API_URL}/categories?slug=${slug}&locale=${locale}`,
      {
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store'
      }
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch category: ${res.status}`)
    }

    const categories = await res.json()
    return Array.isArray(categories) && categories.length > 0 ? categories[0] : null
  } catch (error) {
    console.error('Error fetching category:', error)
    return null
  }
}

export async function getPosts(
  params: {
    locale?: string
    page?: number
    perPage?: number
    categories?: number[]
    search?: string
    slug?: string
  } = {}
): Promise<WPPost[]> {
  const {
    locale = 'en',
    page = 1,
    perPage = 10,
    categories,
    search,
    slug
  } = params

  try {
    let url = `${WORDPRESS_API_URL}/posts?locale=${locale}&page=${page}&per_page=${perPage}&_embed`

    if (categories?.length) {
      url += `&categories=${categories.join(',')}`
    }

    if (search) {
      url += `&search=${encodeURIComponent(search)}`
    }

    if (slug) {
      url += `&slug=${slug}`
    }

    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store' // Disable caching to always get fresh data
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status}`)
    }

    const posts = await res.json()
    return Array.isArray(posts) ? posts : []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export function organizeCategories(categories: WPCategory[]): {
  mainCategories: WPCategory[]
  subCategories: { [parentId: number]: WPCategory[] }
} {
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