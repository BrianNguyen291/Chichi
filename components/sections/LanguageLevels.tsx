import Image from 'next/image'
import Link from 'next/link'
import { Card } from '../ui/card'
import { colors } from '@/lib/colors'

interface LanguageLevelsProps {
  locale: string;
}

const translations = {
  en: {
    title: 'Course Introduction',
    levels: [
      {
        level: 'A0',
        title: 'Beginner Foundation',
        description: 'Start your Vietnamese learning journey',
        image: '/images/language_level/A0.jpg',
        buttonText: 'Learn More'
      },
      {
        level: 'A1-A2',
        title: 'Elementary Level',
        description: 'Basic Vietnamese communication skills',
        image: '/images/language_level/A1_A2.jpg',
        buttonText: 'Learn More'
      },
      {
        level: 'B1-B2',
        title: 'Intermediate Level',
        description: 'Enhance your communication abilities',
        image: '/images/language_level/B1_B2.jpg',
        buttonText: 'Learn More'
      },
      {
        level: 'C1-C2',
        title: 'Advanced Level',
        description: 'Master complex Vietnamese concepts',
        image: '/images/language_level/C1_C2.jpg',
        buttonText: 'Learn More'
      }
    ]
  },
  'zh-Hant': {
    title: '課程介紹',
    levels: [
      {
        level: 'A0',
        title: '零基礎',
        description: '開始您的越南語學習之旅',
        image: '/images/language_level/A0.jpg',
        buttonText: '了解更多'
      },
      {
        level: 'A1-A2',
        title: '初級',
        description: '基礎越南語溝通能力',
        image: '/images/language_level/A1_A2.jpg',
        buttonText: '了解更多'
      },
      {
        level: 'B1-B2',
        title: '中級',
        description: '提升您的溝通能力',
        image: '/images/language_level/B1_B2.jpg',
        buttonText: '了解更多'
      },
      {
        level: 'C1-C2',
        title: '高級',
        description: '掌握複雜的越南語概念',
        image: '/images/language_level/C1_C2.jpg',
        buttonText: '了解更多'
      }
    ]
  },
  'zh-Hans': {
    title: '课程等级',
    levels: [
      {
        title: '零基础',
        description: '开始您的越南语学习之旅',
        image: '/images/language_level/A0.jpg',
        buttonText: '了解更多'
      },
      {
        level: 'A1-A2',
        title: '初级',
        description: '开始您的越南语学习之旅',
        image: '/images/language_level/A1_A2.jpg',
        buttonText: '了解更多'
      },
      {
        level: 'B1-B2',
        title: '中级',
        description: '提升您的沟通能力',
        image: '/images/language_level/B1_B2.jpg',
        buttonText: '了解更多'
      },
      {
        level: 'C1-C2',
        title: '高级',
        description: '掌握复杂的越南语概念',
        image: '/images/language_level/C1_C2.jpg',
        buttonText: '了解更多'
      }
    ]
  }
}

export const LanguageLevels = ({ locale }: LanguageLevelsProps) => {
  const t = translations[locale as keyof typeof translations] || translations.en

  return (
    <section className="w-full py-16" style={{ backgroundColor: colors.primary }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 relative" style={{ color: colors.darkOlive }}>
          {t.title}
          <span className="block w-20 h-1 bg-secondary mx-auto mt-4" style={{ backgroundColor: colors.secondary }}></span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {t.levels.map((level, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={level.image}
                  alt={`${level.title} Level`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70" />
                <div className="absolute top-4 left-4 bg-white/90 rounded-full px-4 py-1 text-sm font-bold" style={{ color: colors.secondary }}>
                  {level.level}
                </div>
              </div>
              
              <div className="p-6">
                <h3 
                  className="text-2xl font-bold mb-3"
                  style={{ color: colors.darkOlive }}
                >
                  {level.title}
                </h3>
                <p 
                  className="mb-6 text-base"
                  style={{ color: colors.grayGreen }}
                >
                  {level.description}
                </p>
                
                <div className="mt-auto">
                  <Link 
                    href={`/${locale}/courses`} 
                    className="inline-block w-full text-center py-3 px-6 rounded-lg font-medium transition-all duration-300"
                    style={{ 
                      backgroundColor: colors.secondary,
                      color: colors.lightCream,
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {level.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 