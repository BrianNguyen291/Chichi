# 🔗 URL Migration Guide

This guide explains how to migrate Chinese URLs to clean English URLs for better SEO and user experience.

## 🎯 What This Solves

**Before:**
```
http://localhost:3000/zh-Hant/post/%e8%b6%8a%e5%8d%97%e8%aa%9e%e8%a8%80%e7%9c%9f%e7%9b%b8%e8%a7%a3%e5%af%86%ef%bd%9c%e6%b3%95%e8%aa%9e%ef%bc%9f%e8%8b%b1%e8%aa%9e%ef%bc%9f%e5%85%b6%e5%af%a6%e6%88%91%e5%80%91%e6%9c%80%e6%84%9b%e8%aa%aa
```

**After:**
```
http://localhost:3000/zh-Hant/post/vietnam-language-truth-decoded-french-english-actually-we-love-speak
```

## 🚀 Features

- ✅ **Automatic URL rewriting** from Chinese to English
- ✅ **Multiple slug formats** (English, Numeric, Short, Auto)
- ✅ **Backward compatibility** - old URLs still work
- ✅ **SEO-friendly** clean URLs
- ✅ **Social sharing** optimized short URLs
- ✅ **Automatic redirects** from old to new URLs

## 📁 Files Added/Modified

### New Files:
- `lib/url-rewriter.ts` - URL rewriting logic
- `components/CleanUrlGenerator.tsx` - UI component for URL generation
- `scripts/migrate-urls.ts` - Migration utility script
- `app/[locale]/url-demo/page.tsx` - Demo page

### Modified Files:
- `lib/wordpress-api.ts` - Enhanced with slug generation functions
- `middleware.ts` - Added URL rewriting support

## 🛠️ How to Use

### 1. Test the URL Generator

Visit the demo page to test different slug formats:
```
http://localhost:3000/en/url-demo
```

### 2. Generate Clean URLs Programmatically

```typescript
import { generateBetterSlug, getSlugOptions } from '@/lib/wordpress-api'
import { generateCleanUrl } from '@/lib/url-rewriter'

// Generate different slug types
const originalSlug = '越南語言真相解密|法語?英語?其實我們最愛說'

const englishSlug = generateBetterSlug(originalSlug, { type: 'english' })
// Result: 'vietnam-language-truth-decoded-french-english-actually-we-love-speak'

const numericSlug = generateBetterSlug(originalSlug, { type: 'numeric' })
// Result: 'post-abc123xyz'

const shortSlug = generateBetterSlug(originalSlug, { type: 'short', maxLength: 30 })
// Result: 'vietnam-language-truth-decoded'

// Generate clean URL
const cleanUrl = generateCleanUrl(originalSlug, 'zh-Hant', 'english')
// Result: '/zh-Hant/blog/vietnam-language-truth-decoded-french-english-actually-we-love-speak'
```

### 3. Use the CleanUrlGenerator Component

```tsx
import CleanUrlGenerator from '@/components/CleanUrlGenerator'

<CleanUrlGenerator
  originalSlug="越南語言真相解密|法語?英語?其實我們最愛說"
  locale="zh-Hant"
  onUrlSelect={(selectedUrl) => {
    console.log('Selected URL:', selectedUrl)
    // Handle URL selection
  }}
/>
```

### 4. Run Migration Script

```bash
npx tsx scripts/migrate-urls.ts
```

This will generate a migration report with:
- All possible URL variations
- Recommended URLs for each slug
- Redirect rules for your server
- Sitemap entries

## 🔧 Configuration

Edit `lib/url-rewriter.ts` to customize behavior:

```typescript
export const URL_REWRITE_CONFIG = {
  enabled: true,                    // Enable URL rewriting
  defaultSlugType: 'auto',         // Default slug type
  maxShortLength: 30,              // Max length for short slugs
  redirectOldUrls: true,           // Redirect old URLs to new ones
  preserveOriginalSlug: true       // Keep original slug in metadata
}
```

## 📊 Slug Types Explained

| Type | Description | Example | Best For |
|------|-------------|---------|----------|
| **English** | Translates Chinese to English | `vietnam-language-truth-decoded` | SEO, readability |
| **Numeric** | Hash-based short identifier | `post-abc123xyz` | Social sharing |
| **Short** | English with length limit | `vietnam-language-truth` | Balance |
| **Auto** | Smart choice between English/numeric | `vietnam-language-truth-decoded` | General use |

## 🔄 How Redirects Work

1. **User visits old URL**: `http://localhost:3000/zh-Hant/post/越南語言真相解密|法語?英語?其實我們最愛說`
2. **Middleware detects Chinese slug**: Automatically triggers rewrite
3. **Generates clean URL**: `vietnam-language-truth-decoded-french-english-actually-we-love-speak`
4. **Redirects to new URL**: `http://localhost:3000/zh-Hant/post/vietnam-language-truth-decoded-french-english-actually-we-love-speak`
5. **Post loads normally**: Using the enhanced `getPost` function

## 🎯 Benefits

- **Better SEO**: Clean, readable URLs improve search rankings
- **Social Sharing**: Shorter URLs are easier to share
- **User Experience**: Cleaner, more professional URLs
- **Backward Compatibility**: Old links continue to work
- **Multilingual Support**: Works with all your locales

## 🚨 Important Notes

1. **Test thoroughly** before deploying to production
2. **Update internal links** to use new URLs where possible
3. **Submit new sitemap** to search engines
4. **Monitor redirects** to ensure they're working correctly
5. **Keep original slugs** in WordPress for reference

## 🆘 Troubleshooting

### URLs not redirecting?
- Check that `URL_REWRITE_CONFIG.redirectOldUrls` is `true`
- Verify middleware is running correctly
- Check browser console for errors

### Generated URLs too long?
- Use `type: 'short'` with custom `maxLength`
- Use `type: 'numeric'` for shortest URLs

### Chinese characters not translating?
- Add more translations to the `translations` object in `createEnglishSlug`
- Check that the input slug contains recognizable Chinese terms

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Test with the demo page at `/url-demo`
3. Run the migration script to see all URL options
4. Verify your middleware configuration
