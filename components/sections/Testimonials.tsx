'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { TestimonialCard, TestimonialProps } from '../ui/testimonial-card';
import { useTranslations, Locale } from '@/lib/i18n';

interface TestimonialsSectionProps {
  locale: Locale;
}

// Updated testimonials with real student feedback
const testimonials: Record<Locale, TestimonialProps[]> = {
  'en': [
    {
      name: "Dorin Tsai",
      role: "A0 Beginner Class",
      content: "Teacher's Chinese is excellent, and she understands the differences between Chinese and Vietnamese very well. She can explain pronunciation, vocabulary, grammar, etc. very clearly! With rich teaching experience, she truly understands where learners struggle. Highly recommend Teacher Chichi!!!",
      rating: 5,
      image: "/images/student_feedback/Dorin Tsai.png",
      language: "Chinese"
    },
    {
      name: "Kevin Hong",
      role: "B2 Intermediate Class",
      content: "Teacher Chichi's pronunciation is great, her Chinese is excellent, and she understands Chinese culture very well. She teaches with great patience, using various methods and covering diverse topics with good results. Highly recommended. I'll continue studying with her and hope for more progress.",
      rating: 5,
      image: "/images/student_feedback/Kevin Hong.png",
      language: "Vietnamese"
    },
    {
      name: "Jianxun Li",
      role: "B2 Intermediate Class",
      content: "Teacher Chichi's pronunciation is very standard, and her lessons are arranged in an interesting way. She understands Chinese culture well, which is great for beginners. The courses are rich and reasonable, and I feel I'm learning much faster than self-study.",
      rating: 5,
      image: "/images/student_feedback/Jianxun Li.png",
      language: "Vietnamese"
    },
    {
      name: "Brow Chen",
      role: "B1 Intermediate Class",
      content: "The teacher's teaching style is very lively and interesting. We can learn Vietnamese that Vietnamese people actually use in daily life from Vietnamese dramas, rather than rigidly following textbooks. This effectively improves students' listening and speaking abilities.",
      rating: 5,
      image: "/images/student_feedback/Brow Chen.png",
      language: "Vietnamese"
    },
    {
      name: "Shih-Yu Wu",
      role: "B1 Intermediate Class",
      content: "You can see how dedicated Teacher Chichi is to teaching from her presentations. I'm grateful to have met her on my Vietnamese language journey. I sincerely recommend her to friends who want to learn Vietnamese. You definitely won't regret it.",
      rating: 5,
      image: "/images/student_feedback/Shih-Yu Wu.png",
      language: "Vietnamese"
    },
    {
      name: "James Wang",
      role: "A1 Practical Conversation Class",
      content: "The A0 basic course allowed me to recognize Vietnamese characters and enter into simple daily conversations. The teacher also supplements the class with current events and popular phrases. One hour passes quickly, and with a little time spent reviewing and doing homework, I can keep up with the course progress.",
      rating: 5,
      image: "/images/student_feedback/James Wang.png",
      language: "Vietnamese"
    },
    {
      name: "Cathie Ho",
      role: "A0 Beginner Class",
      content: "My first teacher after moving to Vietnam, introduced by an English teacher friend who said Teacher Chichi's class presentations were thoughtful and she could accurately describe things in very standard Chinese. Indeed, her classes are lively and interesting, making time fly by. I'm happy I made the right choice and appreciate her sharing Vietnamese customs and daily life, helping me integrate into Vietnamese life more quickly.",
      rating: 5,
      image: "/images/student_feedback/Cathie Ho.png",
      language: "Vietnamese"
    },
    {
      name: "Bob Gu",
      role: "A1 Practical Conversation Class",
      content: "I've followed Teacher Chichi on Xiaohongshu for a long time. What attracted me was her beauty, well-made short videos, and her incredibly native Chinese that you wouldn't believe comes from a Vietnamese teacher. A friend advised me to learn northern Vietnamese accent, so I immediately added her and signed up for classes! The two-month course was brief but rewarding. She effectively corrected many of my Vietnamese pronunciations and taught me many words and conversations. Teacher Chichi focuses on interaction and guidance during class, so I quickly signed up for the second term! I strongly recommend her Vietnamese courses!",
      rating: 5,
      image: "/images/student_feedback/Bob Gu.png",
      language: "Vietnamese"
    }
  ],
  'zh-Hant': [
    {
      name: "蔡多琳",
      role: "零基礎A0班",
      content: "老師中文非常好，非常了解中文和越文的差異，不僅發音、單字、文法...等等，都可以講解非常清楚明白！教學經驗多，非常了解學習者的盲點在哪。大推芝芝老師！！！",
      rating: 5,
      image: "/images/student_feedback/Dorin Tsai.png",
      language: "中文"
    },
    {
      name: "洪凱文",
      role: "中級B2班",
      content: "芝芝老师发音很好，中文说的也非常好，而且很懂中国文化，讲课十分的耐心，方法也是各种各样，各种题材都会讲到，效果很好，推荐。tiếp tục học với cô ,hy vọng có nhiều hiệu quả.",
      rating: 5,
      image: "/images/student_feedback/Kevin Hong.png",
      language: "越南語"
    },
    {
      name: "李建勳",
      role: "中級B2班",
      content: "芝芝老师的发音很标准，课程安排的很有趣，她对中国的文化也很了解，对初学者来说很好，课程也很丰富和合理，感觉比自学要快的多。phát âm của cô Chi rất tiêu chuẩn, sắp xếp bài học rất thú vị, cô ấy rất tìm hiểu văn hoá về Trung Quốc, bài học cũng rất phong phú và hợp lý cho người mới, tôi cảm thấy học nhanh hơn tự học.",
      rating: 5,
      image: "/images/student_feedback/Jianxun Li.png",
      language: "越南語"
    },
    {
      name: "陳柏睿",
      role: "中級B1班",
      content: "老師的上課方式十分活潑、有趣，還能從越南影集中學習越南人生活中真正會使用的越語，而不是死板板照本宣科，能有效提升學生的聽、說能力。",
      rating: 5,
      image: "/images/student_feedback/Brow Chen.png",
      language: "越南語"
    },
    {
      name: "吳士瑜",
      role: "中級B1班",
      content: "從芝芝老師的簡報就看得出來很用心在教學準備 我很慶幸能在這條越南語言的道路上遇到老師 真心推薦想學越南語的朋友 絕對讓你不虛此行",
      rating: 5,
      image: "/images/student_feedback/Shih-Yu Wu.png",
      language: "越南語"
    },
    {
      name: "王建明",
      role: "實用對話A1班",
      content: "A0基礎課程讓我能辨識越南文字，還有進入簡單生活會話。老師在課中也補充時事與生活流行語，一個小時很快就過去了，再花點時間複習寫作業，都能跟上課程進度。",
      rating: 5,
      image: "/images/student_feedback/James Wang.png",
      language: "越南語"
    },
    {
      name: "何凱蒂",
      role: "零基礎A0班",
      content: "搬到越南後的第一位老師，是透過認識的英文老師介紹的，朋友說芝芝老師課堂簡報很用心，能很貼切的用非常標準的中文來形容事物，果然～上課起來生動有趣，讓我覺得上課時間過得很快，很開心我做了正確選擇，也謝謝老師可以在課堂分享很多越南的習俗、生活，讓我能更快的融入越南生活",
      rating: 5,
      image: "/images/student_feedback/Cathie Ho.png",
      language: "越南語"
    },
    {
      name: "顧博",
      role: "實用對話A1班",
      content: "Co Chi 芝芝老师是我在小红书上关注了好久的一位越南语老师，吸引我的原因是人美，小视频做得也是相当精致，而且你根本看不出她是越南老师，中文说的简直太地道了，简直比我都好，朋友一直劝我越南语一定要学北方口音，所以立马就加好友报课程啦！两个月的课程其实非常短暂，但是收获颇丰，不仅有效纠正了我很多的越南语发音，还学到了很多单词和对话，芝芝老师在上课过程中非常注重我们的互动和引导，所以第二期赶快给报上啊！在此，强烈推荐芝芝老师的越南语课程，走起！",
      rating: 5,
      image: "/images/student_feedback/Bob Gu.png",
      language: "越南語"
    }
  ],
  'zh-Hans': [
    {
      name: "蔡多琳",
      role: "零基础A0班",
      content: "老师中文非常好，非常了解中文和越文的差异，不仅发音、单字、文法...等等，都可以讲解非常清楚明白！教学经验多，非常了解学习者的盲点在哪。大推芝芝老师！！！",
      rating: 5,
      image: "/images/student_feedback/Dorin Tsai.png",
      language: "中文"
    },
    {
      name: "洪凯文",
      role: "中级B2班",
      content: "芝芝老师发音很好，中文说的也非常好，而且很懂中国文化，讲课十分的耐心，方法也是各种各样，各种题材都会讲到，效果很好，推荐。tiếp tục học với cô ,hy vọng có nhiều hiệu quả.",
      rating: 5,
      image: "/images/student_feedback/Kevin Hong.png",
      language: "越南语"
    },
    {
      name: "李建勋",
      role: "中级B2班",
      content: "芝芝老师的发音很标准，课程安排的很有趣，她对中国的文化也很了解，对初学者来说很好，课程也很丰富和合理，感觉比自学要快的多。phát âm của cô Chi rất tiêu chuẩn, sắp xếp bài học rất thú vị, cô ấy rất tìm hiểu văn hoá về Trung Quốc, bài học cũng rất phong phú và hợp lý cho người mới, tôi cảm thấy học nhanh hơn tự học.",
      rating: 5,
      image: "/images/student_feedback/Jianxun Li.png",
      language: "越南语"
    },
    {
      name: "陈柏睿",
      role: "中级B1班",
      content: "老师的上课方式十分活泼、有趣，还能从越南影集中学习越南人生活中真正会使用的越语，而不是死板板照本宣科，能有效提升学生的听、说能力。",
      rating: 5,
      image: "/images/student_feedback/Brow Chen.png",
      language: "越南语"
    },
    {
      name: "吴士瑜",
      role: "中级B1班",
      content: "从芝芝老师的简报就看得出来很用心在教学准备 我很庆幸能在这条越南语言的道路上遇到老师 真心推荐想学越南语的朋友 绝对让你不虚此行",
      rating: 5,
      image: "/images/student_feedback/Shih-Yu Wu.png",
      language: "越南语"
    },
    {
      name: "王建明",
      role: "实用对话A1班",
      content: "A0基础课程让我能辨识越南文字，还有进入简单生活会话。老师在课中也补充时事与生活流行语，一个小时很快就过去了，再花点时间复习写作业，都能跟上课程进度。",
      rating: 5,
      image: "/images/student_feedback/James Wang.png",
      language: "越南语"
    },
    {
      name: "何凯蒂",
      role: "零基础A0班",
      content: "搬到越南后的第一位老师，是通过认识的英文老师介绍的，朋友说芝芝老师课堂简报很用心，能很贴切的用非常标准的中文来形容事物，果然～上课起来生动有趣，让我觉得上课时间过得很快，很开心我做了正确选择，也谢谢老师可以在课堂分享很多越南的习俗、生活，让我能更快的融入越南生活",
      rating: 5,
      image: "/images/student_feedback/Cathie Ho.png",
      language: "越南语"
    },
    {
      name: "顾博",
      role: "实用对话A1班",
      content: "Co Chi 芝芝老师是我在小红书上关注了好久的一位越南语老师，吸引我的原因是人美，小视频做得也是相当精致，而且你根本看不出她是越南老师，中文说的简直太地道了，简直比我都好，朋友一直劝我越南语一定要学北方口音，所以立马就加好友报课程啦！两个月的课程其实非常短暂，但是收获颇丰，不仅有效纠正了我很多的越南语发音，还学到了很多单词和对话，芝芝老师在上课过程中非常注重我们的互动和引导，所以第二期赶快给报上啊！在此，强烈推荐芝芝老师的越南语课程，走起！",
      rating: 5,
      image: "/images/student_feedback/Bob Gu.png",
      language: "越南语"
    }
  ]
};

export function TestimonialsSection({ locale }: TestimonialsSectionProps) {
  const { t, translate } = useTranslations(locale);
  const currentTestimonials = testimonials[locale] || testimonials['en'];
  
  // Get translations for the testimonials section
  const testimonialsTitle = translate('title', 'testimonials');
  const testimonialsSubtitle = translate('subtitle', 'testimonials');
  const ctaText = translate('cta.text', 'testimonials');
  const ctaButton = translate('cta.button', 'testimonials');
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
    inViewThreshold: 0.7,
    dragFree: false,
    containScroll: 'trimSnaps',
    slidesToScroll: 3,
    breakpoints: {
      '(max-width: 768px)': { slidesToScroll: 1 },
      '(min-width: 769px) and (max-width: 1023px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  // Auto-scroll functionality
  useEffect(() => {
    if (!emblaApi) return;

    const autoScroll = setInterval(() => {
      const nextIndex = (selectedIndex + 1) % currentTestimonials.length;
      scrollTo(nextIndex);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(autoScroll);
  }, [emblaApi, selectedIndex, currentTestimonials.length, scrollTo]);

  // Update selected index
  useEffect(() => {
    if (!emblaApi) return;
    
    emblaApi.on('select', () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
    
    return () => {
      emblaApi.off('select');
    };
  }, [emblaApi]);

  return (
    <section className="py-16 bg-[#f9f5f0] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#b17f4a]">
            {testimonialsTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {testimonialsSubtitle}
          </p>
        </div>

        {/* Carousel container */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {currentTestimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button 
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 p-2 rounded-full bg-white/80 text-[#2A5C3F] shadow-md hover:bg-white transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <button 
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 p-2 rounded-full bg-white/80 text-[#2A5C3F] shadow-md hover:bg-white transition-colors z-10"
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {currentTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === selectedIndex ? 'bg-[#2A5C3F] w-8' : 'bg-gray-300'}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>


      </div>
    </section>
  );
}

export { TestimonialsSection as Testimonials }; 