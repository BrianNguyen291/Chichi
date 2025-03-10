import { Locale } from '@/lib/i18n'

export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiData<T> {
  id: number
  attributes: T
}

export interface StrapiImage {
  data: {
    id: number
    attributes: {
      name: string
      alternativeText: string | null
      caption: string | null
      width: number
      height: number
      formats: {
        thumbnail: {
          url: string
          width: number
          height: number
        }
        small: {
          url: string
          width: number
          height: number
        }
        medium: {
          url: string
          width: number
          height: number
        }
        large: {
          url: string
          width: number
          height: number
        }
      }
      url: string
    }
  } | null
}

export interface StrapiFile {
  data: {
    id: number
    attributes: {
      name: string
      alternativeText: string | null
      caption: string | null
      url: string
      mime: string
      size: number
    }
  } | null
}

export interface StrapiTag {
  id: number
  attributes: {
    name: string
    slug: string
    type: 'level' | 'format' | 'type' | 'category' | 'topic'
    createdAt: string
    updatedAt: string
    locale: Locale
  }
}

export interface StrapiCourse {
  title: string
  slug: string
  description: string
  longDescription: string
  image: StrapiImage
  level: 'beginner' | 'intermediate' | 'advanced'
  format: 'online' | 'offline'
  type: 'individual' | 'business'
  price: string
  duration: string
  schedule: string
  startDate: string
  location: string
  instructor: string
  maxStudents: number
  prerequisites: string
  materials: string
  tags: {
    data: StrapiTag[]
  }
  syllabus: {
    week: number
    title: string
    topics: string[]
  }[]
  createdAt: string
  updatedAt: string
  locale: Locale
}

export interface StrapiLibraryResource {
  title: string
  slug: string
  description: string
  content: string
  image: StrapiImage
  file: StrapiFile
  type: 'practice_material' | 'vocabulary' | 'grammar'
  level: 'beginner' | 'intermediate' | 'advanced'
  tags: {
    data: StrapiTag[]
  }
  featured: boolean
  createdAt: string
  updatedAt: string
  locale: Locale
}

export interface StrapiVietnameseExam {
  title: string
  slug: string
  description: string
  content: string
  image: StrapiImage
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
  examDate: string
  registrationDeadline: string
  fee: string
  location: string
  requirements: string
  materials: {
    data: StrapiData<StrapiLibraryResource>[]
  }
  featured: boolean
  createdAt: string
  updatedAt: string
  locale: Locale
}

export interface StrapiActivity {
  title: string
  slug: string
  description: string
  content: string
  image: StrapiImage
  date: string
  location: string
  category: 'cultural_event' | 'language_practice' | 'workshop' | 'field_trip'
  featured: boolean
  tags: {
    data: StrapiTag[]
  }
  createdAt: string
  updatedAt: string
  locale: Locale
}

export interface StrapiBlogPost {
  title: string
  slug: string
  description: string
  content: string
  image: StrapiImage
  author: string
  publishDate: string
  categories: {
    data: StrapiTag[]
  }
  featured: boolean
  createdAt: string
  updatedAt: string
  locale: Locale
}

export interface StrapiPage {
  title: string
  slug: string
  content: string
  seoTitle: string
  seoDescription: string
  featuredImage: StrapiImage
  createdAt: string
  updatedAt: string
  locale: Locale
} 