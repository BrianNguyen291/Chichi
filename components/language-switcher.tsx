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
    return pathname.replace(`/${locale}`, '') || '/'
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
        <Button variant="ghost" size="sm" className="gap-2">
          {locales[locale as keyof typeof locales]}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(locales).map(([key, label]) => (
          <DropdownMenuItem key={key} asChild>
            <Link
              href={`/${key}${pathnameWithoutLocale}`}
              className={`w-full ${
                key === locale ? 'font-medium' : 'font-normal'
              }`}
            >
              {label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

