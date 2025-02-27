import Image from 'next/image'
import { Card } from '../ui/card'
import { colors } from '@/lib/colors'

export const HeroSection = () => {
  return (
    <section className="w-full py-12" style={{ backgroundColor: colors.primary }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Image
                src="/teacher-profile.jpg"
                alt="Teacher Profile"
                width={120}
                height={120}
                className="rounded-full border-4"
                style={{ borderColor: colors.secondary }}
              />
              <div>
                <h2 className="text-2xl font-semibold" style={{ color: colors.darkOlive }}>
                  Chi Chi 老師
                </h2>
                <p style={{ color: colors.grayGreen }}>專業華語教師</p>
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold" style={{ color: colors.darkOlive }}>
                越學越通
              </h1>
              <Card className="p-6" style={{ backgroundColor: colors.lightCream }}>
                <p className="text-lg" style={{ color: colors.darkOlive }}>
                  「空乏誠經三言語，實用：最強助詞！」
                </p>
                <p className="mt-2" style={{ color: colors.grayGreen }}>
                  透過有趣且實用的教學方式，幫助學生掌握華語精髓。
                </p>
              </Card>
            </div>
          </div>
          <div className="relative h-[400px] p-4 rounded-lg" style={{ backgroundColor: colors.lightCream }}>
            <Image
              src="/hanoi-illustration.png"
              alt="Hanoi Illustration"
              fill
              className="object-contain p-4"
            />
            <div className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-md">
              <Image
                src="/vietnam-flag.png"
                alt="Vietnam Flag"
                width={32}
                height={20}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 