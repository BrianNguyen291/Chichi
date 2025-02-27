import Image from 'next/image'
import { colors } from '@/lib/colors'

export const TeachingPhilosophy = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-[#b17f4a]">
                「芝芝越語三重奏」
              </h2>
              <h3 className="text-2xl font-semibold text-[#b17f4a] border-b-2 border-[#b17f4a] pb-2 inline-block">
                實用、趣味與個性
              </h3>
            </div>

            <div className="space-y-6 text-gray-700">
              <p>
                我們恆發「學以致用」，將越南語的學習與實際應用緊密結合，讓語言學習自然得更加生動和實用。
              </p>
              <p>
                我們客製每位學生的個性和需求，提供量身定制的學習計劃，確保每位人都能在「芝芝越語」找到適合自己的學習模式。
              </p>
              <p>
                我們堅持「以學生為中心」的教學理念，並著注於激發學生的學習興趣和潛能。
              </p>
              <p>
                「芝芝越語」透過越南語教學，讓更多人深入了解越南的風土人情。我們的教學不僅涵蓋語言知識，更融入文化元素，讓學生在學習越南語的同時，體驗文化的多樣性。
              </p>
            </div>
          </div>

          {/* Right side - Images */}
          <div className="grid grid-cols-1 gap-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/ac570c48637f2fbf770b7a0a738276a4.jpg"
                alt="越南語教學示範"
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-md">
                <Image
                  src="/images/b3776b3385d6b1ef3fee2d227a4330c0.jpg"
                  alt="越南語流行詞"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-md">
                <Image
                  src="/images/bc6f93456d5ab596f16d370666fc2505.jpg"
                  alt="越南語課程教材"
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