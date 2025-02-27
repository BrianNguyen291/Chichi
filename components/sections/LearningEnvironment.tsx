import Image from 'next/image'
import { Card } from '../ui/card'
import { colors } from '@/lib/colors'

export const LearningEnvironment = () => {
  return (
    <section className="w-full py-16" style={{ backgroundColor: colors.lightCream }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.darkOlive }}>
          多元學習環境
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Online Classes */}
          <Card 
            className="p-6 hover:shadow-lg transition-shadow"
            style={{ backgroundColor: colors.primary }}
          >
            <div className="space-y-4">
              <h3 
                className="text-2xl font-semibold text-center"
                style={{ color: colors.darkOlive }}
              >
                線上課程
              </h3>
              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                <Image
                  src="/online-class.jpg"
                  alt="Online Class Environment"
                  fill
                  className="object-cover"
                />
                <div 
                  className="absolute inset-0"
                  style={{ backgroundColor: `${colors.darkOlive}20` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative h-24 rounded-lg overflow-hidden">
                    <Image
                      src={`/zoom-class-${i}.jpg`}
                      alt={`Zoom Class ${i}`}
                      fill
                      className="object-cover"
                    />
                    <div 
                      className="absolute inset-0 hover:opacity-0 transition-opacity"
                      style={{ backgroundColor: `${colors.darkOlive}20` }}
                    />
                  </div>
                ))}
              </div>
              <p 
                className="text-center"
                style={{ color: colors.grayGreen }}
              >
                靈活的線上學習，打破時空限制
              </p>
            </div>
          </Card>

          {/* Offline Classes */}
          <Card 
            className="p-6 hover:shadow-lg transition-shadow"
            style={{ backgroundColor: colors.primary }}
          >
            <div className="space-y-4">
              <h3 
                className="text-2xl font-semibold text-center"
                style={{ color: colors.darkOlive }}
              >
                實體課程
              </h3>
              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                <Image
                  src="/offline-class.jpg"
                  alt="Offline Class Environment"
                  fill
                  className="object-cover"
                />
                <div 
                  className="absolute inset-0"
                  style={{ backgroundColor: `${colors.darkOlive}20` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative h-24 rounded-lg overflow-hidden">
                    <Image
                      src={`/classroom-${i}.jpg`}
                      alt={`Classroom ${i}`}
                      fill
                      className="object-cover"
                    />
                    <div 
                      className="absolute inset-0 hover:opacity-0 transition-opacity"
                      style={{ backgroundColor: `${colors.darkOlive}20` }}
                    />
                  </div>
                ))}
              </div>
              <p 
                className="text-center"
                style={{ color: colors.grayGreen }}
              >
                面對面互動，深入文化交流
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
} 