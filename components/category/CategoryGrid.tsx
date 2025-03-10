'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { WPPost } from '@/lib/wordpress-api'
import { colors } from '@/lib/colors'
import { getTranslation } from '@/lib/translations'

interface CategoryGridProps {
  posts: WPPost[]
  locale: string
}

export function CategoryGrid({ posts, locale }: CategoryGridProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => {
        // Get featured image from either WordPress.com or self-hosted WordPress
        const featuredImage = 
          post.jetpack_featured_media_url || 
          post._embedded?.['wp:featuredmedia']?.[0]?.source_url

        return (
          <article
            key={post.id}
            className="overflow-hidden rounded-lg shadow-lg transition-transform hover:-translate-y-1 bg-white"
          >
            {featuredImage && (
              <div className="relative h-48 w-full">
                <Image
                  src={featuredImage}
                  alt={post.title.rendered}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <div className="p-6">
              <h3 
                className="mb-2 text-xl font-semibold line-clamp-2 hover:text-[#b17f4a]"
                style={{ color: colors.darkOlive }}
              >
                <Link
                  href={`/${locale}/post/${post.slug}`}
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
              </h3>
              <div className="mb-2 text-sm text-gray-600">
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </div>
              <div 
                className="mb-4 text-sm line-clamp-3"
                style={{ color: colors.darkOlive }}
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
              <Link
                href={`/${locale}/post/${post.slug}`}
                className="inline-block rounded-md px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
                style={{ 
                  backgroundColor: colors.secondary,
                  color: colors.lightCream
                }}
              >
                {getTranslation('readMore', locale)}
              </Link>
            </div>
          </article>
        )
      })}
    </div>
  )
} 