import Image from 'next/image'
import { colors } from '@/lib/colors'

interface TeacherTeamProps {
  locale: string;
}

const translations = {
  vi: {
    title: 'Đội ngũ giáo viên xuất sắc',
    description: [
      'Tại Chi Chi Vietnamese, chúng tôi tự hào có đội ngũ giáo viên chuyên nghiệp, thông thạo tiếng Trung và có nhiều năm kinh nghiệm giảng dạy tại các trường đại học và trung tâm đào tạo ngôn ngữ uy tín.',
      'Họ hiểu rõ nhu cầu học tập của học viên ở mọi lứa tuổi và có nhiều phương pháp giảng dạy phong phú.',
      'Thông qua các hoạt động học tập tương tác, mô phỏng tình huống và trải nghiệm văn hóa, đội ngũ giáo viên của chúng tôi cam kết mang đến chất lượng giảng dạy tiếng Việt tốt nhất, giúp học viên nắm vững kỹ năng ngôn ngữ trong môi trường học tập thoải mái và vui vẻ.'
    ],
    teacherName: 'Cô Chi Chi - 7 năm kinh nghiệm giảng dạy',
    credentials: [
      'Học bổng Bộ Giáo dục Đài Loan',
      'Thạc sĩ Đại học Chính trị Quốc gia',
      'Đã đào tạo hơn 500 học viên và nhiều lớp tiếng Việt cho doanh nghiệp'
    ]
  },
  en: {
    title: 'Elite Teaching Team',
    description: [
      'At Chi Chi Vietnamese, we are proud to have a team of professional teachers who are fluent in Chinese and have many years of teaching experience at prestigious universities and language training centers.',
      'They understand the learning needs of students of all ages and have diverse teaching methods.',
      'Through interactive learning activities, situation simulations, and cultural experiences, our teaching team is committed to providing the best quality Vietnamese language teaching, helping students master language skills in a relaxed and enjoyable learning environment.'
    ],
    teacherName: 'Teacher Chi Chi - 7 Years Teaching Experience',
    credentials: [
      'Taiwan Ministry of Education Scholarship',
      'Master\'s Degree from National Chengchi University',
      'Trained over 500 students and corporate Vietnamese language classes'
    ]
  },
  'zh-Hant': {
    title: '菁英教師團隊',
    description: [
      '在芝芝越語，我們很自豪地擁有一支由資深教育專家組成的教師團隊，他們精通中文，並曾在多所知名大學和語言培訓機構任教多年。',
      '他們深深不同年齡層和不同背景學生的學習需求，能夠提供豐富多彩的教學方案。',
      '透過互動式教學、情境模擬和文化體驗活動，我們的老師團隊致力於提供高品質的越南語教學，幫助學生在輕鬆愉快的氛圍中掌握語言技能。'
    ],
    teacherName: '芝芝老師 - 七年教學經驗',
    credentials: [
      '台灣教育部獎學金',
      '國立政治大學碩士',
      '累積500位學生及各大企業越語培訓班'
    ]
  },
  'zh-Hans': {
    title: '精英教师团队',
    description: [
      '在芝芝越语，我们很自豪地拥有一支由资深教育专家组成的教师团队，他们精通中文，并曾在多所知名大学和语言培训机构任教多年。',
      '他们深深不同年龄层和不同背景学生的学习需求，能够提供丰富多彩的教学方案。',
      '通过互动式教学、情境模拟和文化体验活动，我们的老师团队致力于提供高品质的越南语教学，帮助学生在轻松愉快的氛围中掌握语言技能。'
    ],
    teacherName: '芝芝老师 - 七年教学经验',
    credentials: [
      '台湾教育部奖学金',
      '国立政治大学硕士',
      '累积500位学生及各大企业越语培训班'
    ]
  }
}

export const TeacherTeam = ({ locale }: TeacherTeamProps) => {
  const t = translations[locale as keyof typeof translations] || translations.en

  return (
    <section className="py-16 bg-[#f9f5f0]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/3c89a5ce595299e003408648c5f9f1e0.jpg"
                alt={t.teacherName}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
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
                {t.title}
              </h2>
              <div className="space-y-4 text-gray-700">
                {t.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Teacher Credentials */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-[#b17f4a] mb-4">
                {t.teacherName}
              </h3>
              <ul className="space-y-2 text-gray-700">
                {t.credentials.map((credential, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-[#b17f4a] rounded-full" />
                    <span>{credential}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Course Preview */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/dcd2748ed0b35c4db1d9bc9913687cb7.jpg"
                  alt="Vietnamese Popular Words Series 2"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/e21eb12c580c4af99dae01b7ce9b1130.jpg"
                  alt="Vietnamese Popular Words Series 1"
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