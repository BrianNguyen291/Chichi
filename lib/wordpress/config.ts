export const WP_CONFIG = {
  // WordPress API Configuration
  siteId: 'annenails1.wordpress.com',
  apiBase: 'https://public-api.wordpress.com/rest/v1.1/sites/annenails1.wordpress.com',
  
  // Site Configuration
  siteName: 'Anne Nails',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  
  // Content Settings
  postsPerPage: 6,
  excerptLength: 150,
  
  // Image Settings
  defaultImage: 'https://placehold.co/600x400?text=No+Image+Available',
  imageSizes: {
    thumbnail: {
      width: 150,
      height: 150,
    },
    medium: {
      width: 300,
      height: 300,
    },
    large: {
      width: 1024,
      height: 1024,
    },
  } as const,
  
  // Languages
  languages: {
    en: {
      name: 'English',
      locale: 'en',
      dateFormat: 'MM/dd/yyyy',
    },
    'zh-Hant': {
      name: '繁體中文',
      locale: 'zh-Hant',
      dateFormat: 'yyyy/MM/dd',
    },
    'zh-Hans': {
      name: '简体中文',
      locale: 'zh-Hans',
      dateFormat: 'yyyy/MM/dd',
    },
  } as const,
  
  // Default Language
  defaultLanguage: 'zh-Hant',
  
  // Cache Settings
  cache: {
    duration: 5 * 60 * 1000, // 5 minutes
    staleWhileRevalidate: 60 * 60 * 1000, // 1 hour
  },
  
  // Social Media
  social: {
    facebook: 'https://facebook.com/annenails',
    instagram: 'https://instagram.com/annenails',
    youtube: 'https://youtube.com/annenails',
  },
  
  // Analytics
  analytics: {
    googleAnalytics: process.env.NEXT_PUBLIC_GA_ID,
    facebookPixel: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
  },
} as const;

// Type helpers
export type Language = keyof typeof WP_CONFIG.languages;
export type ImageSize = keyof typeof WP_CONFIG.imageSizes; 