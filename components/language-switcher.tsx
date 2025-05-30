"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'

interface LanguageSwitcherProps {
  locale: string;
}

const locales = {
  en: 'English',
  'zh-Hant': '繁體中文',
  'zh-Hans': '简体中文'
} as const

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const { translate } = useTranslations(locale as Locale)
  const [mounted, setMounted] = React.useState(false)
  
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Remove the current locale from the pathname
  const pathnameWithoutLocale = React.useMemo(() => {
    if (!pathname) return '/'
    // Split by '/' and remove the first segment if it matches the current locale
    const segments = pathname.split('/')
    if (segments[1] === locale) {
      return '/' + segments.slice(2).join('/') || '/'
    }
    return pathname
  }, [pathname, locale])

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="gap-2">
        {locales[locale as keyof typeof locales]}
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1 px-2 h-8 text-sm">
          <span className="hidden sm:inline">{locales[locale as keyof typeof locales]}</span>
          <span className="sm:hidden">{locale.toUpperCase()}</span>
          <svg className="w-3.5 h-3.5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        {Object.entries(locales).map(([key, label]) => (
          <DropdownMenuItem key={key} asChild className="px-3 py-2 text-sm">
            <Link
              href={`/${key}${pathnameWithoutLocale}`}
              className={`w-full flex items-center ${
                key === locale ? 'font-medium' : 'font-normal'
              }`}
              onClick={() => document.dispatchEvent(new Event('menu-close'))}
            >
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{key.toUpperCase()}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

