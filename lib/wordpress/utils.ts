import { Media, Post } from './types';
import { WP_CONFIG, ImageSize } from './config';

/**
 * Get the featured image URL for a post
 */
export function getFeaturedImageUrl(post: Post, size: ImageSize = 'full'): string | null {
  if (!post.featured_media) {
    return null;
  }
  return `/api/media/${post.featured_media}?size=${size}`;
}

/**
 * Get image URL from media object
 */
export function getImageUrl(media: Media, size: ImageSize = 'full'): string {
  if (size === 'full' || !media.media_details.sizes?.[size]) {
    return media.source_url;
  }
  return media.media_details.sizes[size].source_url;
}

/**
 * Clean HTML content from WordPress
 */
export function cleanContent(content: string): string {
  // Remove WordPress-specific classes
  return content
    .replace(/class="[^"]*"/g, '')
    // Remove empty paragraphs
    .replace(/<p>\s*<\/p>/g, '')
    // Remove multiple line breaks
    .replace(/(\r\n|\n|\r){2,}/g, '\n')
    .trim();
}

/**
 * Format date for display
 */
export function formatDate(date: string, locale: string = WP_CONFIG.defaultLanguage): string {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Get excerpt from content
 */
export function getExcerpt(content: string, maxLength: number = 150): string {
  // Remove HTML tags
  const text = content.replace(/<[^>]*>/g, '');
  
  if (text.length <= maxLength) {
    return text;
  }

  // Find the last space before maxLength
  const lastSpace = text.lastIndexOf(' ', maxLength);
  return text.substring(0, lastSpace) + '...';
}

/**
 * Get language name from code
 */
export function getLanguageName(code: string): string {
  return WP_CONFIG.languages[code as keyof typeof WP_CONFIG.languages] || code;
}

/**
 * Get post URL
 */
export function getPostUrl(post: Post, locale: string = WP_CONFIG.defaultLanguage): string {
  return `/${locale}/blog/${post.slug}`;
}

/**
 * Parse ACF fields
 */
export function parseAcfFields<T extends Record<string, any>>(post: Post): T {
  return post.acf as T;
}

/**
 * Get translated version of a post
 */
export function getTranslation(post: Post, targetLang: string): number | null {
  return post.translations?.[targetLang] || null;
}

/**
 * Check if post has translation
 */
export function hasTranslation(post: Post, lang: string): boolean {
  return Boolean(post.translations?.[lang]);
}

/**
 * Get available translations for a post
 */
export function getAvailableTranslations(post: Post): string[] {
  if (!post.translations) {
    return [];
  }
  return Object.keys(post.translations);
}

/**
 * Get post type label
 */
export function getPostTypeLabel(type: keyof typeof WP_CONFIG.postTypes): string {
  return WP_CONFIG.postTypes[type];
}

/**
 * Get taxonomy label
 */
export function getTaxonomyLabel(taxonomy: keyof typeof WP_CONFIG.taxonomies): string {
  return WP_CONFIG.taxonomies[taxonomy];
} 