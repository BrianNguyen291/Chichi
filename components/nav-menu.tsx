'use client'

import * as React from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { useTranslations } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"
import { colors } from "@/lib/colors"
import { WPCategory, getCategories, organizeCategories } from "@/lib/wordpress-api"

interface NavMenuItem {
  label: string
  href: string
  children?: NavMenuItem[]
}

interface NavMenuProps {
  locale: Locale
}

// Static menu items that are not from WordPress
const staticMenuItems: NavMenuItem[] = [
  {
    label: "about",
    href: "/about",
  },
  {
    label: "contact",
    href: "/contact",
  },
]

export function NavMenu({ locale }: NavMenuProps) {
  const { translate } = useTranslations(locale)
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
  const [menuItems, setMenuItems] = React.useState<NavMenuItem[]>(staticMenuItems)

  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const categories = await getCategories(locale)
        const { mainCategories, subCategories } = organizeCategories(categories)

        // Convert WordPress categories to menu items
        const wpMenuItems = mainCategories.map(cat => ({
          label: cat.name,
          href: `/category/${cat.slug}`,
          ...(subCategories[cat.id] && {
            children: subCategories[cat.id].map(subCat => ({
              label: subCat.name,
              href: `/category/${subCat.slug}`,
            })),
          }),
        }))

        // Combine static and WordPress menu items
        setMenuItems([...staticMenuItems, ...wpMenuItems])
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [locale])

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  return (
    <nav className="hidden md:flex items-center space-x-6 font-medium">
      {menuItems.map((item) => (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => handleMouseEnter(item.label)}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href={`/${locale}${item.href}`}
            className="relative py-2 transition-colors hover:text-[#b17f4a] group flex items-center"
            style={{ color: colors.darkOlive }}
          >
            {item.label}
            {item.children && (
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform ${
                  activeDropdown === item.label ? "rotate-180" : ""
                }`}
              />
            )}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b17f4a] transform scale-x-0 transition-transform group-hover:scale-x-100" />
          </Link>
          {item.children && activeDropdown === item.label && (
            <div
              className="absolute top-full left-0 mt-1 py-2 bg-white rounded-md shadow-lg min-w-[200px] z-50"
              style={{ borderColor: colors.secondary }}
            >
              {item.children.map((child) => (
                <Link
                  key={child.label}
                  href={`/${locale}${child.href}`}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                  style={{ color: colors.darkOlive }}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
} 