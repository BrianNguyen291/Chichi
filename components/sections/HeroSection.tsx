import Image from 'next/image'
import { Playfair_Display, Inter } from 'next/font/google'

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

const translations = {
  vi: {
    subtitle: 'Học tiếng Việt dễ dàng',
    promise: 'không chỉ là khẩu hiệu của chúng tôi, mà còn là lời hứa với mỗi học viên.',
    consultation: 'Tư vấn miễn phí',
    tryNow: 'Học thử ngay',
    altText: {
      hero: 'Cô Chi Chi',
      rightSide: 'Phong cảnh Hà Nội'
    }
  },
  en: {
    subtitle: 'Learn Vietnamese Easily',
    promise: 'not just our slogan, but our promise to every student.',
    consultation: 'Free Consultation',
    tryNow: 'Try Now',
    altText: {
      hero: 'Teacher Chi Chi',
      rightSide: 'Hanoi Landscape'
    }
  },
  'zh-Hant': {
    subtitle: '越學越通',
    promise: '不僅是我們的口號，更是我們對每位學生的承諾。',
    consultation: '免費諮詢',
    tryNow: '立即體驗',
    altText: {
      hero: '芝芝老師',
      rightSide: '河內景觀'
    }
  },
  'zh-Hans': {
    subtitle: '越学越通',
    promise: '不仅是我们的口号，更是我们对每位学生的承诺。',
    consultation: '免费咨询',
    tryNow: '立即体验',
    altText: {
      hero: '芝芝老师',
      rightSide: '河内景观'
    }
  }
}

const colors = {
  primary: '#B17F4A',
  secondary: '#8B633A',
  accent: '#2A5C3F',
  light: '#F5F2EB',
  dark: '#3A3A3A'
}

export const HeroSection = ({ locale }: HeroSectionProps) => {
  const t = translations[locale as keyof typeof translations] || translations.en

  return (
    <section className={`relative w-full min-h-[calc(100vh-80px)] bg-[#f5f2eb] overflow-hidden ${playfair.variable} ${inter.variable}`}>
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-6 lg:gap-16 items-center">
          {/* Left Side Content */}
          <div className="space-y-6 md:space-y-8 max-w-xl mx-auto lg:mx-0 lg:pr-8 text-center lg:text-left">
            {/* Title and Promise with animation */}
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A5C3F] leading-tight animate-fade-in-up font-playfair">
                {t.subtitle}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-[#3A3A3A] leading-relaxed font-inter animate-fade-in-up delay-100">
                {t.promise}
              </p>
            </div>

            {/* Teacher Image with animation - Mobile only */}
            <div className="lg:hidden relative w-full max-w-[280px] aspect-[3/5] mx-auto rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/hero.png"
                alt={t.altText.hero}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 280px, (max-width: 1024px) 280px, 0px"
                quality={90}
              />
            </div>

            {/* Action Buttons with hover effects */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 pt-6 sm:pt-8">
              <button 
                className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white rounded-full text-[#2A5C3F] font-medium shadow-md 
                          hover:shadow-lg transition-all duration-300 hover:bg-[#2A5C3F] hover:text-white 
                          focus:outline-none focus:ring-2 focus:ring-[#2A5C3F] focus:ring-offset-2
                          flex-grow sm:flex-grow-0 text-sm sm:text-base font-inter"
              >
                <span>{t.consultation}</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
              <button 
                className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#2A5C3F] rounded-full text-white font-medium shadow-md 
                          hover:shadow-lg transition-all duration-300 hover:bg-[#1E4630]
                          focus:outline-none focus:ring-2 focus:ring-[#2A5C3F] focus:ring-offset-2
                          flex-grow sm:flex-grow-0 text-sm sm:text-base font-inter"
              >
                <span>{t.tryNow}</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] mt-4 lg:mt-0">
            {/* Teacher Image - Desktop only */}
            <div className="hidden lg:block absolute left-0 -bottom-12 w-[320px] h-[540px] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 z-10">
              <Image
                src="/images/hero.png"
                alt={t.altText.hero}
                fill
                className="object-cover"
                priority
                sizes="320px"
                quality={90}
              />
            </div>

            {/* Right Side Hero Image */}
            <div className="absolute inset-0 top-0 sm:top-8 right-0 scale-95 hover:scale-100 transition-transform duration-300">
              <div className="relative w-[85%] h-[90%] ml-auto mr-0">
                <Image
                  src="/images/hero pictuture right handside.png"
                  alt={t.altText.rightSide}
                  fill
                  className="object-contain object-right-bottom"
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 768px) 85vw, (max-width: 1024px) 70vw, 42.5vw"
                  quality={90}
                />
              </div>
            </div>

            {/* Rating Badge */}
            <div className="absolute bottom-2 sm:bottom-4 right-0 sm:right-4 lg:right-8 bg-white/95 px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg 
                          flex items-center space-x-2 sm:space-x-3 transform hover:scale-105 transition-transform duration-300
                          backdrop-blur-sm border border-[#ffffff80] font-inter z-20 max-w-[180px] sm:max-w-none">
              <span className="text-2xl sm:text-3xl font-bold text-[#b17f4a]">4.8</span>
              <div className="flex flex-col">
                <div className="flex gap-[2px] sm:gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star} 
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${star <= 4 ? 'text-[#FACC15]' : 'text-[#FACC15]/50'}`}
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-xs sm:text-sm text-gray-600">Trustpilot</span>
                  <span className="text-[10px] sm:text-xs text-gray-500 ml-1 sm:ml-2">(120+)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 