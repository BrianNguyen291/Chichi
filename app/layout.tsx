import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ["latin"] })

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
    <html lang="zh-TW" className="scroll-smooth">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'