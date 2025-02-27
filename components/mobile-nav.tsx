"use client"

import * as React from "react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { colors } from '@/lib/colors'

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          className="md:hidden hover:bg-transparent"
          style={{ color: colors.darkOlive }}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">開啟選單</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="w-[300px] sm:w-[400px]"
        style={{ backgroundColor: colors.lightCream }}
      >
        <nav className="flex flex-col gap-6 mt-8">
          {[
            { href: "#about", label: "關於我們" },
            { href: "#courses", label: "課程介紹" },
            { href: "#contact", label: "聯絡我們" },
          ].map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className="block px-4 py-3 text-lg rounded-lg transition-all hover:bg-white hover:shadow-md relative overflow-hidden group"
              style={{ color: colors.darkOlive }}
              onClick={() => setOpen(false)}
            >
              <span className="relative z-10">{item.label}</span>
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

