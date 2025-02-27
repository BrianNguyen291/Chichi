import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of supported locales
export const locales = ['vi', 'en', 'zh-Hant', 'zh-Hans'] as const
export type Locale = typeof locales[number]
export const defaultLocale = 'vi'

// Validate if a string is a supported locale
function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

// Map common locale patterns to our supported locales
function mapToSupportedLocale(locale: string): Locale {
  const lowerLocale = locale.toLowerCase()
  if (lowerLocale.startsWith('vi')) return 'vi'
  if (lowerLocale.startsWith('en')) return 'en'
  if (lowerLocale.startsWith('zh-tw') || lowerLocale.startsWith('zh-hant')) return 'zh-Hant'
  if (lowerLocale.startsWith('zh-cn') || lowerLocale.startsWith('zh-hans')) return 'zh-Hans'
  return defaultLocale
}

// Get the preferred locale from request headers
function getLocale(request: NextRequest): Locale {
  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return defaultLocale

  const preferredLocale = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim())
    .find(lang => {
      const mapped = mapToSupportedLocale(lang)
      return mapped !== defaultLocale ? mapped : null
    })

  return (preferredLocale ? mapToSupportedLocale(preferredLocale) : defaultLocale)
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return
  }

  // Get the segments and first potential locale
  const segments = pathname.split('/')
  const firstSegment = segments[1] || ''

  // If the first segment is a valid locale, let it pass through
  if (isValidLocale(firstSegment)) {
    return
  }

  // If we have an unsupported locale pattern, map it to a supported one
  const mappedLocale = mapToSupportedLocale(firstSegment)
  
  // Create the new URL with the correct locale
  const newPathname = segments.length > 1 
    ? `/${mappedLocale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
    : `/${mappedLocale}`

  const newUrl = new URL(newPathname, request.url)
  newUrl.search = request.nextUrl.search
  
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
} 