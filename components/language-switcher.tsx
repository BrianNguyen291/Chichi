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

interface LanguageSwitcherProps {
  locale: string;
}

const locales = {
  vi: 'Tiếng Việt',
  en: 'English',
  'zh-Hant': '繁體中文',
  'zh-Hans': '简体中文'
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const { translate } = useTranslations(locale as any)
  
  // Remove the current locale from the pathname
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/'

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

