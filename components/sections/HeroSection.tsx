'use client';

import Image from 'next/image'
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
  
  const handleConsultClick = () => {
    window.open('https://docs.google.com/forms/d/1NFCWSWVlWv1x-Hgsy2tuKmGpqXbFgNFDDzLZfoyLHEM/viewform?edit_requested=true&fbclid=IwY2xjawKnWNZleHRuA2FlbQIxMQABHvWzAKxujUd1LMx7v4j1ad_k4aSvD9HbnaPIjrQ7XNfxy9gTVIwzm5JLKuwZ_aem_P8fWn9-kke7Tp_UmPqcnpw', '_blank')
  }

  return (
    <section 
      className={`relative w-full min-h-[calc(90vh-80px)] overflow-hidden ${playfair.variable} ${inter.variable}`}
      aria-label="Hero section"
    >
      {/* Background Image Container - Full Width & Height */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5f2eb] via-[#f5f2eb]/90 to-transparent z-8"></div>
        <div className="absolute top-0 right-0 w-full md:w-2/3 lg:w-3/4 h-full">
          <Image
            src="/images/hero pictuture right handside.png"
            alt={t.altText.rightSide}
            fill
            loading="eager"
            className="object-cover object-right"
            priority
            sizes="100vw"
            quality={100}
          />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-20 left-1/4 w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#2A5C3F]/5 blur-xl z-0"></div>
        <div className="absolute top-1/4 right-1/3 w-24 h-24 md:w-56 md:h-56 rounded-full bg-[#b17f4a]/5 blur-xl z-0"></div>
      </div>

      <div className="container relative mx-auto px-4 py-8 md:py-12 lg:py-16 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_9fr] gap-8 items-center">
          {/* Left Side Content */}
          <div className="space-y-4 md:space-y-6 max-w-xl lg:max-w-lg mx-auto lg:mx-0 lg:pr-4 text-center lg:text-left">
            {/* Title and Promise with animation */}
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A5C3F] leading-tight animate-fade-in-up font-playfair">
                {t.subtitle}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#3A3A3A] leading-relaxed font-inter animate-fade-in-up delay-100">
                {t.promise}
              </p>
            </div>

            {/* Action Buttons with hover effects */}
            <div className="flex flex-row justify-center lg:justify-start gap-3 sm:gap-4 pt-4 sm:pt-6">
              <button 
                onClick={handleConsultClick}
                className="flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-white rounded-full text-[#2A5C3F] font-medium shadow-md 
                          hover:shadow-lg transition-all duration-300 hover:bg-[#2A5C3F] hover:text-white 
                          focus:outline-none focus:ring-2 focus:ring-[#2A5C3F] focus:ring-offset-2
                          flex-grow sm:flex-grow-0 text-sm sm:text-base font-inter cursor-pointer"
                aria-label={t.consultation}
              >
                <span>{t.consultation}</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-[#2A5C3F] rounded-full text-white font-medium shadow-md 
                          hover:shadow-lg transition-all duration-300 hover:bg-[#1E4630]
                          focus:outline-none focus:ring-2 focus:ring-[#2A5C3F] focus:ring-offset-2
                          flex-grow sm:flex-grow-0 text-sm sm:text-base font-inter cursor-pointer"
                aria-label={t.tryNow}
              >
                <span>{t.tryNow}</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
            
            {/* Empty div for spacing */}
            <div className="h-8 md:h-12 lg:hidden"></div>
          </div>

          {/* Right Side Content - Empty to let background image show */}
          <div className="relative hidden lg:block h-[500px]">
            {/* This is intentionally empty to allow background image to show through */}
          </div>
        </div>
      </div>
      
      {/* Rating Badge - Floating */}
      <div 
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 lg:bottom-16 lg:right-16 bg-white/90 px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-xl shadow-xl 
                  flex items-center space-x-3 transform hover:scale-110 transition-transform duration-300
                  backdrop-blur-sm border border-[#ffffff80] font-inter z-30 animate-fade-in-up"
        role="complementary"
        aria-label="Trustpilot rating"
      >
        <span className="text-2xl sm:text-3xl font-bold text-[#b17f4a]">5.0</span>
        <div className="flex flex-col">
          <div className="flex gap-[2px]" role="img" aria-label="5 out of 5 stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star} 
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#FACC15]"
                fill="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <div className="flex items-center mt-0.5">
            <span className="text-xs sm:text-sm text-gray-600 font-medium">Trustpilot</span>
            <span className="text-[10px] sm:text-xs text-gray-500 ml-1.5 sm:ml-2">(120+)</span>
          </div>
        </div>
      </div>
    </section>
  )
} 