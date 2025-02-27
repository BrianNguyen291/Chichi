import Image from 'next/image'
import { Card } from '../ui/card'
import { colors } from '@/lib/colors'

const levels = [
  {
    level: 'A1-A2',
    title: 'Beginner',
    description: 'Start your Vietnamese journey',
    image: '/images/57f31c9320e1de5769cbf4669ff6fbbd.jpg'
  },
  {
    level: 'B1-B2',
    title: 'Intermediate',
    description: 'Enhance your communication skills',
    image: '/images/d0c3616a88054c9141e871e80e992bd9.jpg'
  },
  {
    level: 'C1-C2',
    title: 'Advanced',
    description: 'Master complex Vietnamese concepts',
    image: '/images/f92a926edc6969013d29f39ed1d17d40.jpg'
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
                <button
                  className="w-full py-2 px-4 rounded-lg mt-4 transition-colors hover:opacity-90"
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