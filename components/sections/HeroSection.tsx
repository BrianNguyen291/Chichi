import Image from 'next/image'
import { colors } from '@/lib/colors'
import { useTranslations } from '@/lib/i18n'

interface HeroSectionProps {
  locale: string;
}

const translations = {
  vi: {
    title: 'CHICHI VIETNAMESE',
    subtitle: 'Học tiếng Việt dễ dàng',
    logo: 'Chi Chi\nViệt ngữ',
  },
  en: {
    title: 'CHICHI VIETNAMESE',
    subtitle: 'Learn Vietnamese Easily',
    logo: 'Chi Chi\nVietnamese',
  },
  'zh-Hant': {
    title: 'CHICHI VIETNAMESE',
    subtitle: '越學越通',
    logo: '芝芝\n越語',
  },
  'zh-Hans': {
    title: 'CHICHI VIETNAMESE',
    subtitle: '越学越通',
    logo: '芝芝\n越语',
  }
}

export const HeroSection = ({ locale }: HeroSectionProps) => {
  const t = translations[locale as keyof typeof translations] || translations.en

  return (
    <section className="relative w-full min-h-[600px] bg-[#f5f2eb] overflow-hidden">
      {/* Left Side Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-8">
            {/* Logo and Title */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 border-2 border-[#b17f4a] flex items-center justify-center">
                  <div className="text-[#b17f4a] font-bold text-xl text-center whitespace-pre-line">
                    {t.logo}
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-[#b17f4a]">
                  {t.title}
                </h1>
              </div>
              <h2 className="text-6xl font-bold text-[#b17f4a]">
                {t.subtitle}
              </h2>
            </div>

            {/* Video Section */}
            <div className="relative aspect-video w-full max-w-lg rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/3c89a5ce595299e003408648c5f9f1e0.jpg"
                alt="ChiChi Teacher"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Illustration */}
          <div className="relative h-[500px]">
            <div className="absolute inset-0">
              <Image
                src="/images/HaNoi VietNam.png"
                alt="Hanoi Illustration"
                fill
                className="object-contain"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 flex">
              <Image
                src="/images/7b85ba3d23149d788d1e89c17965e3c4.png"
                alt="Decorative Banner"
                width={400}
                height={100}
                className="object-contain"
              />
            </div>
            {/* Rating Badge */}
            <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <span className="text-4xl font-bold text-[#b17f4a]">5.0</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 