import Image from 'next/image'
import { colors } from '@/lib/colors'

interface TeacherTeamProps {
  locale: string;
}

const translations = {
  en: {
    title: 'Elite Teaching Team',
    description: [
      'At Chi Chi Vietnamese, we are proud to have a team of professional teachers who are fluent in Chinese and have many years of teaching experience at prestigious universities and language training centers.',
      'They understand the learning needs of students of all ages and have diverse teaching methods.',
      'Through interactive learning activities, situation simulations, and cultural experiences, our teaching team is committed to providing the best quality Vietnamese language teaching, helping students master language skills in a relaxed and enjoyable learning environment.'
    ],
    teachers: [
      {
        name: 'Teacher Chi Chi',
        image: '/images/teacher_team/芝芝老師.jpeg',
        experience: '10 Years Teaching Experience',
        credentials: [
          'Master\'s Degree from National Chengchi University',
          'Taiwan Ministry of Education Scholarship',
          'Trained over 500 students and corporate Vietnamese language classes'
        ]
      },
      {
        name: 'Teacher Xu Biye',
        image: '/images/teacher_team/徐碧葉老師.jpeg',
        experience: '8 Years Teaching Experience',
        credentials: [
          'Ph.D. from Wuhan University',
          'Specialized in Vietnamese language and culture education',
          'Expert in academic Vietnamese language instruction'
        ]
      },
      {
        name: 'Teacher Li Baozhu',
        image: '/images/teacher_team/黎寶珠老師.jpeg',
        experience: '10 Years Teaching Experience',
        credentials: [
          'Master\'s Degree from National Chengchi University',
          'Specialized in conversational Vietnamese',
          'Business Vietnamese language expert'
        ]
      },
      {
        name: 'Teacher Ruan Qingxiang',
        image: '/images/teacher_team/阮清香老師.jpeg',
        experience: '10 Years Teaching Experience',
        credentials: [
          'Master\'s Degree from Southwest University',
          'Specialized in Vietnamese literature and writing',
          'Cultural immersion teaching expert'
        ]
      },
      {
        name: 'Teacher Wu Chuiying',
        image: '/images/teacher_team/武垂英老師.jpeg',
        experience: '5 Years Teaching Experience',
        credentials: [
          'Master\'s Degree from National Sun Yat-sen University',
          'Specialized in modern Vietnamese',
          'Innovative teaching methodology expert'
        ]
      },
      {
        name: 'Teacher Yin Yicao',
        image: '/images/teacher_team/尹伊草.jpeg',
        experience: '5 Years Teaching Experience',
        credentials: [
          'Master\'s Degree from Shanghai University',
          'Specialized in Vietnamese for beginners',
          'Interactive learning approach specialist'
        ]
      }
    ]
  },
  'zh-Hant': {
    title: '菁英教師團隊',
    description: [
      '在芝芝越語，我們很自豪地擁有一支由資深教育專家組成的教師團隊，他們精通中文，並曾在多所知名大學和語言培訓機構任教多年。',
      '他們深深不同年齡層和不同背景學生的學習需求，能夠提供豐富多彩的教學方案。',
      '透過互動式教學、情境模擬和文化體驗活動，我們的老師團隊致力於提供高品質的越南語教學，幫助學生在輕鬆愉快的氛圍中掌握語言技能。'
    ],
    teachers: [
      {
        name: '芝芝老師',
        image: '/images/teacher_team/芝芝老師.jpeg',
        experience: '10年教學經驗',
        credentials: [
          '國立政治大學碩士學位',
          '台灣教育部獎學金',
          '累積500位學生及各大企業越語培訓班'
        ]
      },
      {
        name: '徐碧葉老師',
        image: '/images/teacher_team/徐碧葉老師.jpeg',
        experience: '8年教學經驗',
        credentials: [
          '武漢大學博士學位',
          '專精越南語言與文化教育',
          '學術越南語教學專家'
        ]
      },
      {
        name: '黎寶珠老師',
        image: '/images/teacher_team/黎寶珠老師.jpeg',
        experience: '10年教學經驗',
        credentials: [
          '國立政治大學碩士學位',
          '專精越南語會話教學',
          '商業越南語專家'
        ]
      },
      {
        name: '阮清香老師',
        image: '/images/teacher_team/阮清香老師.jpeg',
        experience: '10年教學經驗',
        credentials: [
          '西南大學碩士畢業',
          '專精越南文學與寫作',
          '文化沉浸式教學專家'
        ]
      },
      {
        name: '武垂英老師',
        image: '/images/teacher_team/武垂英老師.jpeg',
        experience: '5年教學經驗',
        credentials: [
          '國立中山大學碩士學位',
          '專精現代越南語',
          '創新教學方法專家'
        ]
      },
      {
        name: '尹伊草老師',
        image: '/images/teacher_team/尹伊草.jpeg',
        experience: '5年教學經驗',
        credentials: [
          '上海大學碩士學位',
          '專精初學者越南語教學',
          '互動學習方法專家'
        ]
      }
    ]
  },
  'zh-Hans': {
    title: '精英教师团队',
    description: [
      '在芝芝越语，我们很自豪地拥有一支由资深教育专家组成的教师团队，他们精通中文，并曾在多所知名大学和语言培训机构任教多年。',
      '他们深深不同年龄层和不同背景学生的学习需求，能够提供丰富多彩的教学方案。',
      '通过互动式教学、情境模拟和文化体验活动，我们的老师团队致力于提供高品质的越南语教学，帮助学生在轻松愉快的氛围中掌握语言技能。'
    ],
    teachers: [
      {
        name: '芝芝老师',
        image: '/images/teacher_team/芝芝老師.jpeg',
        experience: '10年教学经验',
        credentials: [
          '国立政治大学硕士学位',
          '台湾教育部奖学金',
          '累积500位学生及各大企业越语培训班'
        ]
      },
      {
        name: '徐碧叶老师',
        image: '/images/teacher_team/徐碧葉老師.jpeg',
        experience: '8年教学经验',
        credentials: [
          '武汉大学博士学位',
          '专精越南语言与文化教育',
          '学术越南语教学专家'
        ]
      },
      {
        name: '黎宝珠老师',
        image: '/images/teacher_team/黎寶珠老師.jpeg',
        experience: '10年教学经验',
        credentials: [
          '国立政治大学硕士学位',
          '专精越南语会话教学',
          '商业越南语专家'
        ]
      },
      {
        name: '阮清香老师',
        image: '/images/teacher_team/阮清香老師.jpeg',
        experience: '10年教学经验',
        credentials: [
          '西南大学硕士毕业',
          '专精越南文学与写作',
          '文化沉浸式教学专家'
        ]
      },
      {
        name: '武垂英老师',
        image: '/images/teacher_team/武垂英老師.jpeg',
        experience: '5年教学经验',
        credentials: [
          '国立中山大学硕士学位',
          '专精现代越南语',
          '创新教学方法专家'
        ]
      },
      {
        name: '尹伊草老师',
        image: '/images/teacher_team/尹伊草.jpeg',
        experience: '5年教学经验',
        credentials: [
          '上海大学硕士学位',
          '专精初学者越南语教学',
          '互动学习方法专家'
        ]
      }
    ]
  }
}

export const TeacherTeam = ({ locale }: TeacherTeamProps) => {
  const t = translations[locale as keyof typeof translations] || translations.en

  return (
    <section className="py-16 md:py-24 bg-[#f9f5f0]">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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

        {/* Teacher Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {t.teachers.map((teacher, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg 
              transition-all hover:shadow-xl transform hover:-translate-y-1 duration-300">
              {/* Teacher Image */}
              <div className="relative h-[280px] overflow-hidden border-b-4 border-[#f5e6d3]">
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  fill
                  className="object-cover object-center"
                />
              </div>
              
              {/* Teacher Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#b17f4a] mb-1">
                  {teacher.name}
                </h3>
                <p className="text-gray-600 mb-4 italic">
                  {teacher.experience}
                </p>
                
                {/* Credentials */}
                <ul className="space-y-2">
                  {teacher.credentials.map((credential, idx) => (
                    <li key={idx} className="flex items-start space-x-3 group">
                      <span className="w-2.5 h-2.5 bg-[#b17f4a] rounded-full mt-1.5 
                        flex-shrink-0 transition-transform group-hover:scale-125" />
                      <span className="text-gray-700 text-sm">
                        {credential}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="relative mt-20 pt-16 border-t border-[#e6d5c3]">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 
            w-20 h-20 bg-[#f5e6d3] rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-[#b17f4a] bg-opacity-20 rounded-full flex items-center justify-center">
              <div className="w-10 h-10 bg-[#b17f4a] bg-opacity-40 rounded-full"></div>
            </div>
          </div>
          
          <p className="text-center text-lg text-[#b17f4a] font-medium">
            {locale === 'en' ? 'Learn from the best Vietnamese language experts' : 
              locale === 'zh-Hans' ? '向最优秀的越南语专家学习' : '向最優秀的越南語專家學習'}
          </p>
        </div>
      </div>
    </section>
  )
} 