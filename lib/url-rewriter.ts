import { generateBetterSlug, getSlugOptions } from './wordpress-api'

// URL rewriting configuration
export const URL_REWRITE_CONFIG = {
  // Enable URL rewriting
  enabled: true,
  
  // Default slug type for new URLs
  defaultSlugType: 'auto' as 'english' | 'numeric' | 'short' | 'auto',
  
  // Maximum length for short slugs
  maxShortLength: 30,
  
  // Whether to redirect old URLs to new ones
  redirectOldUrls: true,
  
  // Whether to preserve original slugs in metadata
  preserveOriginalSlug: true
}

// Interface for URL rewrite rules
export interface URLRewriteRule {
  pattern: RegExp
  replacement: string | ((match: string, ...groups: string[]) => string)
  type: 'rewrite' | 'redirect'
}

// Generate clean URL from Chinese slug
export function generateCleanUrl(originalSlug: string, locale: string = 'en', type?: 'english' | 'numeric' | 'short' | 'auto'): string {
  const slugType = type || URL_REWRITE_CONFIG.defaultSlugType
  const cleanSlug = generateBetterSlug(originalSlug, { 
    type: slugType, 
    maxLength: URL_REWRITE_CONFIG.maxShortLength 
  })
  
  return `/${locale}/blog/${cleanSlug}`
}

// Check if a slug needs rewriting
export function needsRewriting(slug: string): boolean {
  // Check if slug contains Chinese characters or special symbols
  return /[\u4e00-\u9fff]|[｜？]/.test(slug)
}

// Get all possible URL variations for a slug
export function getUrlVariations(originalSlug: string, locale: string = 'en'): {
  original: string
  clean: string
  english: string
  numeric: string
  short: string
  auto: string
} {
  const slugOptions = getSlugOptions(originalSlug)
  
  return {
    original: `/${locale}/blog/${originalSlug}`,
    clean: generateCleanUrl(originalSlug, locale),
    english: `/${locale}/blog/${slugOptions.english}`,
    numeric: `/${locale}/blog/${slugOptions.numeric}`,
    short: `/${locale}/blog/${slugOptions.short}`,
    auto: `/${locale}/blog/${slugOptions.auto}`
  }
}

// Create URL rewrite rules
export function createRewriteRules(): URLRewriteRule[] {
  return [
    // Rewrite Chinese slugs to English equivalents
    {
      pattern: /^\/[a-z-]+\/blog\/([\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]+.*)$/,
      replacement: (match: string, slug: string) => {
        const locale = match.split('/')[1]
        return generateCleanUrl(slug, locale)
      },
      type: 'rewrite'
    },
    
    // Redirect old encoded URLs to clean URLs
    {
      pattern: /^\/[a-z-]+\/blog\/([a-f0-9%]+)$/,
      replacement: (match: string, encodedSlug: string) => {
        try {
          const decodedSlug = decodeURIComponent(encodedSlug)
          const locale = match.split('/')[1]
          return generateCleanUrl(decodedSlug, locale)
        } catch {
          return match // Return original if decode fails
        }
      },
      type: 'redirect'
    }
  ]
}

// Generate canonical URL (the preferred URL for SEO)
export function generateCanonicalUrl(originalSlug: string, locale: string = 'en'): string {
  const cleanSlug = generateBetterSlug(originalSlug, { type: 'english' })
  return `/${locale}/blog/${cleanSlug}`
}

// Generate alternate URLs for hreflang
export function generateAlternateUrls(originalSlug: string, baseUrl: string = 'https://yourdomain.com'): {
  [locale: string]: string
} {
  const locales = ['en', 'zh-Hant', 'vi'] // Add your supported locales
  const alternateUrls: { [locale: string]: string } = {}
  
  locales.forEach(locale => {
    const cleanSlug = generateBetterSlug(originalSlug, { type: 'english' })
    alternateUrls[locale] = `${baseUrl}/${locale}/blog/${cleanSlug}`
  })
  
  return alternateUrls
}

// SEO metadata for clean URLs
export function generateSEOMetadata(originalSlug: string, locale: string = 'en', baseUrl: string = 'https://yourdomain.com') {
  const canonicalUrl = generateCanonicalUrl(originalSlug, locale)
  const alternateUrls = generateAlternateUrls(originalSlug, baseUrl)
  
  return {
    canonical: `${baseUrl}${canonicalUrl}`,
    alternates: {
      languages: alternateUrls
    },
    openGraph: {
      url: `${baseUrl}${canonicalUrl}`,
    }
  }
}

// Utility to check if current URL should be redirected
export function shouldRedirect(currentPath: string): { shouldRedirect: boolean; redirectTo?: string } {
  if (!URL_REWRITE_CONFIG.redirectOldUrls) {
    return { shouldRedirect: false }
  }
  
  const rules = createRewriteRules()
  
  for (const rule of rules) {
    if (rule.pattern.test(currentPath)) {
      let redirectTo: string
      
      if (typeof rule.replacement === 'function') {
        const match = currentPath.match(rule.pattern)
        if (match) {
          redirectTo = rule.replacement(match[0], ...match.slice(1))
        } else {
          continue
        }
      } else {
        redirectTo = currentPath.replace(rule.pattern, rule.replacement)
      }
      
      if (redirectTo !== currentPath) {
        return { shouldRedirect: true, redirectTo }
      }
    }
  }
  
  return { shouldRedirect: false }
}
