import Image from 'next/image'
import { Card } from '../ui/card'
import { colors } from '@/lib/colors'

const levels = [
  {
    level: 'A1-A2',
    title: '初級越南語',
    description: '掌握基本生活會話和簡單詞彙',
    image: '/level-basic.png'
  },
  {
    level: 'B1-B2',
    title: '中級越南語',
    description: '加強聽說讀寫，培養實用溝通能力',
    image: '/level-intermediate.png'
  },
  {
    level: 'C1-C2',
    title: '高級越南語',
    description: '深入商務、學術用語，接近母語者水平',
    image: '/level-advanced.png'
  }
]

export const LanguageLevels = () => {
  return (
    <section className="w-full py-16" style={{ backgroundColor: colors.primary }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.darkOlive }}>
          課程等級
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {levels.map((level, index) => (
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
                <div className="relative h-40 w-full">
                  <Image
                    src={level.image}
                    alt={`${level.level} Level Illustration`}
                    fill
                    className="object-contain"
                  />
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
                <button
                  className="w-full py-2 px-4 rounded-lg mt-4 transition-colors"
                  style={{ 
                    backgroundColor: colors.secondary,
                    color: colors.lightCream
                  }}
                >
                  了解更多
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 