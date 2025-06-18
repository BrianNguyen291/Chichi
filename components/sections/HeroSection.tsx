'use client';

import Image from 'next/image'
import Link from 'next/link'
import { Playfair_Display, Inter } from 'next/font/google'
import { translations } from '@/lib/translations/hero'
import { colors } from '@/lib/theme/colors'
import { useEffect, useState } from 'react'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

interface HeroSectionProps {
  locale: string;
}

export const HeroSection = ({ locale }: HeroSectionProps) => {
  const t = translations[locale as keyof typeof translations] || translations.en
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
      }
      
      // Set initial value
      handleResize()
      
      // Add event listener
      window.addEventListener('resize', handleResize)
      
      // Clean up
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section 
      className={`relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center text-center ${playfair.variable} ${inter.variable}`}
      aria-label="Hero section"
    >
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        {isMobile ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/images/image_copy.png"
              alt="A person learning Vietnamese"
              priority
              quality={100}
              className="w-full h-auto max-h-full object-contain"
              width={400}
              height={1000}
              style={{
                maxWidth: '100%',
                maxHeight: '95vh'
              }}
            />
          </div>
        ) : (
          <Image
            src="/images/hero pictuture right handside.png"
            alt="A person learning Vietnamese"
            fill
            loading="eager"
            className="object-cover object-center"
            priority
            quality={100}
            sizes="100vw"
          />
        )}
      </div>
      {/* Darker Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-playfair mb-6 animate-fade-in-up text-white drop-shadow-lg">
          Learn Vietnamese Easily
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl max-w-3xl mx-auto font-inter mb-8 animate-fade-in-up [animation-delay:200ms] text-white font-semibold drop-shadow-lg">
          Your journey to fluency starts here.
        </p>
        <Link
          href="/courses"
          className="inline-block px-8 py-4 bg-white text-[#2A5C3F] rounded-full font-bold text-lg
                    hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl
                    transform hover:scale-105 font-inter animate-fade-in-up [animation-delay:400ms]"
          aria-label="Explore Courses"
        >
          Explore Courses
        </Link>
      </div>
    </section>
  )
} 