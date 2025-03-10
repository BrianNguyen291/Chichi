import qs from 'qs'
import { Locale } from '@/lib/i18n'

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = '') {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
  }${path}`
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options = {}
) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
    ...options,
  }

  // Build request URL
  const queryString = qs.stringify(urlParamsObject)
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ''}`
  )}`

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions)

  // Handle response
  if (!response.ok) {
    console.error(response.statusText)
    throw new Error(`An error occurred please try again`)
  }
  const data = await response.json()
  return data
}

/**
 * Get localized entity based on locale and fallback locale
 */
export function getLocalizedEntity(entity: any, locale: Locale) {
  // If the locale is the default locale (en), return the entity
  if (locale === 'en') {
    return entity
  }

  // Otherwise, return the localized version or fallback to the default locale
  return entity.localizations?.data?.find(
    (localization: any) => localization.attributes.locale === locale
  ) || entity
}

/**
 * Get all courses with pagination
 */
export async function getCourses(locale: Locale, page = 1, pageSize = 10, filters = {}) {
  const data = await fetchAPI('/courses', {
    populate: ['image', 'tags'],
    locale,
    pagination: {
      page,
      pageSize,
    },
    filters,
  })
  return data
}

/**
 * Get a single course by slug
 */
export async function getCourseBySlug(slug: string, locale: Locale) {
  const data = await fetchAPI('/courses', {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: ['image', 'tags', 'syllabus'],
    locale,
  })
  return data?.data?.[0] || null
}

/**
 * Get all tags
 */
export async function getTags(locale: Locale, type?: string) {
  const filters = type ? { type: { $eq: type } } : {}
  const data = await fetchAPI('/tags', {
    locale,
    filters,
  })
  return data
}

/**
 * Get all library resources with pagination
 */
export async function getLibraryResources(locale: Locale, page = 1, pageSize = 10, filters = {}) {
  const data = await fetchAPI('/library-resources', {
    populate: ['image', 'file', 'tags'],
    locale,
    pagination: {
      page,
      pageSize,
    },
    filters,
  })
  return data
}

/**
 * Get a single library resource by slug
 */
export async function getLibraryResourceBySlug(slug: string, locale: Locale) {
  const data = await fetchAPI('/library-resources', {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: ['image', 'file', 'tags'],
    locale,
  })
  return data?.data?.[0] || null
}

/**
 * Get all Vietnamese exams with pagination
 */
export async function getVietnameseExams(locale: Locale, page = 1, pageSize = 10, filters = {}) {
  const data = await fetchAPI('/vietnamese-exams', {
    populate: ['image', 'materials'],
    locale,
    pagination: {
      page,
      pageSize,
    },
    filters,
  })
  return data
}

/**
 * Get a single Vietnamese exam by slug
 */
export async function getVietnameseExamBySlug(slug: string, locale: Locale) {
  const data = await fetchAPI('/vietnamese-exams', {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: ['image', 'materials'],
    locale,
  })
  return data?.data?.[0] || null
}

/**
 * Get all activities with pagination
 */
export async function getActivities(locale: Locale, page = 1, pageSize = 10, filters = {}) {
  const data = await fetchAPI('/activities', {
    populate: ['image', 'tags'],
    locale,
    pagination: {
      page,
      pageSize,
    },
    filters,
  })
  return data
}

/**
 * Get a single activity by slug
 */
export async function getActivityBySlug(slug: string, locale: Locale) {
  const data = await fetchAPI('/activities', {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: ['image', 'tags'],
    locale,
  })
  return data?.data?.[0] || null
}

/**
 * Get all blog posts with pagination
 */
export async function getBlogPosts(locale: Locale, page = 1, pageSize = 10, filters = {}) {
  const data = await fetchAPI('/blog-posts', {
    populate: ['image', 'categories'],
    locale,
    pagination: {
      page,
      pageSize,
    },
    filters,
  })
  return data
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string, locale: Locale) {
  const data = await fetchAPI('/blog-posts', {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: ['image', 'categories'],
    locale,
  })
  return data?.data?.[0] || null
}

/**
 * Get a page by slug
 */
export async function getPageBySlug(slug: string, locale: Locale) {
  const data = await fetchAPI('/pages', {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: ['featuredImage'],
    locale,
  })
  return data?.data?.[0] || null
}

/**
 * Get global site data
 */
export async function getGlobalData(locale: Locale) {
  const data = await fetchAPI('/global', {
    populate: ['favicon', 'defaultSeo.shareImage'],
    locale,
  })
  return data
} 