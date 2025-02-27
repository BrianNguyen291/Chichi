import Image from 'next/image'
import { Card } from '../ui/card'
import { colors } from '@/lib/colors'

const features = [
  {
    title: '專業教師團隊',
    description: '擁有豐富的越南語教學經驗，為您量身打造學習計畫。',
    image: '/team.png'
  },
  {
    title: '文化體驗',
    description: '不只是語言，更深入了解越南文化與生活方式。',
    image: '/culture.png'
  },
  {
    title: '彈性學習',
    description: '提供線上及實體課程，讓您隨時隨地都能學習。',
    image: '/flexible.png'
  }
]

export const CourseFeatures = () => {
  return (
    <section className="w-full py-16" style={{ backgroundColor: colors.lightCream }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.darkOlive }}>
          課程特色
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-lg transition-shadow"
              style={{ backgroundColor: colors.primary }}
            >
              <div className="space-y-4">
                <div className="relative h-48 w-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={160}
                      height={160}
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 
                  className="text-xl font-semibold text-center"
                  style={{ color: colors.darkOlive }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-center"
                  style={{ color: colors.grayGreen }}
                >
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 