'use client'

import Link from 'next/link'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useTranslations } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'

interface HeaderProps {
  locale: Locale
}

export function Header({ locale }: HeaderProps) {
  const { translate } = useTranslations(locale)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center space-x-6">
          <Link href={`/${locale}`} className="font-bold">
            Chi Chi
          </Link>
          <Link href={`/${locale}/about`} className="text-foreground/60 transition-colors hover:text-foreground">
            {translate('about', 'common')}
          </Link>
          <Link href={`/${locale}/courses`} className="text-foreground/60 transition-colors hover:text-foreground">
            {translate('courses', 'common')}
          </Link>
          <Link href={`/${locale}/blog`} className="text-foreground/60 transition-colors hover:text-foreground">
            {translate('blog', 'common')}
          </Link>
          <Link href={`/${locale}/contact`} className="text-foreground/60 transition-colors hover:text-foreground">
            {translate('contact', 'common')}
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
    </header>
  )
} 