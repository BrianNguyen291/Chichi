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

  const navItems = [
    { href: `/${locale}`, label: 'home', icon: Home },
    { href: `/${locale}/about`, label: 'about', icon: Home },
    { href: `/${locale}/courses`, label: 'courses', icon: BookOpen },
    { href: `/${locale}/library`, label: 'library', icon: Library },
    { href: `/${locale}/vietnamese-exam`, label: 'vietnameseExam', icon: GraduationCap },
    { href: `/${locale}/activities`, label: 'activities', icon: Activity },
    { href: `/${locale}/blog`, label: 'blog', icon: Newspaper },
    { href: `/${locale}/contact`, label: 'contact', icon: Phone },
  ]

  // Main items for bottom navigation
  const mainNavItems = [
    { href: `/${locale}`, label: 'home', icon: Home },
    { href: `/${locale}/courses`, label: 'courses', icon: BookOpen },
    { href: `/${locale}/blog`, label: 'blog', icon: Newspaper },
    { href: `/${locale}/contact`, label: 'contact', icon: Phone },
  ]

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
          <div className="flex flex-col items-center justify-center flex-1 space-y-6 p-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 text-lg font-medium transition-colors ${
                    isActive ? 'text-[#b17f4a]' : ''
                  }`}
                  style={{ color: isActive ? colors.primary : colors.darkOlive }}
                >
                  <Icon className="h-5 w-5" />
                  <span>{translate(item.label, 'common')}</span>
                </Link>
              )
            })}
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
                href={item.href}
                className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                  isActive ? 'text-[#b17f4a]' : ''
                }`}
                style={{ color: isActive ? colors.primary : colors.darkOlive }}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">
                  {translate(item.label, 'common')}
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

