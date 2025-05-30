import Image from 'next/image'
import { Card } from '../ui/card'
import { colors } from '@/lib/colors'

interface LearningEnvironmentProps {
  locale: string;
}

const translations = {
  vi: {
    title: 'Môi Trường Học Tập',
    environments: [
      {
        title: 'Lớp Luyện Thi Chứng Chỉ Tiếng Việt',
        description: 'Hệ thống ôn tập chuyên sâu cho các cấp độ A, B, C',
        mainImage: '/images/bc6f93456d5ab596f16d370666fc2505.jpg',
        gallery: [
          '/images/3ae8b397517ba03b8c1dec88320f9d74.jpg',
          '/images/dd52bb68ee30a2f330ae132e6501b9e5.jpg',
          '/images/731328e082bb7038e8ef26bf1ddc1a06.jpg',
        ]
      },
      {
        title: 'Lớp Doanh Nghiệp Tiếng Việt',
        description: 'Giải pháp đào tạo tiếng Việt thiết kế riêng cho doanh nghiệp',
        mainImage: '/images/dcd2748ed0b35c4db1d9bc9913687cb7.jpg',
        gallery: [
          '/images/e21eb12c580c4af99dae01b7ce9b1130.jpg',
          '/images/ecbeef49cfc718c408753081eeb56f9b.jpg',
          '/images/1c53ae24f71b7e4a060c194914790792.jpg',
        ]
      }
    ]
  },
  en: {
    title: 'Learning Environment',
    environments: [
      {
        title: 'Vietnamese Certification Course',
        description: 'Systematic preparation for LEVEL A, B, and C certifications',
        mainImage: '/images/bc6f93456d5ab596f16d370666fc2505.jpg',
        gallery: [
          '/images/3ae8b397517ba03b8c1dec88320f9d74.jpg',
          '/images/dd52bb68ee30a2f330ae132e6501b9e5.jpg',
          '/images/731328e082bb7038e8ef26bf1ddc1a06.jpg',
        ]
      },
      {
        title: 'Business Vietnamese Solutions',
        description: 'Customized corporate training programs',
        mainImage: '/images/dcd2748ed0b35c4db1d9bc9913687cb7.jpg',
        gallery: [
          '/images/e21eb12c580c4af99dae01b7ce9b1130.jpg',
          '/images/ecbeef49cfc718c408753081eeb56f9b.jpg',
          '/images/1c53ae24f71b7e4a060c194914790792.jpg',
        ]
      }
    ]
  },
  'zh-Hant': {
    title: '多元學習環境',
    environments: [
      

      {
        title: '越南語檢定衝刺班',
        description: '系統備考 LEVEL A、LEVEL B、LEVEL C',
        mainImage: '/images/bc6f93456d5ab596f16d370666fc2505.jpg',
        gallery: [
          '/images/3ae8b397517ba03b8c1dec88320f9d74.jpg',
          '/images/dd52bb68ee30a2f330ae132e6501b9e5.jpg',
          '/images/731328e082bb7038e8ef26bf1ddc1a06.jpg',
        ]
      },
      {
        title: '越南語企業方案',
        description: '量身定制的企業培訓課程',
        mainImage: '/images/dcd2748ed0b35c4db1d9bc9913687cb7.jpg',
        gallery: [
          '/images/e21eb12c580c4af99dae01b7ce9b1130.jpg',
          '/images/ecbeef49cfc718c408753081eeb56f9b.jpg',
          '/images/1c53ae24f71b7e4a060c194914790792.jpg',
        ]
      }
    ]
  },
  'zh-Hans': {
    title: '多元学习环境',
    environments: [
    
      
      {
        title: '越南语检定冲刺班',
        description: '系统备考 LEVEL A、LEVEL B、LEVEL C',
        mainImage: '/images/bc6f93456d5ab596f16d370666fc2505.jpg',
        gallery: [
          '/images/3ae8b397517ba03b8c1dec88320f9d74.jpg',
          '/images/dd52bb68ee30a2f330ae132e6501b9e5.jpg',
          '/images/731328e082bb7038e8ef26bf1ddc1a06.jpg',
        ]
      },
      {
        title: '越南语企业方案',
        description: '量身定制的企业培训课程',
        mainImage: '/images/dcd2748ed0b35c4db1d9bc9913687cb7.jpg',
        gallery: [
          '/images/e21eb12c580c4af99dae01b7ce9b1130.jpg',
          '/images/ecbeef49cfc718c408753081eeb56f9b.jpg',
          '/images/1c53ae24f71b7e4a060c194914790792.jpg',
        ]
      }
    ]
  }
}

export const LearningEnvironment = ({ locale }: LearningEnvironmentProps) => {
  const t = translations[locale as keyof typeof translations] || translations.en

  return (
    <section className="w-full py-16" style={{ backgroundColor: colors.lightCream }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.darkOlive }}>
          {t.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.environments.map((env, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-lg transition-shadow"
              style={{ backgroundColor: colors.primary }}
            >
              <div className="space-y-4">
                <h3 
                  className="text-2xl font-semibold text-center"
                  style={{ color: colors.darkOlive }}
                >
                  {env.title}
                </h3>
                <div className="relative h-72 w-full rounded-lg overflow-hidden">
                  <Image
                    src={env.mainImage}
                    alt={env.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div 
                    className="absolute inset-0 bg-black bg-opacity-30"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {env.gallery.map((img, i) => (
                    <div key={i} className="relative h-32 rounded-lg overflow-hidden">
                      <Image
                        src={img}
                        alt={`${env.title} Gallery ${i + 1}`}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 33vw, 16vw"
                      />
                      <div 
                        className="absolute inset-0 bg-black bg-opacity-20"
                      />
                    </div>
                  ))}
                </div>
                <p 
                  className="text-center"
                  style={{ color: colors.grayGreen }}
                >
                  {env.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 