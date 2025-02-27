import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Link from 'next/link'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useTranslations } from '@/lib/i18n'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chi Chi Language School',
  description: 'Learn Vietnamese, English, and Chinese at Chi Chi Language School',
}

interface RootLayoutProps {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export default function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  const { translate } = useTranslations(locale as any)

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
              <nav className="flex flex-1 items-center space-x-6">
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
              </nav>
              <div className="flex items-center space-x-4">
                <LanguageSwitcher locale={locale} />
              </div>
            </div>
          </header>
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
} 