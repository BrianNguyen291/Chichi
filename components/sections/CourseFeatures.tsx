import Image from 'next/image'
import { Card } from '../ui/card'
import { colors } from '@/lib/colors'

const features = [
  {
    title: 'Personalized Learning',
    description: 'Customized curriculum based on your needs',
    image: '/images/49918ef4a0f0ba16328b0447998eb231.jpg'
  },
  {
    title: 'Cultural Immersion',
    description: 'Learn Vietnamese culture and traditions',
    image: '/images/731328e082bb7038e8ef26bf1ddc1a06.jpg'
  },
  {
    title: 'Practice Sessions',
    description: 'Regular conversation practice with native speakers',
    image: '/images/1c53ae24f71b7e4a060c194914790792.jpg'
  },
  {
    title: 'Learning Materials',
    description: 'Comprehensive study materials and resources',
    image: '/images/789615a393e7b95a7c9b07fba2e57c6a.jpg'
  }
]

export const CourseFeatures = () => {
  return (
    <section id="courses" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.darkOlive }}>
          課程特色
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group p-6 hover:shadow-xl focus-within:shadow-xl transition-all duration-300 cursor-pointer"
              style={{ backgroundColor: colors.primary }}
            >
              <div className="space-y-4">
                <div className="relative h-64 w-full overflow-hidden rounded-lg">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-opacity duration-300" />
                </div>
                <h3 
                  className="text-xl font-semibold text-center group-hover:text-[#b17f4a] transition-colors duration-300"
                  style={{ color: colors.darkOlive }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-center group-hover:text-gray-700 transition-colors duration-300"
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