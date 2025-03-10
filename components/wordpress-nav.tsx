'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getNavigationCategories } from '@/lib/wordpress/api'
import type { Locale } from '@/lib/i18n'
import { colors } from '@/lib/colors'

interface WordPressNavProps {
  locale: Locale
}

export function WordPressNav({ locale }: WordPressNavProps) {
  const pathname = usePathname()
  const [categories, setCategories] = useState<any>({ mainCategories: [], subCategories: {} })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<number | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getNavigationCategories()
        setCategories(data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching categories:', err)
        setError('Failed to load categories')
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <ul className="flex flex-wrap">
          {categories.mainCategories.map((category: any) => (
            <li 
              key={category.id}
              className="relative group"
              onMouseEnter={() => setActiveCategory(category.id)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <Link
                href={`/${locale}/category/${category.slug}`}
                className={`block px-4 py-2 hover:text-[#b17f4a] transition-colors ${
                  pathname.includes(category.slug) ? 'text-[#b17f4a]' : ''
                }`}
              >
                {category.name}
              </Link>

              {/* Dropdown for subcategories */}
              {categories.subCategories[category.id]?.length > 0 && (
                <div 
                  className={`absolute left-0 mt-0 w-48 bg-white shadow-lg rounded-b-lg transition-opacity duration-150 ${
                    activeCategory === category.id ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                >
                  <ul className="py-2">
                    {categories.subCategories[category.id].map((subCategory: any) => (
                      <li key={subCategory.id}>
                        <Link
                          href={`/${locale}/category/${subCategory.slug}`}
                          className={`block px-4 py-2 hover:bg-gray-100 ${
                            pathname.includes(subCategory.slug) ? 'text-[#b17f4a]' : ''
                          }`}
                        >
                          {subCategory.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
} 