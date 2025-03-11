"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { colors } from '@/lib/colors'
import { useTranslations } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { Home, Menu, X, ChevronRight, BookOpen, Library, GraduationCap, Activity, Newspaper, Phone } from 'lucide-react'
import { getCategories, organizeCategories, TranslatedCategory } from "@/lib/wordpress-api"

interface NavMenuItem {
  label: string
  href: string
  icon?: React.ElementType
  children?: NavMenuItem[]
}

interface MobileNavProps {
  locale: Locale
}

export function MobileNav({ locale }: MobileNavProps) {
  const pathname = usePathname()
  const { translate } = useTranslations(locale)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [activeSubmenu, setActiveSubmenu] = React.useState<string | null>(null)
  const [navItems, setNavItems] = React.useState<NavMenuItem[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  
  // Cache for categories
  const categoriesCache = React.useRef<{
    [key: string]: {
      items: NavMenuItem[]
      timestamp: number
    }
  }>({})

  // Get translated static items
  const staticNavItems = React.useMemo(() => [
    { 
      href: '/', 
      label: translate('home', 'common'),
      icon: Home 
    },
    { 
      href: '/about', 
      label: translate('about', 'common'),
      icon: Home 
    },
    { 
      href: '/contact', 
      label: translate('contact', 'common'),
      icon: Phone 
    },
  ], [translate])

  // Main items for bottom navigation
  const mainNavItems = React.useMemo(() => [
    { href: '/', label: translate('home', 'common'), icon: Home },
    { href: '/about', label: translate('about', 'common'), icon: Home },
    { href: '/contact', label: translate('contact', 'common'), icon: Phone },
  ], [translate])

  React.useEffect(() => {
    let isMounted = true;

    async function fetchCategories() {
      try {
        // Check cache first
        const cached = categoriesCache.current[locale]
        const now = Date.now()
        if (cached && (now - cached.timestamp) < 5 * 60 * 1000) { // 5 minutes cache
          console.log('📱 Using cached categories for locale:', locale)
          setNavItems([
            staticNavItems[0],
            staticNavItems[1],
            ...cached.items,
            staticNavItems[2]
          ])
          setIsLoading(false)
          return
        }

        if (!isMounted) return;
        setIsLoading(true)
        console.log('🔄 Fetching categories for locale:', locale)
        const categories = await getCategories(locale)
        
        if (!isMounted) return;
        
        const { mainCategories, subCategories } = organizeCategories(categories)

        // Define the order of top-level categories
        const topLevelCategories = [
          'activities',
          'blogs',
          'course',
          'library',
          'vietnamese-tests'
        ]

        // Filter and sort main categories
        const filteredMainCategories = mainCategories
          .filter(cat => topLevelCategories.includes(cat.slug))
          .sort((a, b) => {
            const aIndex = topLevelCategories.indexOf(a.slug)
            const bIndex = topLevelCategories.indexOf(b.slug)
            return aIndex - bIndex
          })

        // Convert WordPress categories to menu items with proper children handling
        const wpMenuItems = filteredMainCategories.map(cat => {
          const categoryChildren = subCategories[cat.id] || [];
          
          return {
            label: cat.translatedName || cat.name,
            href: `/category/${cat.slug}`,
            icon: getIconForCategory(cat.slug),
            children: categoryChildren.length > 0 ? categoryChildren.map(subCat => ({
              label: subCat.translatedName || subCat.name,
              href: `/category/${subCat.slug}`,
            })) : []  // Always return an array, empty if no children
          }
        })

        // Cache the menu items
        categoriesCache.current[locale] = {
          items: wpMenuItems,
          timestamp: now
        }

        if (!isMounted) return;

        // Add WordPress categories between Home and Contact
        setNavItems([
          staticNavItems[0], // Home
          staticNavItems[1], // About
          ...wpMenuItems,
          staticNavItems[2], // Contact
        ])
      } catch (error) {
        console.error('❌ Error fetching categories:', error)
        if (isMounted) {
          setNavItems(staticNavItems)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchCategories()

    return () => {
      isMounted = false;
    }
  }, [locale, staticNavItems])

  // Helper function to get appropriate icon for each category
  const getIconForCategory = (slug: string) => {
    switch (slug) {
      case 'activities':
        return Activity
      case 'course':
        return GraduationCap
      case 'library':
        return Library
      case 'blogs':
        return BookOpen
      default:
        return Newspaper
    }
  }

  // Reset active submenu when language changes
  React.useEffect(() => {
    setActiveSubmenu(null)
  }, [locale])

  const handleSubmenuClick = (label: string) => {
    console.log('📱 Toggle submenu:', label, 'Current:', activeSubmenu)
    setActiveSubmenu(activeSubmenu === label ? null : label)
  }

  if (isLoading) {
    return (
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t"
        style={{ 
          backgroundColor: colors.lightCream,
          borderColor: colors.secondary 
        }}
      >
        <div className="grid grid-cols-4 h-16 font-medium">
          {mainNavItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="flex flex-col items-center justify-center space-y-1"
                style={{ color: colors.darkOlive }}
              >
                {Icon && <Icon className="h-5 w-5" />}
                <span className="text-xs">{item.label}</span>
              </Link>
            )
          })}
          <div className="flex flex-col items-center justify-center space-y-1">
            <div className="h-5 w-5 bg-gray-200 animate-pulse rounded" />
            <div className="h-3 w-12 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      </nav>
    )
  }

  return (
    <>
      {/* Full menu overlay */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 flex flex-col bg-white"
          style={{ backgroundColor: colors.lightCream }}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b" style={{ borderColor: colors.secondary }}>
            <span className="text-lg font-medium" style={{ color: colors.darkOlive }}>
              {translate('menu', 'common')}
            </span>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              style={{ color: colors.darkOlive }}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col p-4">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === `/${locale}${item.href}`
                const isSubmenuOpen = activeSubmenu === item.label
                const hasChildren = item.children && item.children.length > 0
                
                return (
                  <div key={item.label} className="border-b last:border-b-0" style={{ borderColor: colors.secondary }}>
                    <div className="flex items-center justify-between py-3">
                      <Link
                        href={`/${locale}${item.href}`}
                        onClick={() => !hasChildren && setIsMenuOpen(false)}
                        className={`flex items-center space-x-3 text-lg font-medium flex-grow ${
                          isActive ? 'text-[#b17f4a]' : ''
                        }`}
                        style={{ color: isActive ? colors.primary : colors.darkOlive }}
                      >
                        {Icon && <Icon className="h-5 w-5 shrink-0" />}
                        <span>{item.label}</span>
                      </Link>
                      {hasChildren && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSubmenuClick(item.label);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-2"
                          style={{ color: colors.darkOlive }}
                        >
                          <ChevronRight
                            className={`h-5 w-5 transition-transform duration-200 ${
                              isSubmenuOpen ? 'rotate-90' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>
                    {hasChildren && isSubmenuOpen && item.children && (
                      <div className="ml-8 mb-3 space-y-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={`/${locale}${child.href}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-2 text-base transition-colors hover:text-[#b17f4a]"
                            style={{ color: colors.darkOlive }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Bottom navigation */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t bg-white"
        style={{ 
          backgroundColor: colors.lightCream,
          borderColor: colors.secondary 
        }}
      >
        <div className="grid grid-cols-4 h-16 font-medium">
          {mainNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === `/${locale}${item.href}`
            
            return (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                  isActive ? 'text-[#b17f4a]' : ''
                }`}
                style={{ color: isActive ? colors.primary : colors.darkOlive }}
              >
                {Icon && <Icon className="h-5 w-5" />}
                <span className="text-xs">{item.label}</span>
              </Link>
            )
          })}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center justify-center space-y-1"
            style={{ color: colors.darkOlive }}
          >
            <Menu className="h-5 w-5" />
            <span className="text-xs">
              {translate('menu', 'common')}
            </span>
          </button>
        </div>
      </nav>
    </>
  )
}

