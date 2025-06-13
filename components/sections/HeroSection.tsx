'use client';

import Image from 'next/image'
import Link from 'next/link'
import { Playfair_Display, Inter } from 'next/font/google'
import { translations } from '@/lib/translations/hero'
import { colors } from '@/lib/theme/colors'

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

  return (
    <section 
      className={`relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center text-center ${playfair.variable} ${inter.variable}`}
      aria-label="Hero section"
    >
      {/* Background Image */}
      <Image
        src="/images/hero pictuture right handside.png"
        alt="A person learning Vietnamese"
        fill
        loading="eager"
        className="object-cover"
        priority
        quality={100}
      />
      {/* Lighter Overlay */}
      <div className="absolute inset-0 bg-black/5 z-10"></div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4">
        {/* <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-playfair mb-4 animate-fade-in-up text-[#2A5C3F]">
          Learn Vietnamese Easily
        </h1> */}
        <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto font-inter mb-3 animate-fade-in-up [animation-delay:200ms] text-[#3A3A3A]">
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