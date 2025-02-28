import { Post, Category, Tag, Media } from './types';
import { WP_CONFIG } from './config';

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
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new WordPressAPIError(`API error: ${response.statusText}`, response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof WordPressAPIError) throw error;
    throw new WordPressAPIError(error instanceof Error ? error.message : 'Unknown error');
  }
}

// Posts API
export async function fetchPosts(params: {
  page?: number;
  per_page?: number;
  categories?: string[];
  search?: string;
} = {}): Promise<Post[]> {
  const cacheKey = `posts:${JSON.stringify(params)}`;
  const cached = getCached<Post[]>(cacheKey);
  if (cached) return cached;

  const searchParams = new URLSearchParams();
  searchParams.append('fields', 'ID,title,content,excerpt,date,slug,featured_image,categories');
  searchParams.append('number', (params.per_page || WP_CONFIG.postsPerPage).toString());
  
  if (params.page) searchParams.append('page', params.page.toString());
  if (params.categories?.length) searchParams.append('category', params.categories.join(','));
  if (params.search) searchParams.append('search', params.search);

  const data = await fetchAPI<{ posts: any[] }>(`/posts?${searchParams}`);
  
  const posts = data.posts.map(post => ({
    id: post.ID,
    title: { rendered: post.title },
    content: { rendered: post.content },
    excerpt: { rendered: post.excerpt },
    date: post.date,
    slug: post.slug,
    featured_media: post.featured_image || WP_CONFIG.defaultImage,
    categories: Object.keys(post.categories || {}).map(key => post.categories[key].ID.toString()),
    categoryNames: Object.values(post.categories || {}).map((cat: any) => cat.name)
  }));

  setCache(cacheKey, posts);
  return posts;
}

// Categories API
export async function fetchCategories(): Promise<Category[]> {
  const cacheKey = 'categories';
  const cached = getCached<Category[]>(cacheKey);
  if (cached) return cached;

  const data = await fetchAPI<{ categories: any[] }>('/categories');
  
  const categories = data.categories
    .filter(cat => cat.post_count > 0)
    .map(category => ({
      id: category.ID.toString(),
      name: category.name,
      slug: category.slug,
      count: category.post_count
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  setCache(cacheKey, categories);
  return categories;
}

// Single post API
export async function fetchPost(slug: string): Promise<Post | null> {
  const cacheKey = `post:${slug}`;
  const cached = getCached<Post>(cacheKey);
  if (cached) return cached;

  try {
    const data = await fetchAPI<{ posts: any[] }>(`/posts?slug=${slug}`);
    
    if (!data.posts.length) return null;
    
    const post = data.posts[0];
    const formattedPost = {
      id: post.ID,
      title: { rendered: post.title },
      content: { rendered: post.content },
      excerpt: { rendered: post.excerpt },
      date: post.date,
      slug: post.slug,
      featured_media: post.featured_image || WP_CONFIG.defaultImage,
      categories: Object.keys(post.categories || {}).map(key => post.categories[key].ID.toString()),
      categoryNames: Object.values(post.categories || {}).map((cat: any) => cat.name)
    };

    setCache(cacheKey, formattedPost);
    return formattedPost;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Media API
export async function fetchMedia(mediaId: number): Promise<string> {
  const cacheKey = `media:${mediaId}`;
  const cached = getCached<string>(cacheKey);
  if (cached) return cached;

  try {
    const data = await fetchAPI<Media>(`/media/${mediaId}`);
    const mediaUrl = data.source_url;
    setCache(cacheKey, mediaUrl);
    return mediaUrl;
  } catch (error) {
    console.error('Error fetching media:', error);
    return WP_CONFIG.defaultImage;
  }
}

// Get total posts count
export async function getTotalPosts(): Promise<number> {
  const response = await fetch(`${API_BASE}/posts`, { method: 'HEAD' });
  return parseInt(response.headers.get('X-WP-Total') || '0', 10);
}

// Tags API
export async function getTags(params: {
  page?: number;
  per_page?: number;
  lang?: string;
} = {}): Promise<Tag[]> {
  const url = buildApiUrl(WP_CONFIG.endpoints.tags, {
    ...params,
    per_page: params.per_page || WP_CONFIG.wpcom.perPage,
  });

  const response = await fetch(url);
  return handleResponse<Tag[]>(response);
}

// Get total pages for pagination
export async function getTotalPages(endpoint: string, perPage: number = WP_CONFIG.wpcom.perPage): Promise<number> {
  const url = buildApiUrl(endpoint, { per_page: perPage });
  const response = await fetch(url, { method: 'HEAD' });
  const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0', 10);
  return Math.ceil(totalPosts / perPage);
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
  return handleResponse<Post>(response);
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
  await handleResponse<void>(response);
} 