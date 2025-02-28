import { Post, Category, Tag, Media } from './types';
import { WP_CONFIG } from './config';
import type { WPPost, WPCategory, WPTag, WPAuthor } from './types';

const API_BASE = `https://public-api.wordpress.com/rest/v1.1/sites/${WP_CONFIG.siteId}`;

// Cache configuration
const CACHE_DURATION = WP_CONFIG.cache.duration;
interface CacheItem<T> {
  data: T;
  timestamp: number;
}
const cache: Record<string, CacheItem<any>> = {};

// Error handling
class WordPressAPIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'WordPressAPIError';
  }
}

// Cache helper functions
function getCached<T>(key: string): T | null {
  const item = cache[key];
  if (!item) return null;
  if (Date.now() - item.timestamp > CACHE_DURATION) {
    delete cache[key];
    return null;
  }
  return item.data;
}

function setCache<T>(key: string, data: T): void {
  cache[key] = {
    data,
    timestamp: Date.now(),
  };
}

// API helper function
async function fetchAPI<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const searchParams = new URLSearchParams(params);
  const url = `${WP_CONFIG.apiUrl}${endpoint}?${searchParams.toString()}`;
  
  try {
    console.log('Fetching from URL:', url);
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new WordPressAPIError(`API error: ${response.statusText}`, response.status);
    }

    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

// Helper function to extract featured media from WordPress response
function extractFeaturedMedia(post: any): string {
  if (!post) return getDefaultImage();
  console.log('Extracting featured media from post:', post.id, 'Featured media data:', post.featured_media, post.featured_image, post._embedded?.['wp:featuredmedia']);

  // For WordPress.com API
  if (post.featured_image) {
    return post.featured_image;
  }

  // Check for _embedded featured media
  if (post._embedded?.['wp:featuredmedia']?.[0]) {
    const media = post._embedded['wp:featuredmedia'][0];
    console.log('Found embedded media for post', post.id, ':', media);
    
    // For WordPress.com API
    if (media.URL) {
      return media.URL;
    }
    
    // Try different image size options
    if (media.media_details?.sizes) {
      const sizes = media.media_details.sizes;
      // Try to get the best size in order: large, medium, full
      if (sizes.large?.source_url) {
        return sizes.large.source_url;
      } else if (sizes.medium?.source_url) {
        return sizes.medium.source_url;
      } else if (sizes.full?.source_url) {
        return sizes.full.source_url;
      }
    }
    
    // Fallback to source_url or guid
    if (media.source_url) {
      return media.source_url;
    } else if (media.guid?.rendered) {
      return media.guid.rendered;
    } else if (media.link) {
      return media.link;
    }
  }

  // Check for featured_media URL directly
  if (typeof post.featured_media === 'string' && post.featured_media.startsWith('http')) {
    return post.featured_media;
  }

  // Check for media_url (WordPress.com specific)
  if (post.featured_media && typeof post.featured_media === 'number' && post.featured_media > 0) {
    // Try to fetch the media directly
    return fetchMediaDirectly(post.featured_media)
      .then(url => url)
      .catch(() => getDefaultImage());
  }

  return getDefaultImage();
}

// Helper function to directly fetch a media item by ID
async function fetchMediaDirectly(mediaId: number): Promise<string> {
  try {
    // Try to use the WordPress.com-specific media endpoint
    const mediaData = await fetchAPI<any>(`/media/${mediaId}`);
    if (mediaData.URL) {
      return mediaData.URL;
    } else if (mediaData.source_url) {
      return mediaData.source_url;
    } else if (mediaData.guid?.rendered) {
      return mediaData.guid.rendered;
    } else if (mediaData.link) {
      return mediaData.link;
    }
    return getDefaultImage();
  } catch (error) {
    console.error(`Failed to fetch media ${mediaId}:`, error);
    return getDefaultImage();
  }
}

// Helper function to get default image
function getDefaultImage(): string {
  // Return a data URL for a simple SVG placeholder
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2Yzc1N2QiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5DaGkgQ2hpIEVkdWNhdGlvbjwvdGV4dD48L3N2Zz4=';
}

interface FetchPostsOptions {
  page?: number;
  per_page?: number;
  categories?: number[];
  search?: string;
  language?: string;
}

export async function fetchPosts(options: FetchPostsOptions = {}): Promise<WPPost[]> {
  const {
    page = 1,
    per_page = WP_CONFIG.postsPerPage,
    categories,
    search,
    language,
  } = options;

  const params: Record<string, string> = {
    page: page.toString(),
    per_page: per_page.toString(),
    _embed: 'true', // Use 'true' instead of specific embed parameters
    // Include all fields we need
    _fields: 'id,date,title,excerpt,content,slug,featured_media,featured_image,categories,tags,author,status,sticky,_embedded',
  };

  if (categories?.length) {
    params.categories = categories.join(',');
  }

  if (search) {
    params.search = search;
  }

  if (language) {
    params.lang = language;
  }

  try {
    console.log('Fetching posts with params:', params);
    const posts = await fetchAPI<any[]>('/posts', params);
    console.log('Received posts count:', posts.length);
    
    // Process posts one by one to ensure proper featured media extraction
    const processedPosts = await Promise.all(posts.map(async (post: any) => {
      // Try to get the featured media 
      let featuredMedia;
      try {
        // First try the function that checks embedded data
        featuredMedia = extractFeaturedMedia(post);
        
        // If not found and we have a featured_media ID, fetch directly
        if ((!featuredMedia || featuredMedia === getDefaultImage()) && 
            post.featured_media && typeof post.featured_media === 'number' && post.featured_media > 0) {
          featuredMedia = await fetchMedia(post.featured_media);
        }
      } catch (error) {
        console.error(`Error getting featured media for post ${post.id}:`, error);
        featuredMedia = getDefaultImage();
      }
      
      console.log(`Post ${post.id} final featured media:`, featuredMedia);
      
      return {
        ...post,
        featured_media: featuredMedia,
        categories: post._embedded?.['wp:term']?.[0]?.map((cat: any) => cat.id) || [],
        categoryNames: post._embedded?.['wp:term']?.[0]?.map((cat: any) => cat.name) || [],
        featured: post.sticky || false,
      };
    }));
    
    return processedPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function fetchPost(slug: string): Promise<WPPost | null> {
  try {
    const params = {
      slug,
      _embed: 'true', // Use 'true' instead of specific embed parameters
      _fields: 'id,date,title,excerpt,content,slug,featured_media,featured_image,categories,tags,author,status,sticky,_embedded',
    };

    console.log('Fetching post with params:', params);
    const posts = await fetchAPI<any[]>('/posts', params);
    console.log('Received post data count:', posts.length);

    if (!posts.length) return null;

    const post = posts[0];
    
    // Try to get the featured media
    let featuredMedia;
    try {
      // First try the function that checks embedded data
      featuredMedia = extractFeaturedMedia(post);
      
      // If not found and we have a featured_media ID, fetch directly
      if ((!featuredMedia || featuredMedia === getDefaultImage()) && 
          post.featured_media && typeof post.featured_media === 'number' && post.featured_media > 0) {
        featuredMedia = await fetchMedia(post.featured_media);
      }
    } catch (error) {
      console.error(`Error getting featured media for post ${post.id}:`, error);
      featuredMedia = getDefaultImage();
    }
    
    console.log(`Post ${post.id} final featured media:`, featuredMedia);

    return {
      ...post,
      featured_media: featuredMedia,
      categories: post._embedded?.['wp:term']?.[0]?.map((cat: any) => cat.id) || [],
      categoryNames: post._embedded?.['wp:term']?.[0]?.map((cat: any) => cat.name) || [],
      featured: post.sticky || false,
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function fetchCategories(): Promise<WPCategory[]> {
  try {
    const params = {
      per_page: '100',
      hide_empty: 'true',
    };

    const categories = await fetchAPI<any[]>('/categories', params);
    return categories.map((category: any) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      count: category.count,
      parent: category.parent,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function fetchTags(): Promise<WPTag[]> {
  try {
    const params = {
      per_page: '100',
      hide_empty: 'true',
    };

    return await fetchAPI<WPTag[]>('/tags', params);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

export async function fetchAuthor(id: number): Promise<WPAuthor | null> {
  try {
    return await fetchAPI<WPAuthor>(`/users/${id}`);
  } catch (error) {
    console.error('Error fetching author:', error);
    return null;
  }
}

// Media API
export async function fetchMedia(mediaId: number): Promise<string> {
  const cacheKey = `media:${mediaId}`;
  const cached = getCached<string>(cacheKey);
  if (cached) return cached;

  try {
    console.log(`Fetching media with ID: ${mediaId}`);
    const data = await fetchAPI<any>(`/media/${mediaId}`);
    console.log(`Received media data for ID ${mediaId}:`, data);
    
    // For WordPress.com API
    if (data.URL) {
      const mediaUrl = data.URL;
      setCache(cacheKey, mediaUrl);
      return mediaUrl;
    }
    
    // Try to get the best available image URL
    let mediaUrl = data.source_url;
    
    // If source_url isn't available, check for other common properties
    if (!mediaUrl && data.guid?.rendered) {
      mediaUrl = data.guid.rendered;
    } else if (!mediaUrl && data.media_details?.sizes) {
      // Try to get large size or fall back to full
      const sizes = data.media_details.sizes;
      if (sizes.large?.source_url) {
        mediaUrl = sizes.large.source_url;
      } else if (sizes.medium?.source_url) {
        mediaUrl = sizes.medium.source_url;
      } else if (sizes.full?.source_url) {
        mediaUrl = sizes.full.source_url;
      }
    } else if (!mediaUrl && data.url) {
      mediaUrl = data.url;
    } else if (!mediaUrl && data.link) {
      mediaUrl = data.link;
    }
    
    // If still no URL, try WordPress.com specific format
    if (!mediaUrl && typeof mediaId === 'number' && mediaId > 0) {
      mediaUrl = `https://i0.wp.com/${WP_CONFIG.siteId}/wp-content/uploads/media/${mediaId}?fit=2000%2C2000`;
    }
    
    // If still no URL, use default image
    if (!mediaUrl) {
      mediaUrl = getDefaultImage();
    }
    
    console.log(`Final media URL for ID ${mediaId}:`, mediaUrl);
    setCache(cacheKey, mediaUrl);
    return mediaUrl;
  } catch (error) {
    console.error(`Error fetching media ${mediaId}:`, error);
    return getDefaultImage();
  }
}

// Get total posts count
export async function getTotalPosts(): Promise<number> {
  const response = await fetch(`${API_BASE}/posts`, { method: 'HEAD' });
  return parseInt(response.headers.get('X-WP-Total') || '0', 10);
}

// Get total pages for pagination
export async function getTotalPages(endpoint: string, perPage: number = WP_CONFIG.wpcom.perPage): Promise<number> {
  const url = buildApiUrl(endpoint, { per_page: perPage });
  const response = await fetch(url, { method: 'HEAD' });
  const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0', 10);
  return Math.ceil(totalPosts / perPage);
}

// Helper to build API URLs (needed for getTotalPages)
function buildApiUrl(endpoint: string, params: Record<string, any> = {}): string {
  const searchParams = new URLSearchParams();
  
  for (const key in params) {
    searchParams.append(key, params[key].toString());
  }
  
  return `${API_BASE}${endpoint}?${searchParams.toString()}`;
}

// Create/Update Post
export async function createOrUpdatePost(post: Partial<Post>, id?: number): Promise<Post> {
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${WP_CONFIG.endpoints.posts}/${id}` : WP_CONFIG.endpoints.posts;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${process.env.WORDPRESS_AUTH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    method,
    body: JSON.stringify(post),
  });
  
  if (!response.ok) {
    throw new WordPressAPIError(`Failed to ${id ? 'update' : 'create'} post: ${response.statusText}`, response.status);
  }
  
  return await response.json();
}

// Delete Post
export async function deletePost(id: number): Promise<void> {
  const response = await fetch(
    `${WP_CONFIG.endpoints.posts}/${id}`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.WORDPRESS_AUTH_TOKEN}`,
      },
      method: 'DELETE',
    }
  );
  
  if (!response.ok) {
    throw new WordPressAPIError(`Failed to delete post: ${response.statusText}`, response.status);
  }
} 