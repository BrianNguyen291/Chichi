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
    <section className="py-16 md:py-24 bg-[#f9f5f0]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 xl:gap-16 items-start">
          {/* Main Image - Always visible */}
          <div className="relative max-w-[450px] mx-auto w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-square border-4 border-white">
              <Image
                src="/images/teacherteam.jpg"
                alt={t.teacherName}
                width={600}
                height={600}
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#f5e6d3] rounded-full -z-10 md:-bottom-6 md:-right-6 md:w-48 md:h-48" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#e6d5c3] rounded-full -z-10 md:-top-6 md:-left-6 md:w-32 md:h-32" />
          </div>

          {/* Content Section */}
          <div className="space-y-6 md:space-y-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-[#b17f4a] mb-6 
                leading-tight tracking-wide">
                {t.title}
              </h2>
              <div className="space-y-4 text-gray-700 md:text-lg leading-relaxed">
                {t.description.map((paragraph, index) => (
                  <p key={index} className="text-justify">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Second Image - Now visible on all screens */}
            <div className="max-w-[450px] mx-auto w-full rounded-xl overflow-hidden shadow-lg aspect-square border-4 border-white">
              <Image
                src="/images/teamcherteam2.jpg"
                alt="Teaching environment"
                width={600}
                height={600}
                className="object-cover"
              />
            </div>

            {/* Credentials Card */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg 
              transition-all hover:shadow-xl">
              <h3 className="text-xl md:text-2xl font-semibold text-[#b17f4a] mb-4 
                border-b-2 border-[#f5e6d3] pb-2">
                {t.teacherName}
              </h3>
              <ul className="space-y-3 md:space-y-4">
                {t.credentials.map((credential, index) => (
                  <li key={index} className="flex items-start space-x-3 group">
                    <span className="w-3 h-3 bg-[#b17f4a] rounded-full mt-1.5 
                      flex-shrink-0 transition-transform group-hover:scale-125" />
                    <span className="text-gray-700 md:text-lg leading-relaxed">
                      {credential}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 