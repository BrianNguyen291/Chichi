"use client"

import * as React from "react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { colors } from '@/lib/colors'
import { useTranslations } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'

interface MobileNavProps {
  locale: Locale
}

export function MobileNav({ locale }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)
  const { translate } = useTranslations(locale)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          className="md:hidden hover:bg-transparent"
          style={{ color: colors.darkOlive }}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">{translate('openMenu', 'common')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="w-[300px] sm:w-[400px]"
        style={{ backgroundColor: colors.lightCream }}
      >
        <nav className="flex flex-col gap-6 mt-8">
          {[
            { href: `/${locale}/about`, label: 'about' },
            { href: `/${locale}/courses`, label: 'courses' },
            { href: `/${locale}/blog`, label: 'blog' },
            { href: `/${locale}/contact`, label: 'contact' },
          ].map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className="block px-4 py-3 text-lg rounded-lg transition-all hover:bg-white hover:shadow-md relative overflow-hidden group"
              style={{ color: colors.darkOlive }}
              onClick={() => setOpen(false)}
            >
              <span className="relative z-10">{translate(item.label, 'common')}</span>
              <span 
                className="absolute inset-0 bg-white transform translate-x-full transition-transform group-hover:translate-x-0"
                style={{ backgroundColor: colors.primary }}
              />
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

