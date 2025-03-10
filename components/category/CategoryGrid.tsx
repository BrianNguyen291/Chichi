'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { WPPost } from '@/lib/wordpress-api'
import { colors } from '@/lib/colors'

interface CategoryGridProps {
  posts: WPPost[]
  locale: string
}

export function CategoryGrid({ posts, locale }: CategoryGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article
          key={post.id}
          className="overflow-hidden rounded-lg shadow-lg transition-transform hover:-translate-y-1"
        >
          {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
            <div className="relative h-48 w-full">
              <Image
                src={post._embedded['wp:featuredmedia'][0].source_url}
                alt={post.title.rendered}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-4">
            <h3 
              className="mb-2 text-xl font-semibold line-clamp-2"
              style={{ color: colors.darkOlive }}
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div 
              className="mb-4 text-sm line-clamp-3"
              style={{ color: colors.darkOlive }}
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
            <Link
              href={`/${locale}/post/${post.slug}`}
              className="inline-block rounded-md px-4 py-2 text-sm font-medium transition-colors"
              style={{ 
                backgroundColor: colors.secondary,
                color: colors.lightCream
              }}
            >
              Read More
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
} 