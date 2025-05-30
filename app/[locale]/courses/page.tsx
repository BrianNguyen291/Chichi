import { CourseCard } from '@/components/ui/course-card';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { ChevronRight, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

interface CoursePageProps {
  params: {
    locale: string;
  };
}

const courses = {
  en: [
    {
      id: 'beginner',
      title: 'Beginner Vietnamese (A1-A2)',
      description: 'Start your Vietnamese language journey with our comprehensive beginner course. Learn basic vocabulary, grammar, and essential phrases for everyday communication.',
      features: [
        'Basic pronunciation and tones',
        'Essential vocabulary for daily life',
        'Simple sentence structures',
        'Introduction to Vietnamese culture'
      ],
      duration: '12 weeks',
      level: 'Beginner',
      price: 'NT$9,800',
      image: '/images/courses/beginner.jpg'
    },
    {
      id: 'intermediate',
      title: 'Intermediate Vietnamese (B1-B2)',
      description: 'Enhance your Vietnamese skills with our intermediate course. Focus on conversation, reading comprehension, and more complex grammar structures.',
      features: [
        'Conversational practice',
        'Reading comprehension',
        'Intermediate grammar',
        'Cultural insights'
      ],
      duration: '16 weeks',
      level: 'Intermediate',
      price: 'NT$12,800',
      image: '/images/courses/intermediate.jpg'
    },
    {
      id: 'advanced',
      title: 'Advanced Vietnamese (C1-C2)',
      description: 'Master Vietnamese with our advanced course. Perfect for those who want to achieve fluency and understand native speakers with ease.',
      features: [
        'Advanced conversation',
        'Business Vietnamese',
        'News and media analysis',
        'Academic writing'
      ],
      duration: '20 weeks',
      level: 'Advanced',
      price: 'NT$15,800',
      image: '/images/courses/advanced.jpg'
    },
    {
      id: 'business',
      title: 'Business Vietnamese',
      description: 'Specialized course focusing on business communication, professional vocabulary, and cultural etiquette in Vietnamese business settings.',
      features: [
        'Business communication',
        'Professional vocabulary',
        'Email and report writing',
        'Business culture and etiquette'
      ],
      duration: '10 weeks',
      level: 'Intermediate+',
      price: 'NT$14,800',
      image: '/images/courses/business.jpg'
    },
    {
      id: 'conversation',
      title: 'Conversation Practice',
      description: 'Improve your speaking and listening skills through guided conversations with native speakers on various topics.',
      features: [
        'Daily conversation practice',
        'Listening comprehension',
        'Pronunciation correction',
        'Idiomatic expressions'
      ],
      duration: '8 weeks',
      level: 'All Levels',
      price: 'NT$8,800',
      image: '/images/courses/conversation.jpg'
    },
    {
      id: 'hsk-preparation',
      title: 'Vietnamese Proficiency Test Preparation',
      description: 'Comprehensive preparation for the Vietnamese language proficiency tests with practice tests and test-taking strategies.',
      features: [
        'Test format review',
        'Practice tests',
        'Test-taking strategies',
        'Time management'
      ],
      duration: '6 weeks',
      level: 'All Levels',
      price: 'NT$10,800',
      image: '/images/courses/test-prep.jpg'
    }
  ],
  'zh-Hant': [
    {
      id: 'beginner',
      title: '初級越南語 (A1-A2)',
      description: '開始您的越南語學習之旅。學習基礎詞彙、語法和日常交流必備短語。',
      features: [
        '基礎發音和聲調',
        '日常生活必備詞彙',
        '簡單句型結構',
        '越南文化介紹'
      ],
      duration: '12 週',
      level: '初級',
      price: 'NT$9,800',
      image: '/images/courses/beginner.jpg'
    },
    {
      id: 'intermediate',
      title: '中級越南語 (B1-B2)',
      description: '提升您的越南語能力，專注於會話、閱讀理解和更複雜的語法結構。',
      features: [
        '會話練習',
        '閱讀理解',
        '中級語法',
        '文化見解'
      ],
      duration: '16 週',
      level: '中級',
      price: 'NT$12,800',
      image: '/images/courses/intermediate.jpg'
    },
    {
      id: 'advanced',
      title: '高級越南語 (C1-C2)',
      description: '掌握越南語，輕鬆理解母語人士的對話和內容。',
      features: [
        '高級會話',
        '商務越南語',
        '新聞媒體分析',
        '學術寫作'
      ],
      duration: '20 週',
      level: '高級',
      price: 'NT$15,800',
      image: '/images/courses/advanced.jpg'
    },
    {
      id: 'business',
      title: '商務越南語',
      description: '專注於商務溝通、專業詞彙和越南商務場合的文化禮儀。',
      features: [
        '商務溝通',
        '專業詞彙',
        '電子郵件和報告寫作',
        '商務文化與禮儀'
      ],
      duration: '10 週',
      level: '中級+',
      price: 'NT$14,800',
      image: '/images/courses/business.jpg'
    },
    {
      id: 'conversation',
      title: '會話練習',
      description: '通過與母語人士的指導對話，提高您的口語和聽力技能。',
      features: [
        '日常會話練習',
        '聽力理解',
        '發音矯正',
        '慣用表達'
      ],
      duration: '8 週',
      level: '所有級別',
      price: 'NT$8,800',
      image: '/images/courses/conversation.jpg'
    },
    {
      id: 'hsk-preparation',
      title: '越南語能力考試準備',
      description: '全面準備越南語能力考試，包括模擬試題和應試策略。',
      features: [
        '考試形式複習',
        '模擬試題',
        '應試策略',
        '時間管理'
      ],
      duration: '6 週',
      level: '所有級別',
      price: 'NT$10,800',
      image: '/images/courses/test-prep.jpg'
    }
  ],
  'zh-Hans': [
    {
      id: 'beginner',
      title: '初级越南语 (A1-A2)',
      description: '开始您的越南语学习之旅。学习基础词汇、语法和日常交流必备短语。',
      features: [
        '基础发音和声调',
        '日常生活必备词汇',
        '简单句型结构',
        '越南文化介绍'
      ],
      duration: '12 周',
      level: '初级',
      price: 'NT$9,800',
      image: '/images/courses/beginner.jpg'
    },
    {
      id: 'intermediate',
      title: '中级越南语 (B1-B2)',
      description: '提升您的越南语能力，专注于会话、阅读理解和更复杂的语法结构。',
      features: [
        '会话练习',
        '阅读理解',
        '中级语法',
        '文化见解'
      ],
      duration: '16 周',
      level: '中级',
      price: 'NT$12,800',
      image: '/images/courses/intermediate.jpg'
    },
    {
      id: 'advanced',
      title: '高级越南语 (C1-C2)',
      description: '掌握越南语，轻松理解母语人士的对话和内容。',
      features: [
        '高级会话',
        '商务越南语',
        '新闻媒体分析',
        '学术写作'
      ],
      duration: '20 周',
      level: '高级',
      price: 'NT$15,800',
      image: '/images/courses/advanced.jpg'
    },
    {
      id: 'business',
      title: '商务越南语',
      description: '专注于商务沟通、专业词汇和越南商务场合的文化礼仪。',
      features: [
        '商务沟通',
        '专业词汇',
        '电子邮件和报告写作',
        '商务文化与礼仪'
      ],
      duration: '10 周',
      level: '中级+',
      price: 'NT$14,800',
      image: '/images/courses/business.jpg'
    },
    {
      id: 'conversation',
      title: '会话练习',
      description: '通过与母语人士的指导对话，提高您的口语和听力技能。',
      features: [
        '日常会话练习',
        '听力理解',
        '发音矫正',
        '惯用表达'
      ],
      duration: '8 周',
      level: '所有级别',
      price: 'NT$8,800',
      image: '/images/courses/conversation.jpg'
    },
    {
      id: 'hsk-preparation',
      title: '越南语能力考试准备',
      description: '全面准备越南语能力考试，包括模拟试题和应试策略。',
      features: [
        '考试形式复习',
        '模拟试题',
        '应试策略',
        '时间管理'
      ],
      duration: '6 周',
      level: '所有级别',
      price: 'NT$10,800',
      image: '/images/courses/test-prep.jpg'
    }
  ]
};

// Translation fallbacks
const translations = {
  en: {
    title: 'Our Vietnamese Language Courses',
    subtitle: 'Choose the perfect course to start your Vietnamese language journey',
    cta: {
      title: 'Ready to start learning Vietnamese?',
      description: 'Join our community of language learners and start speaking Vietnamese with confidence.',
      button: 'Contact Us'
    }
  },
  'zh-Hant': {
    title: '我們的越南語課程',
    subtitle: '選擇適合您的課程，開始您的越南語學習之旅',
    cta: {
      title: '準備好開始學習越南語了嗎？',
      description: '加入我們的語言學習社群，自信地說越南語。',
      button: '聯繫我們'
    }
  },
  'zh-Hans': {
    title: '我们的越南语课程',
    subtitle: '选择适合您的课程，开始您的越南语学习之旅',
    cta: {
      title: '准备好开始学习越南语了吗？',
      description: '加入我们的语言学习社群，自信地说越南语。',
      button: '联系我们'
    }
  }
};

export default function CoursesPage({ params: { locale } }: CoursePageProps) {
  const currentLocale = (locale as 'en' | 'zh-Hant' | 'zh-Hans') || 'en';
  const t = translations[currentLocale] || translations.en;
  const courseList = courses[currentLocale] || courses.en;

  return (
    <div className="bg-white">

      {/* Courses Grid - Improved with section heading, filters and animations */}
      <Section id="courses" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Explore Our Courses</h2>
            <p className="text-lg text-gray-600 mb-8">Discover the perfect Vietnamese language course to match your learning goals and current proficiency level.</p>
            <div className="inline-flex flex-wrap justify-center gap-2 p-1 bg-gray-100 rounded-lg">
              <button className="px-4 py-2 text-sm font-medium rounded-md bg-white shadow-sm text-primary-700">All Levels</button>
              <button className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-200 transition-colors">Beginner</button>
              <button className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-200 transition-colors">Intermediate</button>
              <button className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-200 transition-colors">Advanced</button>
              <button className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-200 transition-colors">Specialized</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseList.map((course, index) => (
              <div key={course.id} className="transform transition-all duration-300 hover:translate-y-[-8px] opacity-0 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}>
                <CourseCard course={course} locale={locale} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Features Section - New section highlighting benefits */}
      <Section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Why Learn With Us?</h2>
            <p className="text-lg text-gray-600">Experience the benefits of our carefully designed Vietnamese language programs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Teachers</h3>
              <p className="text-gray-600">Learn from native Vietnamese speakers with years of teaching experience</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Structured Curriculum</h3>
              <p className="text-gray-600">Follow a well-designed learning path that ensures steady progress</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Conversation Practice</h3>
              <p className="text-gray-600">Regular speaking sessions to build your confidence in real-world situations</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Schedule</h3>
              <p className="text-gray-600">Choose from various time slots that fit your busy lifestyle</p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section - Improved with card design and better visual appeal */}
      <Section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-primary-800/90 z-10"></div>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/images/courses/cta-background.jpg")' }}></div>
                <div className="relative z-20 p-10 h-full flex flex-col justify-center text-white">
                  <h3 className="text-3xl font-bold mb-4">{t.cta.title}</h3>
                  <p className="text-primary-50 mb-6">{t.cta.description}</p>
                  <div className="flex space-x-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                          <div className="w-full h-full bg-primary-300"></div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm">Join 500+ students already learning</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-10 flex flex-col justify-center">
                <h4 className="text-2xl font-semibold mb-6 text-gray-900">Get Started Today</h4>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Flexible class schedules</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Small group sizes for personalized attention</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Online and in-person options available</span>
                  </div>
                </div>
                <Button asChild size="lg" className="bg-primary-600 hover:bg-primary-700 transition-all duration-300 w-full">
                  <Link href={`/${locale}/contact`}>
                    {t.cta.button}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
