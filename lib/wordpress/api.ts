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

// Add these utility functions at the top of the file
function buildApiUrl(endpoint: string, params: Record<string, any> = {}): string {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      searchParams.append(key, value.toString());
    }
  }
  return `${API_BASE}${endpoint}?${searchParams}`;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new WordPressAPIError(
      errorData.message || `HTTP error! status: ${response.status}`,
      response.status
    );
  }
  return response.json();
}

// Posts API
export async function fetchPosts(params: {
  page?: number;
  per_page?: number;
  categories?: string[] | string | number;
  search?: string;
  lang?: string;
} = {}): Promise<Post[]> {
  const cacheKey = `posts:${JSON.stringify(params)}`;
  const cached = getCached<Post[]>(cacheKey);
  if (cached) return cached;

  const searchParams = new URLSearchParams();
  searchParams.append('fields', 'ID,title,content,excerpt,date,slug,featured_image,categories,sticky');
  searchParams.append('number', (params.per_page || WP_CONFIG.postsPerPage).toString());
  
  if (params.page) searchParams.append('page', params.page.toString());
  if (params.categories) {
    console.log('Category filter debug:');
    console.log('Raw input:', params.categories);
    console.log('Type:', typeof params.categories);
    
    const categoryId = Array.isArray(params.categories) 
      ? params.categories[0] 
      : params.categories;
    
    console.log('Processing category ID:', categoryId);
    
    if (typeof categoryId === 'string') {
      if (!categoryId.includes('-')) {
        const numericId = parseInt(categoryId, 10);
        if (!isNaN(numericId)) {
          searchParams.append('category', numericId.toString());
          console.log('Added numeric category ID:', numericId);
        }
      } else {
        console.log('Slug-based category filtering not supported');
      }
    } else if (typeof categoryId === 'number') {
      searchParams.append('category', categoryId.toString());
      console.log('Added numeric category ID:', categoryId);
    }
  }
  if (params.search) searchParams.append('search', params.search);
  if (params.lang) searchParams.append('lang', params.lang);

  try {
    const requestUrl = `${API_BASE}/posts?${searchParams}`;
    console.log('Fetching posts from URL:', requestUrl);
    
    const data = await fetchAPI<{ posts: any[] }>(`/posts?${searchParams}`);
    
    if (!data.posts || data.posts.length === 0) {
      console.log('No posts found for params:', params);
      console.log('API Response:', data);
      return [];
    }

    console.log('Found posts:', data.posts.length);
    if (data.posts.length > 0) {
      console.log('Sample post data:', {
        id: data.posts[0].ID,
        title: data.posts[0].title,
        categories: data.posts[0].categories,
        language: data.posts[0].lang
      });
    }

    const posts = data.posts.map(post => {
      // Handle categories from WordPress.com API response
      const postCategories = post.categories || {};
      console.log('Raw post categories for post', post.ID, ':', postCategories);
      
      let categoryIds: string[] = [];
      let categoryNames: string[] = [];
      
      // Handle WordPress.com API category format
      if (typeof postCategories === 'object' && !Array.isArray(postCategories)) {
        Object.entries(postCategories).forEach(([_, category]: [string, any]) => {
          if (category && typeof category === 'object' && 'ID' in category) {
            categoryIds.push(category.ID.toString());
            if ('name' in category) {
              categoryNames.push(category.name);
            }
          }
        });
      }
      
      console.log('Processed categories for post', post.ID, ':', { categoryIds, categoryNames });

      return {
        id: post.ID,
        title: { rendered: post.title },
        content: { rendered: post.content },
        excerpt: { rendered: post.excerpt },
        date: post.date,
        slug: post.slug,
        featured_media: post.featured_image || WP_CONFIG.defaultImage,
        categories: categoryIds,
        categoryNames: categoryNames,
        featured: post.sticky || false
      };
    });

    setCache(cacheKey, posts);
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new WordPressAPIError(
      error instanceof Error ? `Failed to fetch posts: ${error.message}` : 'Failed to fetch posts'
    );
  }
}

// Enhanced Category interfaces
interface CategoryBase {
  id: string;
  name: string;
  slug: string;
  count: number;
  description?: string;
  parent?: string;
  meta?: Record<string, any>;
}

interface CategoryHierarchical extends CategoryBase {
  children?: CategoryHierarchical[];
}

// Categories API with enhanced functionality
export async function fetchCategories(params: {
  page?: number;
  per_page?: number;
  parent?: number;
  hide_empty?: boolean;
  orderby?: 'name' | 'id' | 'slug' | 'count';
  order?: 'asc' | 'desc';
} = {}): Promise<CategoryBase[]> {
  const cacheKey = `categories:${JSON.stringify(params)}`;
  const cached = getCached<CategoryBase[]>(cacheKey);
  if (cached) return cached;

  const searchParams = new URLSearchParams();
  if (params.page) searchParams.append('page', params.page.toString());
  if (params.per_page) searchParams.append('number', params.per_page.toString());
  if (params.parent !== undefined) searchParams.append('parent', params.parent.toString());
  if (params.hide_empty !== undefined) searchParams.append('hide_empty', params.hide_empty.toString());
  if (params.orderby) searchParams.append('orderby', params.orderby);
  if (params.order) searchParams.append('order', params.order);

  try {
    const requestUrl = `${API_BASE}/categories?${searchParams}`;
    console.log('Fetching categories from URL:', requestUrl);
    
    const data = await fetchAPI<{ categories: any[] }>(`/categories?${searchParams}`);
    console.log('Raw categories response:', data);
    
    const categories = data.categories
      .map(category => ({
        id: category.ID.toString(),
        name: category.name,
        slug: category.slug,
        count: category.post_count,
        description: category.description,
        parent: category.parent ? category.parent.toString() : undefined,
        meta: category.meta || {}
      }));

    console.log('Processed categories:', categories);
    setCache(cacheKey, categories);
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new WordPressAPIError(
      error instanceof Error ? `Failed to fetch categories: ${error.message}` : 'Failed to fetch categories'
    );
  }
}

// Get hierarchical categories
export async function fetchHierarchicalCategories(params: {
  hide_empty?: boolean;
  orderby?: 'name' | 'id' | 'slug' | 'count';
  order?: 'asc' | 'desc';
} = {}): Promise<CategoryHierarchical[]> {
  const cacheKey = `hierarchical-categories:${JSON.stringify(params)}`;
  const cached = getCached<CategoryHierarchical[]>(cacheKey);
  if (cached) return cached;

  try {
    const allCategories = await fetchCategories({
      per_page: 100,  // Fetch all categories
      ...params
    });

    const categoriesMap = new Map<string, CategoryHierarchical>();
    const rootCategories: CategoryHierarchical[] = [];

    // First pass: Create all category objects
    allCategories.forEach(cat => {
      categoriesMap.set(cat.id, { ...cat, children: [] });
    });

    // Second pass: Build hierarchy
    allCategories.forEach(cat => {
      const category = categoriesMap.get(cat.id)!;
      if (cat.parent) {
        const parentCategory = categoriesMap.get(cat.parent);
        if (parentCategory) {
          parentCategory.children?.push(category);
        }
      } else {
        rootCategories.push(category);
      }
    });

    setCache(cacheKey, rootCategories);
    return rootCategories;
  } catch (error) {
    console.error('Error fetching hierarchical categories:', error);
    throw new WordPressAPIError(
      error instanceof Error ? `Failed to fetch hierarchical categories: ${error.message}` : 'Failed to fetch hierarchical categories'
    );
  }
}

// Get single category by ID or slug
export async function fetchCategory(identifier: string | number): Promise<CategoryBase | null> {
  const cacheKey = `category:${identifier}`;
  const cached = getCached<CategoryBase>(cacheKey);
  if (cached) return cached;

  try {
    const endpoint = typeof identifier === 'number' ? 
      `/categories/${identifier}` : 
      `/categories?slug=${identifier}`;
    
    const data = await fetchAPI<any>(endpoint);
    
    // Handle slug-based search which returns an array
    const categoryData = Array.isArray(data) ? data[0] : data;
    if (!categoryData) return null;

    const category: CategoryBase = {
      id: categoryData.ID.toString(),
      name: categoryData.name,
      slug: categoryData.slug,
      count: categoryData.post_count,
      description: categoryData.description,
      parent: categoryData.parent ? categoryData.parent.toString() : undefined,
      meta: categoryData.meta || {}
    };

    setCache(cacheKey, category);
    return category;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
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
    
    // Extract categories and category names
    const categories = Object.keys(post.categories || {}).map(key => post.categories[key].ID.toString());
    const categoryNames = Object.values(post.categories || {}).map((cat: any) => cat.name);

    const formattedPost = {
      id: post.ID,
      title: { rendered: post.title },
      content: { rendered: post.content },
      excerpt: { rendered: post.excerpt },
      date: post.date,
      slug: post.slug,
      featured_media: post.featured_image || WP_CONFIG.defaultImage,
      categories,
      categoryNames,
      featured: post.sticky || false
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
  const url = buildApiUrl('/tags', {
    ...params,
    per_page: params.per_page || WP_CONFIG.postsPerPage,
  });

  const response = await fetch(url);
  return handleResponse<Tag[]>(response);
}

// Get total pages for pagination
export async function getTotalPages(endpoint: string, perPage: number = WP_CONFIG.postsPerPage): Promise<number> {
  const url = buildApiUrl(endpoint, { per_page: perPage });
  const response = await fetch(url, { method: 'HEAD' });
  const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0', 10);
  return Math.ceil(totalPosts / perPage);
}

// Create/Update Post
export async function createOrUpdatePost(post: Partial<Post>, id?: number): Promise<Post> {
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_BASE}/posts/${id}` : `${API_BASE}/posts`;

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
    `${API_BASE}/posts/${id}`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.WORDPRESS_AUTH_TOKEN}`,
      },
      method: 'DELETE',
    }
  );
  await handleResponse<void>(response);
} 