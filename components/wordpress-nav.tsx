'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getCategories, organizeCategories } from '@/lib/wordpress-api'
import type { Locale } from '@/lib/i18n'
import { colors } from '@/lib/colors'
import { ChevronDown } from 'lucide-react'

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
        setLoading(true)
        setError(null)
        const data = await getCategories(locale)
        const organized = organizeCategories(data)
        
        // Additional frontend filtering based on locale
        if (locale === 'vi') {
          const vietnameseCourse = organized.mainCategories.find(cat => cat.slug === 'khoa-hoc-tieng-viet')
          if (vietnameseCourse) {
            organized.mainCategories = [vietnameseCourse]
            organized.subCategories = {
              [vietnameseCourse.id]: organized.subCategories[vietnameseCourse.id] || []
            }
          } else {
            organized.mainCategories = []
            organized.subCategories = {}
          }
        } else if (locale === 'zh-Hant' || locale === 'zh-Hans') {
          const chineseCourse = organized.mainCategories.find(cat => cat.slug === 'course')
          if (chineseCourse) {
            organized.mainCategories = [chineseCourse]
            organized.subCategories = {
              [chineseCourse.id]: organized.subCategories[chineseCourse.id] || []
            }
          } else {
            organized.mainCategories = []
            organized.subCategories = {}
          }
        }
        
        console.log('📁 Organized categories:', organized)
        setCategories(organized)
      } catch (err) {
        console.error('❌ Error in WordPressNav:', err)
        setError('Failed to load categories')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [locale])

  // Static menu items
  const staticItems = {
    about: { label: 'Về chúng tôi', href: '/about' },
    contact: { label: 'Liên hệ', href: '/contact' }
  }

  if (loading) {
    return (
      <nav className="flex items-center space-x-6 font-medium">
        <Link
          href={`/${locale}${staticItems.about.href}`}
          className="relative py-2 transition-colors hover:text-[#b17f4a] group"
          style={{ color: colors.darkOlive }}
        >
          {staticItems.about.label}
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b17f4a] transform scale-x-0 transition-transform group-hover:scale-x-100" />
        </Link>
        <Link
          href={`/${locale}${staticItems.contact.href}`}
          className="relative py-2 transition-colors hover:text-[#b17f4a] group"
          style={{ color: colors.darkOlive }}
        >
          {staticItems.contact.label}
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b17f4a] transform scale-x-0 transition-transform group-hover:scale-x-100" />
        </Link>
      </nav>
    )
  }

  if (error) {
    return (
      <nav className="flex items-center space-x-6 font-medium">
        <Link
          href={`/${locale}${staticItems.about.href}`}
          className="relative py-2 transition-colors hover:text-[#b17f4a] group"
          style={{ color: colors.darkOlive }}
        >
          {staticItems.about.label}
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b17f4a] transform scale-x-0 transition-transform group-hover:scale-x-100" />
        </Link>
        <Link
          href={`/${locale}${staticItems.contact.href}`}
          className="relative py-2 transition-colors hover:text-[#b17f4a] group"
          style={{ color: colors.darkOlive }}
        >
          {staticItems.contact.label}
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b17f4a] transform scale-x-0 transition-transform group-hover:scale-x-100" />
        </Link>
      </nav>
    )
  }

  return (
    <nav className="flex items-center space-x-6 font-medium">
      {/* About Us link */}
      <Link
        href={`/${locale}${staticItems.about.href}`}
        className="relative py-2 transition-colors hover:text-[#b17f4a] group"
        style={{ color: colors.darkOlive }}
      >
        {staticItems.about.label}
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b17f4a] transform scale-x-0 transition-transform group-hover:scale-x-100" />
      </Link>

      {/* WordPress Categories */}
      {categories.mainCategories.map((category: any) => (
        <div 
          key={category.id}
          className="relative"
          onMouseEnter={() => setActiveCategory(category.id)}
          onMouseLeave={() => setActiveCategory(null)}
        >
          <Link
            href={`/${locale}/category/${category.slug}`}
            className="relative py-2 transition-colors hover:text-[#b17f4a] group flex items-center"
            style={{ color: colors.darkOlive }}
          >
            {category.translatedName || category.name}
            {categories.subCategories[category.id]?.length > 0 && (
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform ${
                  activeCategory === category.id ? "rotate-180" : ""
                }`}
              />
            )}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b17f4a] transform scale-x-0 transition-transform group-hover:scale-x-100" />
          </Link>

          {categories.subCategories[category.id]?.length > 0 && activeCategory === category.id && (
            <div
              className="absolute top-full left-0 mt-1 py-2 bg-white rounded-md shadow-lg min-w-[200px] z-50"
              style={{ borderColor: colors.secondary }}
            >
              {categories.subCategories[category.id].map((subCategory: any) => (
                <Link
                  key={subCategory.id}
                  href={`/${locale}/category/${subCategory.slug}`}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                  style={{ color: colors.darkOlive }}
                >
                  {subCategory.translatedName || subCategory.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Contact link */}
      <Link
        href={`/${locale}${staticItems.contact.href}`}
        className="relative py-2 transition-colors hover:text-[#b17f4a] group"
        style={{ color: colors.darkOlive }}
      >
        {staticItems.contact.label}
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b17f4a] transform scale-x-0 transition-transform group-hover:scale-x-100" />
      </Link>
    </nav>
  )
} 