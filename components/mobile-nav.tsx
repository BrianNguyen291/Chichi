"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { colors } from '@/lib/colors'
import { useTranslations } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { Home, BookOpen, Newspaper, Phone } from 'lucide-react'
import Image from "next/image"

interface MobileNavProps {
  locale: Locale
}

export function MobileNav({ locale }: MobileNavProps) {
  const pathname = usePathname()
  const { translate } = useTranslations(locale)

  const navItems = [
    { href: `/${locale}`, label: 'home', icon: Home },
    { href: `/${locale}/courses`, label: 'courses', icon: BookOpen },
    { href: `/${locale}/blog`, label: 'blog', icon: Newspaper },
    { href: `/${locale}/contact`, label: 'contact', icon: Phone },
  ]

  return (
    <>
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t"
        style={{ 
          backgroundColor: colors.lightCream,
          borderColor: colors.secondary 
        }}
      >
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item) => {
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
                <span className="text-xs font-medium">
                  {translate(item.label, 'common')}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}

