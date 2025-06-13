'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getCategories, organizeCategories, TranslatedCategory } from '@/lib/wordpress-api'
import type { Locale } from '@/lib/i18n'
import { useTranslations } from '@/lib/i18n'
import { colors } from '@/lib/colors'
import { ChevronDown } from 'lucide-react'
import React from 'react'
interface WordPressNavProps {
  locale: Locale
}

export function WordPressNav({ locale }: WordPressNavProps) {
  const pathname = usePathname()
  const { translate } = useTranslations(locale)
  const [categories, setCategories] = useState<{
    mainCategories: TranslatedCategory[],
    subCategories: { [key: number]: TranslatedCategory[] }
  }>({ mainCategories: [], subCategories: {} })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<number | string | null>(null)

  // Get translated static items
  const staticItems = {
    about: { 
      label: translate('about', 'common'), 
      href: '/#courses' // Updated to point to the courses section
    },
    teacherTeam: {
      label: translate('Coach Team', 'common') || 'Coach Team',
      href: '/teacher-team'
    },
    course: {
      label: translate('courses', 'common') || 'Courses',
      href: '/courses'
    },
    examInfo: {
      label: (translate('vietnameseExam', 'common') || 'Vietnamese Exam') + ' ',
      href: '/exam-info'
    },
    contact: { 
      label: translate('contact', 'common'), 
      href: '/#contact' 
    }
  }

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true)
        setError(null)
        const data = await getCategories(locale)
        
        // Organize categories into main categories and subcategories
        const mainCategories = data.filter(cat => cat.parent === 0)
        const subCategories = data.reduce((acc, cat) => {
          if (cat.parent !== 0) {
            if (!acc[cat.parent]) {
              acc[cat.parent] = []
            }
            acc[cat.parent].push(cat)
          }
          return acc
        }, {} as { [key: number]: TranslatedCategory[] })

        setCategories({ mainCategories, subCategories })
        console.log('Navigation categories:', { mainCategories, subCategories })
      } catch (err) {
        console.error('❌ Error in WordPressNav:', err)
        setError('Failed to load categories')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [locale])

  if (loading) {
    return (
      <nav className="flex items-center space-x-8 font-medium">
        <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
      </nav>
    )
  }

  if (error) {
    return (
      <nav className="flex items-center space-x-8 font-medium">
        <div className="text-red-500">Failed to load navigation</div>
      </nav>
    )
  }

  // Updated order of categories to match desired sequence
  const topLevelCategories = [
    'course',        // Khoá học
    'library',       // Thư viện
    'vietnamese-tests', // Kỳ thi năng lực tiếng Việt
    'blogs'          // Blog
  ]

  const filteredMainCategories = categories.mainCategories
    .filter(cat => topLevelCategories.includes(cat.slug))
    .sort((a, b) => {
      const aIndex = topLevelCategories.indexOf(a.slug)
      const bIndex = topLevelCategories.indexOf(b.slug)
      return aIndex - bIndex
    })

  return (
    <nav className="flex items-center space-x-8 font-medium">
      {/* About Us link */}
      <Link
        href={`/${locale}${staticItems.about.href}`}
        className="relative py-2 transition-colors hover:text-[#b17f4a] group"
        style={{ color: colors.darkOlive }}
      >
        {staticItems.about.label}
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b17f4a] transform scale-x-0 transition-transform group-hover:scale-x-100" />
      </Link>

      {/* Course link with dropdown */}
      <div 
        className="relative"
        onMouseEnter={() => setActiveCategory('courses')}
        onMouseLeave={() => setActiveCategory(null)}
      >
        <Link
          href={`/${locale}${staticItems.course.href}`}
          className="relative py-2 transition-colors hover:text-[#b17f4a] group flex items-center"
          style={{ color: colors.darkOlive, marginRight: '2rem' }}
        >
          {staticItems.course.label}
          <ChevronDown
            className={`ml-1 h-4 w-4 transition-transform ${
              activeCategory === 'courses' ? "rotate-180" : ""
            }`}
          />
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b17f4a] transform scale-x-0 transition-transform group-hover:scale-x-100" />
        </Link>

        {activeCategory === 'courses' && (
          <div
            className="absolute top-full left-0 mt-1 py-2 bg-white rounded-md shadow-lg min-w-[160px] z-50"
            style={{ borderColor: colors.secondary }}
          >
            {['beginner', 'intermediate', 'advanced', 'certification', 'corporate', 'private'].map((levelKey) => (
              <Link
                key={levelKey}
                href={`/${locale}${staticItems.course.href}?level=${encodeURIComponent(levelKey)}`}
                className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors whitespace-nowrap"
                style={{ color: colors.darkOlive }}
              >
                {translate(levelKey, 'courseLevels')}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* WordPress Categories - Now in the correct order */}
      {filteredMainCategories
        .filter(cat => cat.slug !== 'vietnamese-tests')
        .map((category) => {
          // Use /courses for the course category, others keep using /category/slug
          const categoryHref = category.slug === 'course'
            ? `/${locale}/courses`
            : `/${locale}/category/${category.slug}`;
            
          return (
            <span key={category.id} className="contents">
              <div 
                className="relative"
                onMouseEnter={() => setActiveCategory(category.id)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <Link
                  href={categoryHref}
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
                    {categories.subCategories[category.id].map((subCategory) => (
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
              
              {/* Exam Info Link - Placed after Library */}
              {category.slug === 'library' && (
                <Link
                  href={`/${locale}${staticItems.examInfo.href}`}
                  className="relative py-2 transition-colors hover:text-[#b17f4a] group"
                  style={{ color: colors.darkOlive, marginRight: '2rem', marginLeft: '2rem' }}
                >
                  {staticItems.examInfo.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b17f4a] transform scale-x-0 transition-transform group-hover:scale-x-100" />
                </Link>
              )}
            </span>
          );
        })}
        
        {/* Vietnamese Tests */}
        {filteredMainCategories
          .filter(cat => cat.slug === 'vietnamese-tests')
          .map((category) => (
            <span key={category.id} className="contents">
              <div 
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
                    {categories.subCategories[category.id].map((subCategory) => (
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
            </span>
          ))}
        
        {/* Teacher Team link - Moved after Vietnamese Tests */}
        <Link
          href={`/${locale}${staticItems.teacherTeam.href}`}
          className="relative py-2 transition-colors hover:text-[#b17f4a] group"
          style={{ color: colors.darkOlive }}
        >
          {staticItems.teacherTeam.label}
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b17f4a] transform scale-x-0 transition-transform group-hover:scale-x-100" />
        </Link>

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