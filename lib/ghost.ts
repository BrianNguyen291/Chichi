import GhostContentAPI from '@tryghost/content-api';
import { PostOrPage, PostsOrPages, Tags, Authors } from '@tryghost/content-api';

// Initialize Ghost Content API
const api = new GhostContentAPI({
  url: process.env.GHOST_API_URL || '',
  key: process.env.GHOST_CONTENT_API_KEY || '',
  version: 'v5.0'
});

// Types
export interface Post {
  id: string;
  slug: string;
  title: string;
  html: string;
  excerpt: string;
  feature_image: string | null;
  featured: boolean;
  published_at: string;
  tags: Tag[];
  authors: Author[];
  reading_time: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  profile_image: string | null;
  bio: string | null;
  website: string | null;
  location: string | null;
}

// Helper function to transform PostOrPage to Post
function transformPost(post: any): Post {
  return {
    id: post.id || '',
    slug: post.slug || '',
    title: post.title || '',
    html: post.html || '',
    excerpt: post.excerpt || '',
    feature_image: post.feature_image || null,
    featured: Boolean(post.featured),
    published_at: post.published_at || new Date().toISOString(),
    tags: (post.tags || []).map((tag: any) => ({
      id: tag.id || '',
      name: tag.name || '',
      slug: tag.slug || '',
      description: tag.description || null
    })),
    authors: (post.authors || []).map((author: any) => ({
      id: author.id || '',
      name: author.name || '',
      slug: author.slug || '',
      profile_image: author.profile_image || null,
      bio: author.bio || null,
      website: author.website || null,
      location: author.location || null
    })),
    reading_time: post.reading_time || 0
  };
}

// Fetch all posts for a specific language
export async function getPosts(locale: string, limit: number = 10, page: number = 1): Promise<Post[]> {
  try {
    console.log('Ghost API Configuration:', {
      url: process.env.GHOST_API_URL,
      hasKey: !!process.env.GHOST_CONTENT_API_KEY,
      keyLength: process.env.GHOST_CONTENT_API_KEY?.length,
      locale,
      limit,
      page
    });

    console.log(`Attempting to fetch posts for locale: ${locale}`);
    const posts = await api.posts.browse({
      limit,
      page,
      filter: `tag:${locale}`,
      include: ['tags', 'authors']
    });
    console.log(`Successfully fetched ${posts.length} posts for locale: ${locale}`);
    console.log('Post titles:', posts.map(p => p.title));
    return posts.map(transformPost);
  } catch (err) {
    console.error('Error fetching posts:', err);
    console.error('Full error details:', {
      message: err.message,
      status: err.status,
      code: err.code,
      context: err.context
    });
    console.error('API Configuration:', {
      url: process.env.GHOST_API_URL,
      hasKey: !!process.env.GHOST_CONTENT_API_KEY,
      keyLength: process.env.GHOST_CONTENT_API_KEY?.length,
      locale,
      limit,
      page
    });
    return [];
  }
}

// Fetch a single post by slug
export async function getPost(slug: string, locale: string): Promise<Post | null> {
  try {
    console.log(`Fetching post with slug: ${slug} for locale: ${locale}`);
    const post = await api.posts.read({ 
      slug,
      include: ['tags', 'authors']
    });
    console.log(`Found post: ${post.title}`);
    return transformPost(post);
  } catch (err) {
    console.error(`Error fetching post with slug ${slug}:`, err);
    return null;
  }
}

// Fetch posts by tag
export async function getPostsByTag(tag: string, locale: string, limit: number = 10): Promise<Post[]> {
  try {
    const posts = await api.posts.browse({
      limit,
      filter: `tag:${tag}+tag:${locale}`,
      include: ['tags', 'authors']
    });
    return posts.map(transformPost);
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Fetch all tags
export async function getTags(): Promise<Tag[]> {
  try {
    const tags = await api.tags.browse({
      limit: 'all'
    });
    return tags.map(tag => ({
      id: tag.id || '',
      name: tag.name || '',
      slug: tag.slug || '',
      description: tag.description
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Fetch all authors
export async function getAuthors(): Promise<Author[]> {
  try {
    const authors = await api.authors.browse({
      limit: 'all'
    });
    return authors.map(author => ({
      id: author.id || '',
      name: author.name || '',
      slug: author.slug || '',
      profile_image: author.profile_image,
      bio: author.bio,
      website: author.website,
      location: author.location
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Fetch featured posts
export async function getFeaturedPosts(locale: string, limit: number = 3): Promise<Post[]> {
  try {
    console.log(`Fetching featured posts for locale: ${locale}`);
    const posts = await api.posts.browse({
      limit,
      filter: `featured:true+tag:${locale}`,
      include: ['tags', 'authors']
    });
    console.log(`Found ${posts.length} featured posts for locale: ${locale}`);
    return posts.map(transformPost);
  } catch (err) {
    console.error('Error fetching featured posts:', err);
    console.error('API Configuration:', {
      url: process.env.GHOST_API_URL,
      hasKey: !!process.env.GHOST_CONTENT_API_KEY,
      locale,
      limit
    });
    return [];
  }
}

// Fetch related posts
export async function getRelatedPosts(postId: string, locale: string, limit: number = 3): Promise<Post[]> {
  try {
    const post = await api.posts.read({ id: postId });
    if (!post || !post.tags) return [];
    
    const tagSlugs = post.tags.map(tag => tag.slug).join(',');
    const posts = await api.posts.browse({
      limit,
      filter: `tag:[${tagSlugs}]+tag:${locale}+id:-${postId}`,
      include: ['tags', 'authors']
    });
    return posts.map(transformPost);
  } catch (err) {
    console.error(err);
    return [];
  }
} 