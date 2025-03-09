'use client'

import Link from 'next/link'
import Image from 'next/image'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useTranslations } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { MobileNav } from '@/components/mobile-nav'
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

          <nav className="hidden md:flex items-center space-x-6 font-medium">
            <Link 
              href={`/${locale}/about`} 
              className="relative py-2 transition-colors hover:text-[#b17f4a] group"
              style={{ color: colors.darkOlive }}
            >
              {translate('about', 'common')}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b17f4a] transform scale-x-0 transition-transform group-hover:scale-x-100" />
            </Link>
            <Link 
              href={`/${locale}/courses`} 
              className="relative py-2 transition-colors hover:text-[#b17f4a] group"
              style={{ color: colors.darkOlive }}
            >
              {translate('courses', 'common')}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b17f4a] transform scale-x-0 transition-transform group-hover:scale-x-100" />
            </Link>
            <Link 
              href={`/${locale}/library`} 
              className="relative py-2 transition-colors hover:text-[#b17f4a] group"
              style={{ color: colors.darkOlive }}
            >
              {translate('library', 'common')}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b17f4a] transform scale-x-0 transition-transform group-hover:scale-x-100" />
            </Link>
            <Link 
              href={`/${locale}/vietnamese-exam`} 
              className="relative py-2 transition-colors hover:text-[#b17f4a] group"
              style={{ color: colors.darkOlive }}
            >
              {translate('vietnameseExam', 'common')}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b17f4a] transform scale-x-0 transition-transform group-hover:scale-x-100" />
            </Link>
            <Link 
              href={`/${locale}/activities`} 
              className="relative py-2 transition-colors hover:text-[#b17f4a] group"
              style={{ color: colors.darkOlive }}
            >
              {translate('activities', 'common')}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b17f4a] transform scale-x-0 transition-transform group-hover:scale-x-100" />
            </Link>
            <Link 
              href={`/${locale}/blog`} 
              className="relative py-2 transition-colors hover:text-[#b17f4a] group"
              style={{ color: colors.darkOlive }}
            >
              {translate('blog', 'common')}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b17f4a] transform scale-x-0 transition-transform group-hover:scale-x-100" />
            </Link>
            <Link 
              href={`/${locale}/contact`} 
              className="relative py-2 transition-colors hover:text-[#b17f4a] group"
              style={{ color: colors.darkOlive }}
            >
              {translate('contact', 'common')}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b17f4a] transform scale-x-0 transition-transform group-hover:scale-x-100" />
            </Link>
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4">
            <LanguageSwitcher locale={locale} />
            <MobileNav locale={locale} />
          </div>
        </div>
      </div>
    </header>
  )
} 