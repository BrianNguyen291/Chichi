export interface RenderedContent {
  rendered: string;
  protected?: boolean;
}

export interface Post {
  id: number;
  date: string;
  title: RenderedContent;
  content: RenderedContent;
  excerpt: RenderedContent;
  slug: string;
  featured_media: string;
  categories: string[];
  categoryNames: string[];
  author?: {
    name: string;
    avatar?: string;
  };
  meta?: {
    readingTime?: number;
    views?: number;
    likes?: number;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  description?: string;
  parent?: number;
}

export interface Tag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: 'post_tag';
  meta: Record<string, any>;
  language?: string;
  translations?: Record<string, number>;
  acf?: Record<string, any>;
}

export interface Media {
  id: number;
  date: string;
  date_gmt: string;
  guid: RenderedContent;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: 'publish' | 'future' | 'draft' | 'pending' | 'private';
  type: 'attachment';
  link: string;
  title: RenderedContent;
  author: number;
  comment_status: 'open' | 'closed';
  ping_status: 'open' | 'closed';
  template: string;
  meta: Record<string, any>;
  description: RenderedContent;
  caption: RenderedContent;
  alt_text: string;
  media_type: 'image' | 'file';
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    sizes: {
      [key: string]: {
        source_url: string;
        width: number;
        height: number;
      };
    };
  };
  post: number;
  source_url: string;
  language?: string;
  translations?: Record<string, number>;
  acf?: Record<string, any>;
}

export interface WPError {
  code: string;
  message: string;
  data?: any;
}

export type ImageSize = 'thumbnail' | 'medium' | 'large' | 'full'; 