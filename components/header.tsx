'use client'

import Link from 'next/link'
import Image from 'next/image'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useTranslations } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { MobileNav } from '@/components/mobile-nav'
import { NavMenu } from '@/components/nav-menu'
import { colors } from '@/lib/colors'

interface HeaderProps {
  locale: Locale
}

export function Header({ locale }: HeaderProps) {
  const { translate } = useTranslations(locale)

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b"
      style={{ 
        backgroundColor: colors.lightCream,
        borderColor: colors.secondary 
      }}
    >
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link href={`/${locale}`} className="flex items-center">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <Image
                src="/Logo.png"
                alt="Chi Chi Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span 
              className="ml-2 text-sm sm:text-base whitespace-nowrap font-bold"
              style={{ color: colors.darkOlive }}
            >
              {translate('brand', 'common')}
            </span>
          </Link>

          <NavMenu locale={locale} />

          <div className="flex items-center space-x-2 md:space-x-4">
            <LanguageSwitcher locale={locale} />
            <MobileNav locale={locale} />
          </div>
        </div>
      </div>
    </header>
  )
} 