import Image from 'next/image'
import { Card } from '../ui/card'
import { colors } from '@/lib/colors'

interface CourseFeaturesProps {
  locale: string;
}

const translations = {
  vi: {
    title: 'Đặc điểm khóa học',
    subtitle: 'Đặc điểm của CHI CHI',
    features: [
      {
        title: 'Thực tiễn',
        description: 'Kết hợp chặt chẽ việc học tiếng Việt với ứng dụng thực tế, giúp việc học ngôn ngữ trở nên sống động và thiết thực hơn',
        image: '/images/course_feature/Practicality.jpg'
      },
      {
        title: '24 giờ xây dựng nền tảng vững chắc',
        description: 'Chương trình học tập hiệu quả giúp bạn xây dựng nền tảng tiếng Việt vững chắc chỉ trong 24 giờ học',
        image: '/images/course_feature/Solid_Foundation.jpg'
      },
      {
        title: 'Phương pháp giảng dạy đa dạng',
        description: 'Kết hợp các phương pháp học tập thính giác, thị giác và thực hành để đáp ứng mọi phong cách học tập',
        image: '/images/course_feature/Diverse_Teaching_Methods.png'
      },
      {
        title: 'Tài nguyên học tập phong phú',
        description: 'Sử dụng bài hát, phim và tạp chí tiếng Việt làm tài liệu học tập phong phú',
        image: '/images/course_feature/Rich_Learning_Resources.png'
      },
      {
        title: 'Khóa học cá nhân hóa',
        description: 'Mục tiêu học tập được thiết kế riêng với phản hồi liên tục và điều chỉnh linh hoạt theo tiến độ của bạn',
        image: '/images/course_feature/Personalized_Courses.jpg'
      },
      {
        title: 'Giảng dạy ngôn ngữ và văn hóa',
        description: 'Hòa mình vào văn hóa địa phương và hiểu biết về văn hóa nơi làm việc của Việt Nam',
        image: '/images/course_feature/Language_and_Cultural_Teaching.jpg'
      }
    ]
  },
  en: {
    title: 'Course Features',
    subtitle: 'CHI CHI Course Characteristics',
    features: [
      {
        title: 'Practicality',
        description: 'Closely integrating Vietnamese language learning with practical applications, making language learning more vivid and useful',
        image: '/images/course_feature/Practicality.jpg'
      },
      {
        title: '24-Hour Solid Foundation',
        description: 'Effective learning program helps you build a solid Vietnamese foundation in just 24 hours of study',
        image: '/images/course_feature/Solid_Foundation.jpg'
      },
      {
        title: 'Diverse Teaching Methods',
        description: 'Combining auditory, visual, and practical learning approaches to accommodate all learning styles',
        image: '/images/course_feature/Diverse_Teaching_Methods.png'
      },
      {
        title: 'Rich Learning Resources',
        description: 'Using Vietnamese songs, movies, and magazines as enriching learning materials',
        image: '/images/course_feature/Rich_Learning_Resources.png'
      },
      {
        title: 'Personalized Courses',
        description: 'Tailored learning objectives with continuous feedback and dynamic adjustments to your progress',
        image: '/images/course_feature/Personalized_Courses.jpg'
      },
      {
        title: 'Language and Cultural Teaching',
        description: 'Immersion in local culture and understanding of Vietnamese workplace culture',
        image: '/images/course_feature/Language_and_Cultural_Teaching.jpg'
      }
    ]
  },
  'zh-Hant': {
    title: '課程特色',
    subtitle: 'CHI CHI 的特色',
    features: [
      {
        title: '實用性',
        description: '將越南語的學習與實際應用緊密結合，讓語言學習自然得更加生動和實用',
        image: '/images/course_feature/Practicality.jpg'
      },
      {
        title: '24小時打造良好基礎',
        description: '高效學習計劃幫助您在短短24小時內建立穩固的越南語基礎',
        image: '/images/course_feature/Solid_Foundation.jpg'
      },
      {
        title: '多元化的教學方法',
        description: '結合聽覺、視覺和實踐型學習方法，適應所有學習風格',
        image: '/images/course_feature/Diverse_Teaching_Methods.png'
      },
      {
        title: '豐富的教學資源',
        description: '使用越南歌曲、電影以及雜誌作為豐富的學習材料',
        image: '/images/course_feature/Rich_Learning_Resources.png'
      },
      {
        title: '個人化課程',
        description: '量身定制的學習目標，持續反饋與動態調整您的學習進度',
        image: '/images/course_feature/Personalized_Courses.jpg'
      },
      {
        title: '語言與文化教學',
        description: '融入當地文化，了解越南職場文化',
        image: '/images/course_feature/Language_and_Cultural_Teaching.jpg'
      }
    ]
  },
  'zh-Hans': {
    title: '课程特色',
    subtitle: 'CHI CHI 的特色',
    features: [
      {
        title: '实用性',
        description: '将越南语的学习与实际应用紧密结合，让语言学习自然得更加生动和实用',
        image: '/images/course_feature/Practicality.jpg'
      },
      {
        title: '24小时打造良好基础',
        description: '高效学习计划帮助您在短短24小时内建立稳固的越南语基础',
        image: '/images/course_feature/Solid_Foundation.jpg'
      },
      {
        title: '多元化的教学方法',
        description: '结合听觉、视觉和实践型学习方法，适应所有学习风格',
        image: '/images/course_feature/Diverse_Teaching_Methods.png'
      },
      {
        title: '丰富的教学资源',
        description: '使用越南歌曲、电影以及杂志作为丰富的学习材料',
        image: '/images/course_feature/Rich_Learning_Resources.png'
      },
      {
        title: '个人化课程',
        description: '量身定制的学习目标，持续反馈与动态调整您的学习进度',
        image: '/images/course_feature/Personalized_Courses.jpg'
      },
      {
        title: '语言与文化教学',
        description: '融入当地文化，了解越南职场文化',
        image: '/images/course_feature/Language_and_Cultural_Teaching.jpg'
      }
    ]
  }
}

export const CourseFeatures = ({ locale }: CourseFeaturesProps) => {
  const t = translations[locale as keyof typeof translations] || translations.en

  return (
    <section id="courses" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2" style={{ color: colors.darkOlive }}>
            {t.title}
          </h2>
          <p className="text-xl font-medium" style={{ color: colors.grayGreen }}>
            {t.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.features.map((feature, index) => (
            <Card 
              key={index} 
              className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              style={{ backgroundColor: colors.primary }}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-0 transition-opacity" />
              </div>
              
              <div className="p-6">
                <h3 
                  className="text-xl font-semibold mb-3"
                  style={{ color: colors.darkOlive }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-sm"
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