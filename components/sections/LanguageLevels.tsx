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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 relative" style={{ color: colors.darkOlive }}>
          {t.title}
          <span className="block w-20 h-1 bg-secondary mx-auto mt-4" style={{ backgroundColor: colors.secondary }}></span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
        
        {/* Added feature highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className="rounded-full p-3" style={{ backgroundColor: `${colors.secondary}20` }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.secondary }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold" style={{ color: colors.darkOlive }}>专业教材</h4>
              <p className="text-sm" style={{ color: colors.grayGreen }}>精心设计的课程材料</p>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className="rounded-full p-3" style={{ backgroundColor: `${colors.secondary}20` }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.secondary }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold" style={{ color: colors.darkOlive }}>灵活课程安排</h4>
              <p className="text-sm" style={{ color: colors.grayGreen }}>适应您的个人时间表</p>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className="rounded-full p-3" style={{ backgroundColor: `${colors.secondary}20` }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.secondary }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold" style={{ color: colors.darkOlive }}>实用会话练习</h4>
              <p className="text-sm" style={{ color: colors.grayGreen }}>提高实际交流能力</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 