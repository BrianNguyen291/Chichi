import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

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

export const HeroSection = ({ locale }: HeroSectionProps) => {
  const t = translations[locale as keyof typeof translations] || translations.en

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] bg-[#f5f2eb] overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8 lg:gap-16 items-center">
          {/* Left Side Content */}
          <div className="space-y-8 max-w-xl mx-auto lg:mx-0 lg:pr-8">
            {/* Title and Promise with animation */}
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-bold text-[#b17f4a] leading-tight animate-fade-in-up">
                {t.subtitle}
              </h2>
              <p className="text-xl md:text-2xl text-[#8b633a] leading-relaxed opacity-90 animate-fade-in-up delay-100">
                {t.promise}
              </p>
            </div>

            {/* Teacher Image with animation - Mobile only */}
            <div className="lg:hidden relative w-[280px] h-[472px] mx-auto rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/hero.png"
                alt={t.altText.hero}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 280px, 0px"
                quality={90}
              />
            </div>

            {/* Action Buttons with hover effects */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
              <button 
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white rounded-full text-[#b17f4a] font-medium shadow-md 
                          hover:shadow-lg transition-all duration-300 hover:bg-[#b17f4a] hover:text-white 
                          focus:outline-none focus:ring-2 focus:ring-[#b17f4a] focus:ring-offset-2
                          flex-grow sm:flex-grow-0"
              >
                <span>{t.consultation}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
              <button 
                className="flex items-center justify-center gap-2 px-8 py-4 bg-[#b17f4a] rounded-full text-white font-medium shadow-md 
                          hover:shadow-lg transition-all duration-300 hover:bg-[#8b633a]
                          focus:outline-none focus:ring-2 focus:ring-[#b17f4a] focus:ring-offset-2
                          flex-grow sm:flex-grow-0"
              >
                <span>{t.tryNow}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="relative h-[500px] lg:h-[700px]">
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
            <div className="absolute inset-0 top-8 right-0 scale-95 hover:scale-100 transition-transform duration-300">
              <div className="relative w-[85%] h-[90%] ml-auto mr-4">
                <Image
                  src="/images/hero pictuture right handside.png"
                  alt={t.altText.rightSide}
                  fill
                  className="object-contain object-right-bottom"
                  priority
                  sizes="(max-width: 768px) 85vw, 42.5vw"
                  quality={95}
                />
              </div>
            </div>

            {/* Rating Badge */}
            <div className="absolute top-8 right-4 lg:right-8 bg-white px-6 py-3 rounded-xl shadow-lg 
                          flex items-center space-x-3 transform hover:scale-105 transition-transform duration-300
                          backdrop-blur-sm bg-opacity-90 z-20">
              <span className="text-3xl font-bold text-[#b17f4a]">4.8</span>
              <div className="flex flex-col">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star} 
                      className="w-5 h-5 text-[#FACC15]" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 mt-1">Trustpilot</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 