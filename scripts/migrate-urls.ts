#!/usr/bin/env tsx

/**
 * URL Migration Script
 * 
 * This script helps migrate Chinese URLs to clean English URLs
 * Run with: npx tsx scripts/migrate-urls.ts
 */

import { getSlugOptions, generateBetterSlug } from '../lib/wordpress-api'
import { getUrlVariations, generateCleanUrl } from '../lib/url-rewriter'

// Example Chinese slugs to migrate
const exampleSlugs = [
  '越南語言真相解密|法語?英語?其實我們最愛說',
  '學習中文的最佳方法',
  '台灣文化與傳統',
  '現代科技對教育的影響',
  '如何提高語言學習效率'
]

// Supported locales
const locales = ['en', 'zh-Hant', 'vi']

interface MigrationResult {
  originalSlug: string
  locale: string
  originalUrl: string
  cleanUrl: string
  englishUrl: string
  numericUrl: string
  shortUrl: string
  autoUrl: string
  recommendation: string
}

function migrateSlug(originalSlug: string, locale: string): MigrationResult {
  const variations = getUrlVariations(originalSlug, locale)
  
  // Determine recommendation based on slug characteristics
  let recommendation = 'auto'
  if (originalSlug.length > 50) {
    recommendation = 'numeric'
  } else if (originalSlug.includes('|') || originalSlug.includes('?')) {
    recommendation = 'english'
  } else if (originalSlug.length < 20) {
    recommendation = 'short'
  }

  return {
    originalSlug,
    locale,
    originalUrl: variations.original,
    cleanUrl: variations.clean,
    englishUrl: variations.english,
    numericUrl: variations.numeric,
    shortUrl: variations.short,
    autoUrl: variations.auto,
    recommendation
  }
}

function generateMigrationReport(slugs: string[]): void {
  console.log('🚀 URL Migration Report\n')
  console.log('=' .repeat(80))
  
  const results: MigrationResult[] = []
  
  // Process each slug for each locale
  for (const slug of slugs) {
    for (const locale of locales) {
      results.push(migrateSlug(slug, locale))
    }
  }
  
  // Group by original slug
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.originalSlug]) {
      acc[result.originalSlug] = []
    }
    acc[result.originalSlug].push(result)
    return acc
  }, {} as Record<string, MigrationResult[]>)
  
  // Display results
  Object.entries(groupedResults).forEach(([originalSlug, results]) => {
    console.log(`\n📝 Original Slug: ${originalSlug}`)
    console.log('-'.repeat(60))
    
    results.forEach(result => {
      console.log(`\n🌐 Locale: ${result.locale}`)
      console.log(`   Original: ${result.originalUrl}`)
      console.log(`   English:  ${result.englishUrl}`)
      console.log(`   Numeric:  ${result.numericUrl}`)
      console.log(`   Short:    ${result.shortUrl}`)
      console.log(`   Auto:     ${result.autoUrl}`)
      console.log(`   💡 Recommended: ${result.recommendation}`)
    })
  })
  
  // Generate redirect rules
  console.log('\n\n🔧 Redirect Rules for .htaccess or Next.js middleware:')
  console.log('=' .repeat(80))
  
  results.forEach(result => {
    if (result.recommendation !== 'auto') {
      const cleanUrl = result.cleanUrl
      const originalUrl = result.originalUrl
      console.log(`Redirect 301 ${originalUrl} ${cleanUrl}`)
    }
  })
  
  // Generate sitemap entries
  console.log('\n\n🗺️  Sitemap Entries (recommended URLs):')
  console.log('=' .repeat(80))
  
  const recommendedUrls = results
    .filter(result => result.recommendation === 'auto' || result.recommendation === 'english')
    .map(result => result.cleanUrl)
    .filter((url, index, self) => self.indexOf(url) === index) // Remove duplicates
  
  recommendedUrls.forEach(url => {
    console.log(`<url><loc>https://yourdomain.com${url}</loc></url>`)
  })
}

function generateNextjsRedirects(): void {
  console.log('\n\n⚙️  Next.js redirects.js configuration:')
  console.log('=' .repeat(80))
  console.log('Create a redirects.js file in your project root with:')
  console.log(`
module.exports = {
  async redirects() {
    return [
      // Add your redirects here
      {
        source: '/zh-Hant/blog/:slug',
        destination: '/zh-Hant/blog/:slug',
        permanent: true,
      },
    ]
  },
}
  `)
}

// Main execution
if (require.main === module) {
  console.log('🔄 Starting URL migration process...\n')
  
  // Generate report for example slugs
  generateMigrationReport(exampleSlugs)
  
  // Generate Next.js configuration
  generateNextjsRedirects()
  
  console.log('\n✅ Migration report generated!')
  console.log('\nNext steps:')
  console.log('1. Review the recommended URLs above')
  console.log('2. Update your WordPress posts with new slugs')
  console.log('3. Add redirect rules to your server')
  console.log('4. Update internal links to use new URLs')
  console.log('5. Submit new sitemap to search engines')
}

export { migrateSlug, generateMigrationReport }
