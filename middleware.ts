import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of supported locales
const locales = ['vi', 'en', 'zh-Hant', 'zh-Hans']
const defaultLocale = 'vi'

// Get the preferred locale from request headers
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return defaultLocale

  const preferredLocale = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0])
    .find(lang => {
      if (lang.startsWith('vi')) return 'vi'
      if (lang.startsWith('en')) return 'en'
      if (lang.startsWith('zh-Hant') || lang.startsWith('zh-TW')) return 'zh-Hant'
      if (lang.startsWith('zh-Hans') || lang.startsWith('zh-CN')) return 'zh-Hans'
      return null
    })

  return preferredLocale || defaultLocale
}

export function middleware(request: NextRequest) {
  // Get the pathname
  const { pathname } = request.nextUrl

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return
  }

  // Get the segments
  const segments = pathname.split('/').filter(Boolean)

  // If the first segment is already a locale, let it pass through
  if (segments.length && locales.includes(segments[0])) {
    return
  }

  // If no locale is present, redirect to the default locale
  const locale = getLocale(request)
  const newUrl = new URL(`/${locale}${pathname}`, request.url)
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
} 