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

// Function to create a WordPress-compatible slug from a title
function createWordPressSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except word chars, spaces, and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

// Function to create a short English slug from Chinese title
function createEnglishSlug(chineseTitle: string): string {
  // Common Chinese to English translations for common terms
  const translations: { [key: string]: string } = {
    '越南': 'vietnam',
    '語言': 'language',
    '真相': 'truth',
    '解密': 'decoded',
    '法語': 'french',
    '英語': 'english',
    '其實': 'actually',
    '我們': 'we',
    '最愛': 'love',
    '說': 'speak',
    '學習': 'learn',
    '課程': 'course',
    '教學': 'teaching',
    '老師': 'teacher',
    '學生': 'student',
    '文化': 'culture',
    '歷史': 'history',
    '傳統': 'traditional',
    '現代': 'modern',
    '技巧': 'skills',
    '方法': 'method',
    '經驗': 'experience',
    '分享': 'share',
    '指南': 'guide',
    '秘訣': 'tips',
    '建議': 'advice',
    '推薦': 'recommend',
    '最佳': 'best',
    '重要': 'important',
    '實用': 'practical',
    '有效': 'effective',
    '簡單': 'simple',
    '容易': 'easy',
    '困難': 'difficult',
    '挑戰': 'challenge',
    '成功': 'success',
    '失敗': 'failure',
    '進步': 'progress',
    '改善': 'improve',
    '提升': 'enhance',
    '發展': 'develop',
    '成長': 'grow',
    '變化': 'change',
    '創新': 'innovation',
    '創意': 'creative',
    '有趣': 'interesting',
    '精彩': 'amazing',
    '特別': 'special',
    '獨特': 'unique',
    '專業': 'professional',
    '業餘': 'amateur',
    '初級': 'beginner',
    '中級': 'intermediate',
    '高級': 'advanced',
    '專家': 'expert',
    '大師': 'master',
    '新手': 'newbie',
    '老手': 'veteran',
    // Add more specific terms for your content
    '七夕節': 'qixi-festival',
    '探索': 'explore',
    '浪漫': 'romantic',
    '傳說': 'legend',
    '深意': 'meaning',
    '節日': 'festival',
    '愛情': 'love',
    '故事': 'story',
    '神話': 'myth',
    '傳說': 'legend',
    '傳統': 'tradition',
    '慶祝': 'celebration',
    '習俗': 'custom',
    '儀式': 'ritual',
    '節慶': 'celebration',
    '活動': 'activity',
    '慶典': 'celebration',
    '紀念': 'memorial',
    '意義': 'meaning',
    '價值': 'value',
    '精神': 'spirit',
    '內涵': 'connotation',
    '背景': 'background',
    '起源': 'origin',
    '歷史': 'history',
    '演變': 'evolution',
    '發展': 'development',
    '影響': 'influence',
    '作用': 'role',
    '功能': 'function',
    '特點': 'feature',
    '特色': 'characteristic',
    '風格': 'style',
    '形式': 'form',
    '內容': 'content',
    '主題': 'theme',
    '焦點': 'focus',
    '重點': 'key-point',
    '核心': 'core',
    '本質': 'essence',
    '精髓': 'essence',
    '要點': 'key-point',
    '亮點': 'highlight',
    '看點': 'highlight',
    '賣點': 'selling-point',
    '優勢': 'advantage',
    '好處': 'benefit',
    '優點': 'advantage',
    '長處': 'strength',
    '強項': 'strength',
    '特色': 'feature',
    '特點': 'characteristic',
    '個性': 'personality',
    '風格': 'style',
    '品味': 'taste',
    '格調': 'style',
    '氣質': 'temperament',
    '魅力': 'charm',
    '吸引力': 'appeal',
    '誘惑力': 'appeal',
    '感染力': 'appeal',
    '影響力': 'influence',
    '說服力': 'persuasion',
    '震撼力': 'impact',
    '衝擊力': 'impact',
    '爆發力': 'explosive-power',
    '潛力': 'potential',
    '能力': 'ability',
    '實力': 'strength',
    '功力': 'skill',
    '技巧': 'technique',
    '技能': 'skill',
    '才華': 'talent',
    '天賦': 'gift',
    '天分': 'talent',
    '天資': 'talent',
    '資質': 'aptitude',
    '素質': 'quality',
    '品質': 'quality',
    '水準': 'level',
    '水平': 'level',
    '程度': 'degree',
    '層次': 'level',
    '等級': 'grade',
    '級別': 'level',
    '檔次': 'grade',
    '品位': 'taste',
    '格調': 'style',
    '品味': 'taste',
    '修養': 'cultivation',
    '涵養': 'cultivation',
    '素養': 'cultivation',
    '教養': 'upbringing',
    '修養': 'cultivation',
    '涵養': 'cultivation',
    '素養': 'cultivation',
    '教養': 'upbringing',
    '修養': 'cultivation',
    '涵養': 'cultivation',
    '素養': 'cultivation',
    '教養': 'upbringing'
  }

  // Convert Chinese characters to English
  let englishTitle = chineseTitle
  for (const [chinese, english] of Object.entries(translations)) {
    englishTitle = englishTitle.replace(new RegExp(chinese, 'g'), english)
  }

  // Handle mixed content (Chinese + English) more intelligently
  // Extract English words that are already in the title
  const englishWords = englishTitle.match(/[a-zA-Z]+/g) || []
  
  // Remove remaining Chinese characters and special symbols
  englishTitle = englishTitle
    .replace(/[\u4e00-\u9fff]/g, '') // Remove remaining Chinese characters
    .replace(/[｜？]/g, '-') // Replace pipe and question mark with hyphens
    .replace(/[^\w\s-]/g, '') // Remove other special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .toLowerCase()
    .trim()

  // If we have English words from the original title, prioritize them
  if (englishWords.length > 0) {
    const cleanEnglishWords = englishWords
      .map(word => word.toLowerCase())
      .filter(word => word.length > 2) // Only keep words longer than 2 characters
      .slice(0, 3) // Take only first 3 words to keep it short
    
    if (cleanEnglishWords.length > 0) {
      return cleanEnglishWords.join('-')
    }
  }

  // If no English content, create a generic slug
  if (!englishTitle || englishTitle === '-') {
    return 'chinese-article'
  }

  // Limit length to keep URLs short
  const maxLength = 30
  if (englishTitle.length > maxLength) {
    englishTitle = englishTitle.substring(0, maxLength).replace(/-+$/, '') // Remove trailing hyphens
  }

  return englishTitle
}

// Function to create a numeric slug (shortest option)
function createNumericSlug(originalSlug: string): string {
  // Create a hash-based numeric slug
  let hash = 0
  for (let i = 0; i < originalSlug.length; i++) {
    const char = originalSlug.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return `post-${Math.abs(hash).toString(36)}` // Convert to base36 for shorter string
}

// Function to create an ultra-short slug for very long URLs
function createUltraShortSlug(originalSlug: string): string {
  // Extract key English words if any
  const englishWords = originalSlug.match(/[a-zA-Z]+/g) || []
  if (englishWords.length > 0) {
    // Use first 2 English words, max 4 characters each
    const shortWords = englishWords
      .map(word => word.toLowerCase().substring(0, 4))
      .slice(0, 2)
    return shortWords.join('-')
  }
  
  // Extract first few Chinese characters and convert to pinyin-like format
  const chineseChars = originalSlug.match(/[\u4e00-\u9fff]/g) || []
  if (chineseChars.length > 0) {
    // Use first 2-3 Chinese characters
    const shortChars = chineseChars.slice(0, 2).join('')
    // Convert to a short identifier
    let hash = 0
    for (let i = 0; i < shortChars.length; i++) {
      hash = ((hash << 5) - hash) + shortChars.charCodeAt(i)
      hash = hash & hash
    }
    return `cn-${Math.abs(hash).toString(36).substring(0, 6)}`
  }
  
  // Fallback to numeric
  return createNumericSlug(originalSlug)
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
    console.log('🔍 getPost called with slug:', slug)
    
    // First try with the original slug (as received from Next.js)
    let data = await fetchFromWordPress('posts', {
      slug,
      lang: locale,
      _embed: true
    })

    console.log('🔍 First attempt result:', Array.isArray(data) ? data.length : 'not array')

    // If no post found, try with sanitized slug
    if (!Array.isArray(data) || data.length === 0) {
      const sanitizedSlug = sanitizeSlug(slug)
      console.log('🔄 Trying with sanitized slug:', sanitizedSlug)
      
      data = await fetchFromWordPress('posts', {
        slug: sanitizedSlug,
        lang: locale,
        _embed: true
      })
    }

    // If still no post found, try URL-encoding the slug (in case WordPress expects encoded format)
    if (!Array.isArray(data) || data.length === 0) {
      const encodedSlug = encodeURIComponent(slug)
      console.log('🔄 Trying with URL-encoded slug:', encodedSlug)
      
      data = await fetchFromWordPress('posts', {
        slug: encodedSlug,
        lang: locale,
        _embed: true
      })
    }

    // If still no post found, try with sanitized and encoded slug
    if (!Array.isArray(data) || data.length === 0) {
      const sanitizedSlug = sanitizeSlug(slug)
      const encodedSanitizedSlug = encodeURIComponent(sanitizedSlug)
      console.log('🔄 Trying with sanitized and encoded slug:', encodedSanitizedSlug)
      
      data = await fetchFromWordPress('posts', {
        slug: encodedSanitizedSlug,
        lang: locale,
        _embed: true
      })
    }

    // If still no post found, try creating a WordPress-compatible slug
    if (!Array.isArray(data) || data.length === 0) {
      const wpCompatibleSlug = createWordPressSlug(slug)
      console.log('🔄 Trying with WordPress-compatible slug:', wpCompatibleSlug)
      
      data = await fetchFromWordPress('posts', {
        slug: wpCompatibleSlug,
        lang: locale,
        _embed: true
      })
    }

    // If still no post found, try creating an English slug
    if (!Array.isArray(data) || data.length === 0) {
      const englishSlug = createEnglishSlug(slug)
      console.log('🔄 Trying with English slug:', englishSlug)
      
      data = await fetchFromWordPress('posts', {
        slug: englishSlug,
        lang: locale,
        _embed: true
      })
    }

    // If still no post found, try creating a numeric slug
    if (!Array.isArray(data) || data.length === 0) {
      const numericSlug = createNumericSlug(slug)
      console.log('🔄 Trying with numeric slug:', numericSlug)
      
      data = await fetchFromWordPress('posts', {
        slug: numericSlug,
        lang: locale,
        _embed: true
      })
    }

    // If still no post found, try partial matching
    if (!Array.isArray(data) || data.length === 0) {
      const sanitizedSlug = sanitizeSlug(slug)
      console.log('🔄 Trying partial matching with:', sanitizedSlug)
      
      const partialMatch = await findPostByPartialMatch(sanitizedSlug, locale)
      if (partialMatch) {
        return partialMatch
      }
    }

    // If still no post found, try URL-decoding the slug (in case it's double-encoded)
    if (!Array.isArray(data) || data.length === 0) {
      try {
        const decodedSlug = decodeURIComponent(slug)
        if (decodedSlug !== slug) {
          console.log('🔄 Trying with URL-decoded slug:', decodedSlug)
          data = await fetchFromWordPress('posts', {
            slug: decodedSlug,
            lang: locale,
            _embed: true
          })
        }
      } catch (decodeError) {
        // Ignore decode errors
      }
    }

    // If still no post found, try with both sanitization and decoding
    if (!Array.isArray(data) || data.length === 0) {
      try {
        const decodedSlug = decodeURIComponent(slug)
        const sanitizedDecodedSlug = sanitizeSlug(decodedSlug)
        if (sanitizedDecodedSlug !== slug && sanitizedDecodedSlug !== decodeURIComponent(slug)) {
          console.log('🔄 Trying with sanitized and decoded slug:', sanitizedDecodedSlug)
          data = await fetchFromWordPress('posts', {
            slug: sanitizedDecodedSlug,
            lang: locale,
            _embed: true
          })
        }
      } catch (decodeError) {
        // Ignore decode errors
      }
    }

    if (!Array.isArray(data) || data.length === 0) {
      console.error('❌ Post not found after all attempts:', slug)
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

// Utility function to generate better URLs from Chinese titles
export function generateBetterSlug(originalSlug: string, options: {
  type?: 'english' | 'numeric' | 'short' | 'ultra-short' | 'auto'
  maxLength?: number
} = {}): string {
  const { type = 'auto', maxLength = 50 } = options

  switch (type) {
    case 'english':
      return createEnglishSlug(originalSlug)
    
    case 'numeric':
      return createNumericSlug(originalSlug)
    
    case 'short':
      const englishSlug = createEnglishSlug(originalSlug)
      return englishSlug.length > maxLength 
        ? englishSlug.substring(0, maxLength).replace(/-+$/, '') // Remove trailing hyphens
        : englishSlug
    
    case 'ultra-short':
      return createUltraShortSlug(originalSlug)
    
    case 'auto':
    default:
      // For very long URLs, use ultra-short
      if (originalSlug.length > 100) {
        return createUltraShortSlug(originalSlug)
      }
      
      // Try English first, fallback to ultra-short if too long
      const autoEnglishSlug = createEnglishSlug(originalSlug)
      if (autoEnglishSlug.length <= maxLength && autoEnglishSlug !== 'chinese-article') {
        return autoEnglishSlug
      }
      return createUltraShortSlug(originalSlug)
  }
}

// Example usage function to show different slug options
export function getSlugOptions(originalSlug: string): {
  original: string
  english: string
  numeric: string
  short: string
  ultraShort: string
  auto: string
} {
  return {
    original: originalSlug,
    english: createEnglishSlug(originalSlug),
    numeric: createNumericSlug(originalSlug),
    short: generateBetterSlug(originalSlug, { type: 'short', maxLength: 30 }),
    ultraShort: createUltraShortSlug(originalSlug),
    auto: generateBetterSlug(originalSlug, { type: 'auto' })
  }
} 