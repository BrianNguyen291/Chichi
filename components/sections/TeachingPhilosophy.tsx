import Image from 'next/image'
import { colors } from '@/lib/colors'

interface TeachingPhilosophyProps {
  locale: string;
}

const translations = {
  vi: {
    title: 'Ba Yếu Tố Chính của Chi Chi',
    subtitle: 'Thực tế - Thú vị - Cá nhân hóa',
    description: [
      'Chúng tôi luôn đặt "học đi đôi với hành" làm trọng tâm, kết hợp việc học tiếng Việt với ứng dụng thực tế, giúp việc học ngôn ngữ trở nên sinh động và thiết thực hơn.',
      'Chúng tôi tùy chỉnh theo tính cách và nhu cầu của từng học viên, cung cấp kế hoạch học tập phù hợp, đảm bảo mỗi người đều có thể tìm thấy phương pháp học phù hợp tại Chi Chi.',
      'Chúng tôi kiên định với phương pháp "lấy học viên làm trung tâm", tập trung vào việc khơi dậy hứng thú và tiềm năng học tập của học viên.',
      'Thông qua việc giảng dạy tiếng Việt, Chi Chi giúp nhiều người hiểu sâu hơn về phong tục tập quán Việt Nam. Chương trình giảng dạy của chúng tôi không chỉ bao gồm kiến thức ngôn ngữ mà còn tích hợp các yếu tố văn hóa, giúp học viên trải nghiệm sự đa dạng văn hóa trong quá trình học tiếng Việt.'
    ]
  },
  en: {
    title: 'Chi Chi\'s Three Pillars',
    subtitle: 'Practical - Fun - Personalized',
    description: [
      'We always emphasize "learning through practice", combining Vietnamese language learning with practical applications, making language learning more dynamic and relevant.',
      'We customize according to each student\'s personality and needs, providing suitable learning plans to ensure everyone can find their appropriate learning method at Chi Chi.',
      'We adhere to a "student-centered" approach, focusing on sparking students\' interest and learning potential.',
      'Through Vietnamese language teaching, Chi Chi helps more people understand Vietnamese customs deeply. Our curriculum not only includes language knowledge but also integrates cultural elements, helping students experience cultural diversity while learning Vietnamese.'
    ]
  },
  'zh-Hant': {
    title: '「芝芝越語三重奏」',
    subtitle: '實用、趣味與個性',
    description: [
      '我們恆發「學以致用」，將越南語的學習與實際應用緊密結合，讓語言學習自然得更加生動和實用。',
      '我們客製每位學生的個性和需求，提供量身定制的學習計劃，確保每位人都能在「芝芝越語」找到適合自己的學習模式。',
      '我們堅持「以學生為中心」的教學理念，並著注於激發學生的學習興趣和潛能。',
      '「芝芝越語」透過越南語教學，讓更多人深入了解越南的風土人情。我們的教學不僅涵蓋語言知識，更融入文化元素，讓學生在學習越南語的同時，體驗文化的多樣性。'
    ]
  },
  'zh-Hans': {
    title: '「芝芝越语三重奏」',
    subtitle: '实用、趣味与个性',
    description: [
      '我们恒发「学以致用」，将越南语的学习与实际应用紧密结合，让语言学习自然得更加生动和实用。',
      '我们定制每位学生的个性和需求，提供量身定制的学习计划，确保每位人都能在「芝芝越语」找到适合自己的学习模式。',
      '我们坚持「以学生为中心」的教学理念，并着注于激发学生的学习兴趣和潜能。',
      '「芝芝越语」通过越南语教学，让更多人深入了解越南的风土人情。我们的教学不仅涵盖语言知识，更融入文化元素，让学生在学习越南语的同时，体验文化的多样性。'
    ]
  }
}

export const TeachingPhilosophy = ({ locale }: TeachingPhilosophyProps) => {
  const t = translations[locale as keyof typeof translations] || translations.en
  const isEnglish = locale === 'en'

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className={`text-3xl font-bold text-[#b17f4a] ${isEnglish ? 'font-en' : 'font-zh'}`}>
                {t.title}
              </h2>
              <h3 className={`text-2xl font-medium text-[#b17f4a] border-b-2 border-[#b17f4a] pb-2 inline-block ${isEnglish ? 'font-en' : 'font-zh'}`}>
                {t.subtitle}
              </h3>
            </div>

            <div className={`space-y-6 text-gray-700 font-base ${isEnglish ? 'font-en' : 'font-zh'}`}>
              {t.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Right side - Images */}
          <div className="grid grid-cols-1 gap-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/ac570c48637f2fbf770b7a0a738276a4.jpg"
                alt={t.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-md">
                <Image
                  src="/images/b3776b3385d6b1ef3fee2d227a4330c0.jpg"
                  alt={t.subtitle}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-md">
                <Image
                  src="/images/bc6f93456d5ab596f16d370666fc2505.jpg"
                  alt={t.subtitle}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
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