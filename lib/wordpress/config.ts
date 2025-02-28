export const WP_CONFIG = {
  // WordPress.com API Configuration
  siteId: "annenails1.wordpress.com",
  apiBase: "https://public-api.wordpress.com/rest/v1.1/sites",
  apiUrl: "https://public-api.wordpress.com/wp/v2/sites/annenails1.wordpress.com",
  
  // Site Configuration
  siteName: "Chi Chi Education",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  
  // Content Settings
  postsPerPage: 9,
  excerptLength: 150,
  defaultImage: "/images/placeholder.jpg",
  
  // Image Settings
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
    'en': {
      name: 'English',
      locale: 'en_US',
    },
    'vi': {
      name: 'Tiếng Việt',
      locale: 'vi_VN',
    },
    'zh-Hant': {
      name: '繁體中文',
      locale: 'zh_TW',
    },
    'zh-Hans': {
      name: '简体中文',
      locale: 'zh_CN',
    },
  } as const,
  
  // Default Language
  defaultLanguage: 'vi',
  
  // Cache Settings
  cache: {
    duration: 60 * 1000, // 1 minute
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
  
  // API Endpoints
  endpoints: {
    posts: "/posts",
    categories: "/categories",
    tags: "/tags",
    media: "/media",
    users: "/users",
  },
} as const;

// Type helpers
export type Language = keyof typeof WP_CONFIG.languages;
export type ImageSize = keyof typeof WP_CONFIG.imageSizes;
export type Endpoint = keyof typeof WP_CONFIG.endpoints; 