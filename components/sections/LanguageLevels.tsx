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
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.darkOlive }}>
          {t.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.levels.map((level, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-lg transition-shadow"
              style={{ backgroundColor: colors.lightCream }}
            >
              <div className="space-y-4">
                <div className="text-center">
                  <span 
                    className="text-3xl font-bold"
                    style={{ color: colors.secondary }}
                  >
                    {level.level}
                  </span>
                </div>
                <div className="relative h-48 w-full overflow-hidden rounded-lg">
                  <Image
                    src={level.image}
                    alt={`${level.title} Level`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-0 transition-opacity" />
                </div>
                <h3 
                  className="text-xl font-semibold text-center"
                  style={{ color: colors.darkOlive }}
                >
                  {level.title}
                </h3>
                <p 
                  className="text-center"
                  style={{ color: colors.grayGreen }}
                >
                  {level.description}
                </p>
                <Link href={`/${locale}/courses`} className="block">
                  <button
                    className="w-full py-2 px-4 rounded-lg mt-4 transition-colors hover:opacity-90"
                    style={{ 
                      backgroundColor: colors.secondary,
                      color: colors.lightCream
                    }}
                  >
                    {level.buttonText}
                  </button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 