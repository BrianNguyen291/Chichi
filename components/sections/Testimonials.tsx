import { TestimonialCard, TestimonialProps } from '../ui/testimonial-card';
import { useTranslations, Locale } from '@/lib/i18n';

interface TestimonialsSectionProps {
  locale: Locale;
}

const testimonials: Record<Locale, TestimonialProps[]> = {
  'en': [
    {
      name: "Nguyễn Văn A",
      role: "IELTS Student",
      content: "Thanks to CCVN, I improved my IELTS score from 6.0 to 7.5 in just 3 months. The teachers are very professional and supportive.",
      rating: 5,
      image: "/testimonials/student1.jpg",
      language: "IELTS"
    },
    {
      name: "李小明",
      role: "Business Chinese Student",
      content: "The business Chinese course helped me secure a job at a multinational company. The practical approach to teaching made all the difference.",
      rating: 5,
      image: "/testimonials/student2.jpg",
      language: "Business Chinese"
    },
    {
      name: "Sarah Johnson",
      role: "Vietnamese Learner",
      content: "Learning Vietnamese at CCVN has been an amazing experience. The cultural insights and patient teaching approach helped me progress quickly.",
      rating: 5,
      image: "/testimonials/student3.jpg",
      language: "Vietnamese"
    },
    {
      name: "王大明",
      role: "HSK 6 Student",
      content: "I prepared for HSK 6 at CCVN. The teachers are professional and the teaching methods are efficient. I achieved excellent results in HSK 6 in just three months.",
      rating: 5,
      image: "/testimonials/student4.jpg",
      language: "HSK"
    }
  ],
  'zh-Hant': [
    {
      name: "阮文明",
      role: "雅思考生",
      content: "感謝CCVN，我在短短三個月內將雅思成績從6.0提升到7.5。老師們非常專業且樂於協助。",
      rating: 5,
      image: "/testimonials/student1.jpg",
      language: "IELTS"
    },
    {
      name: "李小明",
      role: "商務中文學生",
      content: "商務中文課程幫助我在跨國公司找到工作。實用的教學方式讓我受益匪淺。",
      rating: 5,
      image: "/testimonials/student2.jpg",
      language: "商務中文"
    },
    {
      name: "Sarah Johnson",
      role: "越南語學習者",
      content: "在CCVN學習越南語是一次很棒的經歷。文化洞察和耐心的教學方式幫助我快速進步。",
      rating: 5,
      image: "/testimonials/student3.jpg",
      language: "越南語"
    },
    {
      name: "王大明",
      role: "HSK 6級考生",
      content: "我在CCVN準備HSK 6考試，老師們都很專業，教學方法也很有效率。三個月就考到了HSK 6優秀的成績。",
      rating: 5,
      image: "/testimonials/student4.jpg",
      language: "HSK"
    }
  ],
  'vi': [
    {
      name: "Nguyễn Văn A",
      role: "Học viên IELTS",
      content: "Nhờ CCVN, tôi đã cải thiện điểm IELTS từ 6.0 lên 7.5 chỉ trong 3 tháng. Các giáo viên rất chuyên nghiệp và nhiệt tình.",
      rating: 5,
      image: "/testimonials/student1.jpg",
      language: "IELTS"
    },
    {
      name: "李小明",
      role: "Học viên Tiếng Trung Thương mại",
      content: "Khóa học tiếng Trung thương mại đã giúp tôi có được công việc tại một công ty đa quốc gia. Phương pháp giảng dạy thực tế đã tạo nên sự khác biệt.",
      rating: 5,
      image: "/testimonials/student2.jpg",
      language: "Tiếng Trung Thương mại"
    },
    {
      name: "Sarah Johnson",
      role: "Học viên Tiếng Việt",
      content: "Học tiếng Việt tại CCVN là một trải nghiệm tuyệt vời. Hiểu biết về văn hóa và phương pháp giảng dạy kiên nhẫn đã giúp tôi tiến bộ nhanh chóng.",
      rating: 5,
      image: "/testimonials/student3.jpg",
      language: "Tiếng Việt"
    },
    {
      name: "王大明",
      role: "Học viên HSK 6",
      content: "Tôi đã chuẩn bị kỳ thi HSK 6 tại CCVN. Các giáo viên rất chuyên nghiệp và phương pháp giảng dạy hiệu quả. Tôi đã đạt được kết quả xuất sắc trong HSK 6 chỉ sau ba tháng.",
      rating: 5,
      image: "/testimonials/student4.jpg",
      language: "HSK"
    }
  ],
  'zh-Hans': [
    {
      name: "阮文明",
      role: "雅思考生",
      content: "感谢CCVN，我在短短三个月内将雅思成绩从6.0提升到7.5。老师们非常专业且乐于协助。",
      rating: 5,
      image: "/testimonials/student1.jpg",
      language: "IELTS"
    },
    {
      name: "李小明",
      role: "商务中文学生",
      content: "商务中文课程帮助我在跨国公司找到工作。实用的教学方式让我受益匪浅。",
      rating: 5,
      image: "/testimonials/student2.jpg",
      language: "商务中文"
    },
    {
      name: "Sarah Johnson",
      role: "越南语学习者",
      content: "在CCVN学习越南语是一次很棒的经历。文化洞察和耐心的教学方式帮助我快速进步。",
      rating: 5,
      image: "/testimonials/student3.jpg",
      language: "越南语"
    },
    {
      name: "王大明",
      role: "HSK 6级考生",
      content: "我在CCVN准备HSK 6考试，老师们都很专业，教学方法也很有效率。三个月就考到了HSK 6优秀的成绩。",
      rating: 5,
      image: "/testimonials/student4.jpg",
      language: "HSK"
    }
  ]
};

export function TestimonialsSection({ locale }: TestimonialsSectionProps) {
  const { t } = useTranslations(locale);
  const currentTestimonials = testimonials[locale] || testimonials['en'];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.testimonials.title}
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