import { Post, Category, Tag, Media } from './types';
import { WP_CONFIG } from './config';
import { Locale } from '@/lib/i18n'

const API_BASE = WP_CONFIG.apiBase;
const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

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
  tags?: string[] | string | number;
  search?: string;
  lang?: string;
} = {}): Promise<Post[]> {
  const cacheKey = `posts:${JSON.stringify(params)}`;
  const cached = getCached<Post[]>(cacheKey);
  if (cached) return cached;

  const searchParams = new URLSearchParams();
  // Use minimal fields to improve performance
  searchParams.append('fields', 'ID,date,title,content,excerpt,slug,featured_image,categories');
  searchParams.append('number', (params.per_page || WP_CONFIG.postsPerPage).toString());
  
  if (params.page) searchParams.append('page', params.page.toString());
  if (params.search) searchParams.append('search', params.search);
  if (params.lang) searchParams.append('lang', params.lang);
  // Note: WP.com API posts endpoint doesn't filter by tags directly using this helper
  // We will filter by tags client-side after fetching when params.tags is provided.

  try {
    const requestUrl = `${API_BASE}/posts?${searchParams}`;
    console.log('Fetching posts from URL:', requestUrl);
    
    const response = await fetch(requestUrl, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    
    if (!data.posts || data.posts.length === 0) {
      console.log('No posts found for params:', params);
      return [];
    }

    let posts = data.posts.map((post: {
      ID: number;
      date: string;
      title: string;
      content: string;
      excerpt: string;
      slug: string;
      featured_image?: string;
      featured_media?: { source_url: string };
      categories: Record<string, { ID: number; name: string }>;
      tags?: Record<string, { ID: number; name: string }>;
      sticky?: boolean;
    }) => {
      // Handle categories from WordPress.com API response
      const postCategories = post.categories || {};
      let categoryIds: string[] = [];
      let categoryNames: string[] = [];

      // Process categories from WordPress.com API
      if (typeof postCategories === 'object') {
        Object.values(postCategories).forEach((category) => {
          if (category && typeof category === 'object') {
            categoryIds.push(category.ID?.toString() || '');
            categoryNames.push(category.name || '');
          }
        });
      }

      // Process tags if present
      const postTags = (post as any).tags || {};
      let tagIds: string[] = [];
      let tagNames: string[] = [];
      if (typeof postTags === 'object') {
        Object.values(postTags).forEach((tag: any) => {
          if (tag && typeof tag === 'object') {
            tagIds.push(tag.ID?.toString() || '');
            tagNames.push(tag.name || '');
          }
        });
      }

      // Ensure we have the featured image
      const featuredImage = post.featured_image || 
                          (post.featured_media && typeof post.featured_media === 'object' ? 
                           post.featured_media.source_url : null) || 
                          WP_CONFIG.defaultImage;

      return {
        id: post.ID,
        title: { rendered: post.title },
        content: { rendered: post.content },
        excerpt: { rendered: post.excerpt },
        date: post.date,
        slug: post.slug,
        featured_media: featuredImage,
        categories: categoryIds,
        categoryNames,
        tags: tagIds,
        tagNames,
        featured: post.sticky || false
      };
    });

    // Filter posts by category if specified
    if (params.categories) {
      const categoryInput = Array.isArray(params.categories) 
        ? params.categories[0].toString()
        : params.categories.toString();
      
      console.log('Filtering posts by category:', categoryInput);
      
      posts = posts.filter((post) => {
        const postHasCategory = post.categories.some(catId => 
          catId === categoryInput || 
          post.categoryNames.some(name => name.toLowerCase() === categoryInput.toLowerCase())
        );
        console.log(`Post ${post.id} (${post.title.rendered}) has category ${categoryInput}:`, postHasCategory);
        return postHasCategory;
      });
      
      console.log('Posts after category filtering:', posts.length);
    }

    // Filter posts by tag if specified
    if (params.tags) {
      const tagInput = Array.isArray(params.tags)
        ? params.tags[0].toString()
        : params.tags.toString();
      posts = posts.filter(post => {
        const hasTag = (post as any).tags?.some((t: string) => t === tagInput) ||
          (post as any).tagNames?.some((name: string) => name.toLowerCase() === tagInput.toLowerCase());
        return hasTag;
      });
      console.log('Posts after tag filtering:', posts.length);
    }

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

// Categories API
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
    
    const response = await fetch(requestUrl, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Categories API Response:', data);
    
    if (!data.categories) {
      console.log('No categories found');
      return [];
    }

    const categories = data.categories.map(category => ({
      id: category.ID.toString(),
      name: category.name,
      slug: category.slug,
      count: category.post_count || 0,
      description: category.description || '',
      parent: category.parent ? category.parent.toString() : undefined,
      meta: {
        links: category.meta?.links || {},
      }
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
  try {
    // Get all posts to ensure we can find the exact match
    const data = await fetchAPI<{ posts: any[] }>('/posts');
    
    // Find the exact post that matches our slug
    const post = data.posts.find(p => {
      const postSlug = p.slug;
      const decodedInputSlug = decodeURIComponent(slug);
      const decodedPostSlug = decodeURIComponent(postSlug);
      
      // Log for debugging
      console.log('Comparing slugs:', {
        postSlug,
        decodedPostSlug,
        inputSlug: slug,
        decodedInputSlug
      });
      
      // Try all possible combinations of encoded/decoded slugs
      return postSlug === slug || // Direct match
             postSlug === decodedInputSlug || // Match with decoded input
             decodedPostSlug === decodedInputSlug; // Match both decoded
    });
    
    if (!post) {
      console.log('No post found for slug:', slug);
      return null;
    }
    
    // Extract categories and category names
    const categories = Object.keys(post.categories || {}).map(key => post.categories[key].ID.toString());
    const categoryNames = Object.values(post.categories || {}).map((cat: any) => cat.name);

    // Extract tags and tag names if present (WordPress.com API returns an object)
    const tagsObj = post.tags || {};
    const tags = Object.keys(tagsObj || {}).map((key: any) => {
      try {
        return (tagsObj as any)[key].ID.toString();
      } catch {
        return '';
      }
    }).filter(Boolean);
    const tagNames = Object.values(tagsObj || {}).map((t: any) => t?.name).filter(Boolean);

    const formattedPost = {
      id: post.ID,
      title: { rendered: post.title },
      content: { rendered: post.content },
      excerpt: { rendered: post.excerpt },
      date: post.date,
      slug: post.slug, // Keep the original slug from WordPress
      featured_media: post.featured_image || WP_CONFIG.defaultImage,
      categories,
      categoryNames,
      tags,
      tagNames,
      featured: post.sticky || false
    };

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

interface WPCategory {
  id: number
  name: string
  slug: string
  description: string
  parent: number
  count: number
}

interface WPPost {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  slug: string
  date: string
  modified: string
  featured_media: number
  categories: number[]
  tags: number[]
}

// Fetch all categories
export async function getCategories(): Promise<WPCategory[]> {
  const res = await fetch(`${WP_API_URL}/wp-json/wp/v2/categories?per_page=100`)
  const categories = await res.json()
  return categories
}

// Fetch posts by category
export async function getPostsByCategory(categoryId: number, page = 1, perPage = 10): Promise<WPPost[]> {
  const res = await fetch(
    `${WP_API_URL}/wp-json/wp/v2/posts?categories=${categoryId}&page=${page}&per_page=${perPage}`
  )
  const posts = await res.json()
  return posts
}

// Fetch single post by slug
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const res = await fetch(`${WP_API_URL}/wp-json/wp/v2/posts?slug=${slug}`)
  const posts = await res.json()
  return posts[0] || null
}

// Get category tree (organized with parent/child relationships)
export function getCategoryTree(categories: WPCategory[]): WPCategory[] {
  const categoryMap = new Map<number, WPCategory & { children?: WPCategory[] }>()
  const roots: WPCategory[] = []

  // First pass: create map of categories
  categories.forEach(category => {
    categoryMap.set(category.id, { ...category, children: [] })
  })

  // Second pass: organize into tree structure
  categories.forEach(category => {
    const node = categoryMap.get(category.id)
    if (node) {
      if (category.parent === 0) {
        roots.push(node)
      } else {
        const parent = categoryMap.get(category.parent)
        if (parent && parent.children) {
          parent.children.push(node)
        }
      }
    }
  })

  return roots
}

// Get navigation menu structure based on categories
export async function getNavigationCategories(): Promise<{
  mainCategories: WPCategory[]
  subCategories: Record<number, WPCategory[]>
}> {
  const categories = await getCategories()
  const mainCategories = categories.filter(cat => cat.parent === 0)
  const subCategories: Record<number, WPCategory[]> = {}
  
  mainCategories.forEach(mainCat => {
    subCategories[mainCat.id] = categories.filter(cat => cat.parent === mainCat.id)
  })

  return {
    mainCategories,
    subCategories
  }
} 