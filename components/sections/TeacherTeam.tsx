import Image from 'next/image'
import { colors } from '@/lib/colors'

export const TeacherTeam = () => {
  return (
    <section className="py-16 bg-[#f9f5f0]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/3c89a5ce595299e003408648c5f9f1e0.jpg"
                alt="芝芝老師"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#f5e6d3] rounded-full -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#e6d5c3] rounded-full -z-10" />
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-[#b17f4a] mb-4">
                菁英教師團隊
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  在芝芝越語，我們很自豪地擁有一支由資深教育專家組成的教師團隊，他們精通中文，並曾在多所知名大學和語言培訓機構任教多年。
                </p>
                <p>
                  他們深深不同年齡層和不同背景學生的學習需求，能夠提供豐富多彩的教學方案。
                </p>
                <p>
                  透過互動式教學、情境模擬和文化體驗活動，我們的老師團隊致力於提供高品質的越南語教學，幫助學生在輕鬆愉快的氛圍中掌握語言技能。
                </p>
              </div>
            </div>

            {/* Teacher Credentials */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-[#b17f4a] mb-4">
                芝芝老師 - 七年教學經驗
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#b17f4a] rounded-full" />
                  <span>台灣教育部獎學金</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#b17f4a] rounded-full" />
                  <span>國立政治大學碩士</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#b17f4a] rounded-full" />
                  <span>累積500位學生及各大企業越語培訓班</span>
                </li>
              </ul>
            </div>

            {/* Course Preview */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/dcd2748ed0b35c4db1d9bc9913687cb7.jpg"
                  alt="越南語流行詞第二期"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/e21eb12c580c4af99dae01b7ce9b1130.jpg"
                  alt="越南語流行詞第一期"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 