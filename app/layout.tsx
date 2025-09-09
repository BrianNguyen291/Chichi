import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from '@/components/theme-provider'
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google'

// Import the client component
const StagewiseToolbar = dynamic(
  () => import('@/components/StagewiseToolbar').then((mod) => mod.default),
  { ssr: false }
);

const inter = Inter({ subsets: ['latin', 'latin-ext', 'vietnamese'] })

export const metadata: Metadata = {
  title: "芝芝越南語 - 專業越南語教學中心",
  description: "專業越南語教學，線上線下課程，量身打造學習計畫。提供越南語、英語、中文課程，由經驗豐富的教師團隊授課。",
  keywords: "越南語教學,越南語課程,越南語學習,越南語老師,河內越南語,線上越南語,越南語補習班,越南語會話,越南語發音,越南語文法",
  authors: [{ name: '芝芝越南語' }],
  creator: '芝芝越南語',
  publisher: '芝芝越南語',
  metadataBase: new URL('https://chichivietnamese.com'),
  icons: {
    icon: '/Logo.png',
    shortcut: '/Logo.png',
    apple: '/Logo.png',
  },
  openGraph: {
    type: 'website',
    siteName: '芝芝越南語',
    images: [
      {
        url: '/images/Cover dọc phần khoá học .png',
        width: 1080,
        height: 1920,
        alt: '越南語課程 - 為各級別提供全面的學習路徑',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/Cover dọc phần khoá học .png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hant" className="scroll-smooth">
      <body className={`${inter.className} font-base`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <StagewiseToolbar />
        </ThemeProvider>
      </body>
    </html>
  )
}