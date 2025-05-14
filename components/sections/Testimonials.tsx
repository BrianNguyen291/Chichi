import { TestimonialCard, TestimonialProps } from '../ui/testimonial-card';
import { useTranslations, Locale } from '@/lib/i18n';

interface TestimonialsSectionProps {
  locale: Locale;
}

const testimonials: Record<Locale, TestimonialProps[]> = {
  'en': [
    {
      name: "Lê Vũ Linh Trang",
      role: "HSK 5 Student",
      content: "Studying Chinese at CCVN has been a great experience. The teachers are professional and the teaching methods are effective. I improved my HSK score significantly in just a few months.",
      rating: 5,
      image: "/testimonials/student1.jpg",
      language: "HSK"
    },
    {
      name: "Trần Huệ Lý",
      role: "HSK 3 Student",
      content: "After studying at CCVN, I gained confidence in my Chinese language skills. The practical approach and cultural insights helped me progress quickly and effectively.",
      rating: 5,
      image: "/testimonials/student2.jpg",
      language: "Chinese"
    },
    {
      name: "Nguyễn Phương Linh",
      role: "HSK 6 Student",
      content: "I've always wanted to study in China, but my Chinese wasn't good enough. After a year at CCVN, I improved dramatically and now I'm confident I'll achieve my HSK 6 goal.",
      rating: 5,
      image: "/testimonials/student3.jpg",
      language: "Chinese"
    },
    {
      name: "Sarah Johnson",
      role: "Vietnamese Learner",
      content: "Learning Vietnamese at CCVN has been an amazing experience. The cultural insights and patient teaching approach helped me progress quickly and communicate effectively.",
      rating: 5,
      image: "/testimonials/student4.jpg",
      language: "Vietnamese"
    }
  ],
  'zh-Hant': [
    {
      name: "黎武靈莊",
      role: "HSK 5級學生",
      content: "在CCVN學習中文是一次很棒的經歷。老師們很專業，教學方法也很有效。短短幾個月內，我的HSK成績就有了顯著提高。",
      rating: 5,
      image: "/testimonials/student1.jpg",
      language: "HSK"
    },
    {
      name: "陳慧麗",
      role: "HSK 3級學生",
      content: "在CCVN學習後，我對自己的中文能力更有信心。實用的教學方法和文化洞察力幫助我快速有效地進步。",
      rating: 5,
      image: "/testimonials/student2.jpg",
      language: "中文"
    },
    {
      name: "阮芳靈",
      role: "HSK 6級學生",
      content: "我一直想去中國留學，但我的中文不夠好。在CCVN學習一年後，我的中文有了顯著提高，現在我有信心能達到HSK 6的目標。",
      rating: 5,
      image: "/testimonials/student3.jpg",
      language: "中文"
    },
    {
      name: "莎拉·約翰遜",
      role: "越南語學習者",
      content: "在CCVN學習越南語是一次很棒的經歷。文化洞察和耐心的教學方式幫助我快速進步並有效溝通。",
      rating: 5,
      image: "/testimonials/student4.jpg",
      language: "越南語"
    }
  ],
  'zh-Hans': [
    {
      name: "黎武灵庄",
      role: "HSK 5级学生",
      content: "在CCVN学习中文是一次很棒的经历。老师们很专业，教学方法也很有效。短短几个月内，我的HSK成绩就有了显著提高。",
      rating: 5,
      image: "/testimonials/student1.jpg",
      language: "HSK"
    },
    {
      name: "陈慧丽",
      role: "HSK 3级学生",
      content: "在CCVN学习后，我对自己的中文能力更有信心。实用的教学方法和文化洞察力帮助我快速有效地进步。",
      rating: 5,
      image: "/testimonials/student2.jpg",
      language: "中文"
    },
    {
      name: "阮芳灵",
      role: "HSK 6级学生",
      content: "我一直想去中国留学，但我的中文不够好。在CCVN学习一年后，我的中文有了显著提高，现在我有信心能达到HSK 6的目标。",
      rating: 5,
      image: "/testimonials/student3.jpg",
      language: "中文"
    },
    {
      name: "莎拉·约翰逊",
      role: "越南语学习者",
      content: "在CCVN学习越南语是一次很棒的经历。文化洞察和耐心的教学方式帮助我快速进步并有效沟通。",
      rating: 5,
      image: "/testimonials/student4.jpg",
      language: "越南语"
    }
  ]
};

export function TestimonialsSection({ locale }: TestimonialsSectionProps) {
  const { t } = useTranslations(locale);
  const currentTestimonials = testimonials[locale] || testimonials['en'];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-700">
            STUDENT TESTIMONIALS
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.testimonials.subtitle}
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              {...testimonial}
            />
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t.testimonials.cta.text}
          </p>
          <button className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-colors">
            {t.testimonials.cta.button}
          </button>
        </div>
      </div>
    </section>
  );
}

export { TestimonialsSection as Testimonials }; 