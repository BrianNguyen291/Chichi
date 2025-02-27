import Image from 'next/image'
import { Card } from '../ui/card'
import { colors } from '@/lib/colors'

interface CourseFeaturesProps {
  locale: string;
}

const translations = {
  vi: {
    title: 'Đặc điểm khóa học',
    features: [
      {
        title: 'Học tập cá nhân hóa',
        description: 'Chương trình học được điều chỉnh theo nhu cầu của bạn',
        image: '/images/49918ef4a0f0ba16328b0447998eb231.jpg'
      },
      {
        title: 'Hòa nhập văn hóa',
        description: 'Tìm hiểu văn hóa và truyền thống Việt Nam',
        image: '/images/731328e082bb7038e8ef26bf1ddc1a06.jpg'
      },
      {
        title: 'Buổi thực hành',
        description: 'Thực hành giao tiếp thường xuyên với người bản xứ',
        image: '/images/1c53ae24f71b7e4a060c194914790792.jpg'
      },
      {
        title: 'Tài liệu học tập',
        description: 'Tài liệu và nguồn học tập toàn diện',
        image: '/images/789615a393e7b95a7c9b07fba2e57c6a.jpg'
      }
    ]
  },
  en: {
    title: 'Course Features',
    features: [
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
  },
  'zh-Hant': {
    title: '課程特色',
    features: [
      {
        title: '個人化學習',
        description: '根據您的需求定制課程',
        image: '/images/49918ef4a0f0ba16328b0447998eb231.jpg'
      },
      {
        title: '文化沉浸',
        description: '學習越南文化和傳統',
        image: '/images/731328e082bb7038e8ef26bf1ddc1a06.jpg'
      },
      {
        title: '實踐課程',
        description: '與母語者定期進行會話練習',
        image: '/images/1c53ae24f71b7e4a060c194914790792.jpg'
      },
      {
        title: '學習資料',
        description: '全面的學習材料和資源',
        image: '/images/789615a393e7b95a7c9b07fba2e57c6a.jpg'
      }
    ]
  },
  'zh-Hans': {
    title: '课程特色',
    features: [
      {
        title: '个人化学习',
        description: '根据您的需求定制课程',
        image: '/images/49918ef4a0f0ba16328b0447998eb231.jpg'
      },
      {
        title: '文化沉浸',
        description: '学习越南文化和传统',
        image: '/images/731328e082bb7038e8ef26bf1ddc1a06.jpg'
      },
      {
        title: '实践课程',
        description: '与母语者定期进行会话练习',
        image: '/images/1c53ae24f71b7e4a060c194914790792.jpg'
      },
      {
        title: '学习资料',
        description: '全面的学习材料和资源',
        image: '/images/789615a393e7b95a7c9b07fba2e57c6a.jpg'
      }
    ]
  }
}

export const CourseFeatures = ({ locale }: CourseFeaturesProps) => {
  const t = translations[locale as keyof typeof translations] || translations.en

  return (
    <section id="courses" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.darkOlive }}>
          {t.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {t.features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-lg transition-shadow"
              style={{ backgroundColor: colors.primary }}
            >
              <div className="space-y-4">
                <div className="relative h-64 w-full overflow-hidden rounded-lg">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-0 transition-opacity" />
                </div>
                <h3 
                  className="text-xl font-semibold text-center"
                  style={{ color: colors.darkOlive }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-center"
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