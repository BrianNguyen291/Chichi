"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { colors } from '@/lib/colors'
import { useTranslations } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { Home, BookOpen, Library, GraduationCap, Activity, Newspaper, Phone, Menu, X } from 'lucide-react'
import Image from "next/image"

interface MobileNavProps {
  locale: Locale
}

export function MobileNav({ locale }: MobileNavProps) {
  const pathname = usePathname()
  const { translate } = useTranslations(locale)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const categories = await getCategories(locale)
        const { mainCategories, subCategories } = organizeCategories(categories)

        // Convert WordPress categories to menu items
        const wpMenuItems = mainCategories.map(cat => ({
          label: cat.name,
          href: `/category/${cat.slug}`,
          ...(subCategories[cat.id] && {
            children: subCategories[cat.id].map(subCat => ({
              label: subCat.name,
              href: `/category/${subCat.slug}`,
            })),
          }),
        }))

        // Combine static and WordPress menu items
        setNavItems([...staticNavItems, ...wpMenuItems])
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [locale])

  // Main items for bottom navigation - use first 4 items
  const mainNavItems = navItems.slice(0, 4)

  const handleSubmenuClick = (label: string) => {
    setActiveSubmenu(activeSubmenu === label ? null : label)
  }

  return (
    <>
      {/* Full menu overlay */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 flex flex-col"
          style={{ backgroundColor: colors.lightCream }}
        >
          <div className="flex justify-end p-4">
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-2"
              style={{ color: colors.darkOlive }}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col space-y-2 p-4">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                const isSubmenuOpen = activeSubmenu === item.label
                
                return (
                  <div key={item.label}>
                    <div className="flex items-center justify-between">
                      {item.href ? (
                        <Link
                          href={`/${locale}${item.href}`}
                          onClick={() => !item.children && setIsMenuOpen(false)}
                          className={`flex items-center space-x-2 text-lg font-medium transition-colors p-2 rounded-md w-full ${
                            isActive ? 'text-[#b17f4a] bg-white/50' : ''
                          }`}
                          style={{ color: isActive ? colors.primary : colors.darkOlive }}
                        >
                          {Icon && <Icon className="h-5 w-5" />}
                          <span>{item.label}</span>
                        </Link>
                      ) : (
                        <span
                          className="flex items-center space-x-2 text-lg font-medium p-2"
                          style={{ color: colors.darkOlive }}
                        >
                          {Icon && <Icon className="h-5 w-5" />}
                          <span>{item.label}</span>
                        </span>
                      )}
                      {item.children && (
                        <button
                          onClick={() => handleSubmenuClick(item.label)}
                          className="p-2"
                          style={{ color: colors.darkOlive }}
                        >
                          <ChevronRight
                            className={`h-5 w-5 transition-transform ${
                              isSubmenuOpen ? 'rotate-90' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>
                    {item.children && isSubmenuOpen && (
                      <div className="ml-6 mt-2 space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={`/${locale}${child.href}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="block p-2 text-base transition-colors rounded-md"
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
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t"
        style={{ 
          backgroundColor: colors.lightCream,
          borderColor: colors.secondary 
        }}
      >
        <div className="grid grid-cols-5 h-16 font-medium">
          {mainNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
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
                <span className="text-xs">
                  {item.label}
                </span>
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

