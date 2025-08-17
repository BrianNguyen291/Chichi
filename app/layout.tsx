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
  title: "越學越通 - 專業越南語教學",
  description: "專業越南語教學，線上線下課程，量身打造學習計畫",
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
import './globals.css'