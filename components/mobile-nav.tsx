"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { colors } from '@/lib/colors'
import { useTranslations } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { Home, Menu, X, ChevronRight, BookOpen, Library, GraduationCap, Activity, Newspaper, Phone, Languages, Globe } from 'lucide-react'
import { LanguageSwitcher } from './language-switcher'
import { getCategories, organizeCategories, TranslatedCategory } from "@/lib/wordpress-api"

interface NavMenuItem {
  label: string
  href: string
  icon?: React.ElementType
  children?: NavMenuItem[]
}

interface MobileNavProps {
  locale: Locale
}

export function MobileNav({ locale }: MobileNavProps) {
  const pathname = usePathname()
  const { translate } = useTranslations(locale)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [activeSubmenu, setActiveSubmenu] = React.useState<string | null>(null)
  const [navItems, setNavItems] = React.useState<NavMenuItem[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  
  // Cache for categories
  const categoriesCache = React.useRef<{
    [key: string]: {
      items: NavMenuItem[]
      timestamp: number
    }
  }>({})

  // Get translated static items
  const staticNavItems = React.useMemo(() => [
    { 
      href: '/', 
      label: translate('home', 'common'),
      icon: Home 
    },
    { 
      href: '/#courses', 
      label: translate('about', 'common'),
      icon: Home,
      scroll: true
    },
    {
      href: '/teacher-team',
      label: translate('coachTeam', 'common') || 'Coach Team',
      icon: GraduationCap,
      scroll: true
    },
    { 
      href: '/contact', 
      label: translate('contact', 'common'),
      icon: Phone 
    },
  ], [translate])

  // Initialize mainNavItems state
  const [mainNavItems, setMainNavItems] = React.useState(() => 
    staticNavItems.map(item => {
      // Special handling for teacher-team link to preserve the hash
      if (item.href.includes('#')) {
        const [path, hash] = item.href.split('#');
        return {
          ...item,
          href: `/${locale}${path}#${hash}`
        };
      }
      return {
        ...item,
        href: `/${locale}${item.href}`
      };
    })
  );

  // Safe pathname check
  const safePath = pathname || '/';

  // Memoize the active state check
  const isPathActive = React.useCallback((path: string) => {
    return safePath === path || safePath === path.replace(/\/$/, '')
  }, [safePath])

  React.useEffect(() => {
    let isMounted = true;

    async function fetchCategories() {
      // Check cache first
      const cachedData = categoriesCache.current[locale];
      const now = Date.now();
      const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

      // If we have valid cached data, use it
      if (cachedData && (now - cachedData.timestamp) < CACHE_DURATION) {
        console.log('📱 Using cached categories for locale:', locale);
        setNavItems(cachedData.items);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        console.log('🔄 Fetching categories for locale:', locale);
        const categories = await getCategories(locale);
        
        if (!isMounted) return;
        
        // 5. Đội ngũ giáo viên (Teacher Team)
        // 6. Blog
        // 7. Liên hệ (Contact)
        const topLevelSlugs = [
          'course',
          'library',
          'vietnamese-tests',
          'blogs'
        ];

        const allCategories = categories;
        const subCategoriesByParent = allCategories.reduce((acc, cat) => {
          if (cat.parent !== 0) {
            if (!acc[cat.parent]) {
              acc[cat.parent] = [];
            }
            acc[cat.parent].push(cat);
          }
          return acc;
        }, {} as { [key: number]: TranslatedCategory[] });
        
        const courseSubItems = [
            { slug: 'beginner', defaultLabel: '初級' },
            { slug: 'intermediate', defaultLabel: '中級' },
            { slug: 'advanced', defaultLabel: '高級' },
            { slug: 'certification', defaultLabel: '考證班' },
            { slug: 'corporate', defaultLabel: '企業班' },
            { slug: 'individual', defaultLabel: '個人班' },
        ].map(item => ({
            label: translate(item.slug, 'common') || item.defaultLabel,
            href: `/${locale}/courses?level=${item.slug}`
        }));

        const wpMenuItems = topLevelSlugs.map(slug => {
          const category = allCategories.find(c => c.slug === slug);
          
          let href = `/${locale}/category/${slug}`;
          if (slug === 'course') href = `/${locale}/courses`;
          if (slug === 'vietnamese-tests') href = `/${locale}/exam-info`;

          if (!category) {
            if (slug === 'course') {
              return {
                label: translate('courses', 'common') || 'Courses',
                href: href,
                icon: getIconForCategory(slug),
                children: courseSubItems
              };
            }
            if (slug === 'vietnamese-tests') {
              return {
                label: translate('vietnameseExam', 'common') || 'Vietnamese Exam',
                href: href,
                icon: getIconForCategory(slug),
              };
            }
            return null;
          }

          const children = (subCategoriesByParent[category.id] || []).map(subCat => ({
            label: subCat.translatedName || subCat.name,
            href: `/${locale}/category/${subCat.slug}`,
          }));

          return {
            label: category.translatedName || category.name,
            href,
            icon: getIconForCategory(slug),
            children: slug === 'course' ? courseSubItems : (children.length > 0 ? children : undefined),
          };
        }).filter(Boolean) as NavMenuItem[];

        const completeNavItems: NavMenuItem[] = [
          { ...staticNavItems[1], href: `/${locale}/#courses` }, // About Us
          ...wpMenuItems,
          { ...staticNavItems[2], href: `/${locale}/teacher-team` }, // Teacher Team
          { ...staticNavItems[3], href: `/${locale}/contact` }, // Contact
        ];

        // Update cache
        categoriesCache.current[locale] = {
          items: completeNavItems,
          timestamp: now
        };

        // Set the complete navigation items
        setNavItems(completeNavItems);

        // Update mainNavItems for bottom navigation
        // Only show essential items in bottom nav: Home, Courses, Teacher Team, Contact
        setMainNavItems([
          { href: `/${locale}`, label: translate('home', 'common'), icon: Home },
          { 
            href: `/${locale}/courses`, 
            label: translate('courses', 'common') || 'Khoá học', 
            icon: BookOpen 
          },
          {
            href: `/${locale}/exam-info`,
            label: translate('vietnameseExam', 'common') || 'Vietnamese Exam',
            icon: Newspaper,
          },
          { 
            href: `/${locale}/teacher-team`, 
            label: translate('coachTeam', 'common') || 'Đội ngũ giáo viên', 
            icon: GraduationCap 
          },
          { 
            href: `/${locale}/contact`, 
            label: translate('contact', 'common') || 'Liên hệ', 
            icon: Phone 
          },
        ]);

      } catch (error) {
        console.error('❌ Error fetching categories:', error);
        if (isMounted) {
          const fallbackItems = [
            { ...staticNavItems[0], href: `/${locale}` }, // Home
            { ...staticNavItems[1], href: `/${locale}/#courses` }, // About
            { label: translate('courses', 'common') || 'Courses', href: `/${locale}/courses`, icon: BookOpen },
            { label: translate('library', 'common') || 'Library', href: `/${locale}/category/library`, icon: Library },
            { label: translate('vietnameseExam', 'common') || 'Vietnamese Exam', href: `/${locale}/exam-info`, icon: Newspaper },
            { label: translate('blog', 'common') || 'Blog', href: `/${locale}/category/blogs`, icon: BookOpen },
            { ...staticNavItems[2], href: `/${locale}/teacher-team` }, // Teacher Team
            { ...staticNavItems[3], href: `/${locale}/contact` } // Contact
          ];
          setNavItems(fallbackItems);
          setMainNavItems(fallbackItems);
          setError('Failed to load categories');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, [locale, staticNavItems, translate]);

  // Helper function to get appropriate icon for each category
  const getIconForCategory = (slug: string) => {
    switch (slug) {
      case 'activities':
        return Activity
      case 'course':
        return GraduationCap
      case 'library':
        return Library
      case 'blogs':
        return BookOpen
      default:
        return Newspaper
    }
  }

  // Reset active submenu when language changes
  React.useEffect(() => {
    setActiveSubmenu(null)
  }, [locale])

  // Log menu state changes
  React.useEffect(() => {
    console.log('📱 Menu state changed:', isMenuOpen ? 'OPEN' : 'CLOSED');
    console.log('📱 Nav items count:', navItems.length);
  }, [isMenuOpen, navItems.length]);

  const handleSubmenuClick = React.useCallback((label: string) => {
    console.log('Submenu click:', { label, currentActive: activeSubmenu })
    setActiveSubmenu(prev => prev === label ? null : label)
  }, [activeSubmenu])

  // Add debug effect
  React.useEffect(() => {
    console.log('Active submenu changed:', activeSubmenu)
  }, [activeSubmenu])

  // Add debug effect for navItems
  React.useEffect(() => {
    console.log('Nav items loaded:', navItems)
  }, [navItems])

  // Modify the toggleMenu function to be more robust
  const toggleMenu = React.useCallback((newState: boolean) => {
    console.log('📱 Toggling menu to:', newState)
    setIsMenuOpen(newState)
    if (!newState) {
      // Reset submenu when closing
      setActiveSubmenu(null)
      // Reset body overflow when closing
      document.body.style.overflow = ''
    } else {
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    }
  }, [])

  // Add click outside handler
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const menuContent = target.closest('[data-menu-content]')
      const menuButton = target.closest('button')
      
      if (isMenuOpen && !menuContent && !menuButton?.onclick?.toString().includes('toggleMenu')) {
        toggleMenu(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen, toggleMenu])

  // Remove the old z-index management effect since we handle it in toggleMenu now
  React.useEffect(() => {
    // Cleanup overflow style when component unmounts
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Memoize the menu content for better performance
  const menuContent = React.useMemo(() => (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = safePath.startsWith(item.href);
          const isSubmenuOpen = activeSubmenu === item.label;
          const hasChildren = item.children && item.children.length > 0;
          
          return (
            <div key={item.label} className="border-b last:border-b-0" style={{ borderColor: colors.secondary }}>
              {/* Parent menu item */}
              <button
                onClick={() => {
                  if (hasChildren) {
                    handleSubmenuClick(item.label);
                  } else {
                    window.location.href = item.href;
                    setIsMenuOpen(false);
                  }
                }}
                className={`w-full flex items-center justify-between py-3 px-4 ${
                  isActive ? 'text-[#b17f4a]' : ''
                }`}
                style={{ color: isActive ? colors.primary : colors.darkOlive }}
              >
                <div className="flex items-center space-x-3">
                  {Icon && <Icon className="h-5 w-5 shrink-0" />}
                  <span className="text-lg font-medium">{item.label}</span>
                </div>
                {hasChildren && (
                  <ChevronRight
                    className={`h-5 w-5 transition-transform duration-200 ${
                      isSubmenuOpen ? 'rotate-90' : ''
                    }`}
                  />
                )}
              </button>

              {/* Submenu */}
              {hasChildren && (
                <div 
                  className={`bg-gray-50 transition-all duration-300 ease-in-out ${
                    isSubmenuOpen ? 'max-h-screen py-2' : 'max-h-0'
                  } overflow-hidden`}
                >
                  {item.children?.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block w-full px-8 py-2 text-base hover:bg-gray-100 ${
                        safePath.startsWith(child.href) ? 'text-[#b17f4a]' : ''
                      }`}
                      style={{ color: safePath.startsWith(child.href) ? colors.primary : colors.darkOlive }}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
              
              {/* Language selector has been moved to the header */}
            </div>
          );
        })}
      </div>
    </div>
  ), [navItems, activeSubmenu, safePath, colors.primary, colors.darkOlive, colors.secondary, translate, setIsMenuOpen]);

  // Bottom navigation content
  const bottomNav = React.useMemo(() => {
    // Get the current path without the locale prefix for comparison
    const currentPath = pathname || '/';
    
    return (
      <div className="grid grid-cols-5 h-16 font-medium">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          // Check if the current path matches the item's href (ignoring hash and query params)
          const isActive = currentPath === item.href.replace(/#.*$/, '').split('?')[0];
          
          return (
            <div key={item.label} className="flex flex-col items-center justify-center">
              <Link
                href={item.href}
                className={`flex flex-col items-center justify-center w-full h-full px-2 text-center ${isActive ? 'text-[#b17f4a]' : 'text-gray-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {Icon && <Icon className="h-5 w-5 mx-auto mb-1" />}
                <span className="text-xs">{item.label}</span>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }, [mainNavItems, pathname, setIsMenuOpen]);

  if (isLoading) {
    return (
      <>
        {/* Menu Button at Top Right */}
        <button
          type="button"
          className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors md:hidden"
          style={{ color: colors.darkOlive }}
        >
          <Menu className="h-6 w-6" />
        </button>
        
        {/* Bottom Navigation */}
        <nav 
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t"
          style={{ 
            backgroundColor: colors.lightCream,
            borderColor: colors.secondary 
          }}
        >
          {bottomNav}
        </nav>
      </>
    );
  }

  return (
    <div className="md:hidden">
      {/* Menu Button at Top Right */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleMenu(!isMenuOpen);
        }}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
        style={{ color: colors.darkOlive }}
      >
        {isMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => toggleMenu(false)}
          style={{ pointerEvents: 'auto' }}
        />
      )}

      {/* Menu Panel */}
      <div 
        data-menu-content
        className={`fixed top-0 right-0 bottom-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '100%', maxWidth: '400px', height: '80vh', overflowY: 'auto' }}
      >
        <div className="h-full bg-white flex flex-col shadow-lg">
          {/* Header */}
          <div className="sticky top-0 flex items-center justify-between px-4 py-3 border-b bg-white z-10"
               style={{ borderColor: colors.secondary }}>
            <div className="flex-1">
              <span className="text-lg font-medium" style={{ color: colors.darkOlive }}>
                {translate('menu', 'common')}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleMenu(false);
                }}
                className="p-2 rounded-full hover:bg-gray-100"
                style={{ color: colors.darkOlive }}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Language Selector Section */}
          <div className="border-b p-4" style={{ borderColor: colors.secondary }}>
            <div className="flex items-center space-x-2 text-sm font-medium" style={{ color: colors.darkOlive }}>
              <Globe className="h-5 w-5" />
              <span>{translate('language', 'common') || 'Language'}</span>
            </div>
            <div className="mt-2 flex space-x-2">
              {Object.entries({
                'en': 'Eng',
                'zh-Hant': 'Chinese Traditional',
                'zh-Hans': 'Chinese Simplified'
              }).map(([key, label]) => (
                <Link
                  key={key}
                  href={`/${key}${pathname ? pathname.replace(/^\/[a-z]{2}(-[A-Za-z]{2,4})?/, '') : '/'}`}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                    key === locale 
                      ? 'bg-[#b17f4a] text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    document.dispatchEvent(new Event('menu-close'));
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Menu Content */}
          {menuContent}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav 
        className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white"
        style={{ borderColor: colors.secondary }}
      >
        {bottomNav}
      </nav>
    </div>
  );
}

