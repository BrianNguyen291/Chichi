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

  return (
    <section 
      className={`relative w-full min-h-[calc(85vh-80px)] bg-[#f5f2eb] overflow-hidden ${playfair.variable} ${inter.variable}`}
      aria-label="Hero section"
    >
      <div className="container mx-auto px-4 py-4 md:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-3 lg:gap-8 items-center">
          {/* Left Side Content */}
          <div className="space-y-3 md:space-y-4 max-w-xl mx-auto lg:mx-0 lg:pr-4 text-center lg:text-left">
            {/* Title and Promise with animation */}
            <div className="space-y-2 md:space-y-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A5C3F] leading-tight animate-fade-in-up font-playfair">
                {t.subtitle}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#3A3A3A] leading-relaxed font-inter animate-fade-in-up delay-100">
                {t.promise}
              </p>
            </div>

            {/* Teacher Image with animation - Mobile only */}
            <div className="lg:hidden relative w-full max-w-[200px] aspect-[3/5] mx-auto rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/hero.png"
                alt={t.altText.hero}
                fill
                loading="eager"
                className="object-cover"
                priority
                sizes="200px"
                quality={90}
              />
            </div>

            {/* Action Buttons with hover effects */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-2 sm:gap-3 pt-3 sm:pt-4">
              <button 
                className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white rounded-full text-[#2A5C3F] font-medium shadow-md 
                          hover:shadow-lg transition-all duration-300 hover:bg-[#2A5C3F] hover:text-white 
                          focus:outline-none focus:ring-2 focus:ring-[#2A5C3F] focus:ring-offset-2
                          flex-grow sm:flex-grow-0 text-sm sm:text-base font-inter"
                aria-label={t.consultation}
              >
                <span>{t.consultation}</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
              <button 
                className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#2A5C3F] rounded-full text-white font-medium shadow-md 
                          hover:shadow-lg transition-all duration-300 hover:bg-[#1E4630]
                          focus:outline-none focus:ring-2 focus:ring-[#2A5C3F] focus:ring-offset-2
                          flex-grow sm:flex-grow-0 text-sm sm:text-base font-inter"
                aria-label={t.tryNow}
              >
                <span>{t.tryNow}</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="relative h-[240px] sm:h-[320px] md:h-[400px] lg:h-[520px] mt-3 lg:mt-0">
            {/* Teacher Image - Desktop only */}
            <div className="hidden lg:block absolute left-0 -bottom-6 w-[260px] h-[440px] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 z-10">
              <Image
                src="/images/hero.png"
                alt={t.altText.hero}
                fill
                loading="eager"
                className="object-cover"
                priority
                sizes="260px"
                quality={90}
              />
            </div>

            {/* Right Side Hero Image */}
            <div className="absolute inset-0 top-0 sm:top-6 right-0 scale-95 hover:scale-100 transition-transform duration-300">
              <div className="relative w-[90%] h-[92%] ml-auto mr-0">
                <Image
                  src="/images/hero pictuture right handside.png"
                  alt={t.altText.rightSide}
                  fill
                  loading="eager"
                  className="object-contain object-right-bottom"
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 768px) 85vw, (max-width: 1024px) 70vw, 42.5vw"
                  quality={90}
                />
              </div>
            </div>

            {/* Rating Badge */}
            <div 
              className="absolute bottom-4 sm:bottom-6 right-2 sm:right-6 lg:right-10 bg-white/95 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-lg 
                        flex items-center space-x-2 sm:space-x-3 transform hover:scale-105 transition-transform duration-300
                        backdrop-blur-sm border border-[#ffffff80] font-inter z-20 max-w-[160px] sm:max-w-none"
              role="complementary"
              aria-label="Trustpilot rating"
            >
              <span className="text-xl sm:text-2xl font-bold text-[#b17f4a]">4.8</span>
              <div className="flex flex-col">
                <div className="flex gap-[2px]" role="img" aria-label="4.8 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star} 
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${star <= 4 ? 'text-[#FACC15]' : 'text-[#FACC15]/50'}`}
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <div className="flex items-center mt-0.5">
                  <span className="text-[11px] sm:text-sm text-gray-600">Trustpilot</span>
                  <span className="text-[9px] sm:text-xs text-gray-500 ml-1 sm:ml-1.5">(120+)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 