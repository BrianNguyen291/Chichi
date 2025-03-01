'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { colors } from '@/lib/colors'
import Link from 'next/link'

interface CTAPopupProps {
  locale: string;
}

const translations = {
  vi: {
    title: 'Bắt đầu hành trình học tiếng Việt của bạn!',
    description: 'Đăng ký ngay để nhận tư vấn miễn phí và ưu đãi đặc biệt',
    courseButton: 'Xem lịch học',
    consultButton: 'Đăng ký tư vấn',
  },
  en: {
    title: 'Start Your Vietnamese Learning Journey!',
    description: 'Register now for free consultation and special offers',
    courseButton: 'View Schedule',
    consultButton: 'Get Consultation',
  },
  'zh-Hant': {
    title: '開始您的越南語學習之旅！',
    description: '立即註冊獲得免費諮詢和特別優惠',
    courseButton: '查看課程表',
    consultButton: '立即諮詢',
  },
  'zh-Hans': {
    title: '开始您的越南语学习之旅！',
    description: '立即注册获得免费咨询和特别优惠',
    courseButton: '查看课程表',
    consultButton: '立即咨询',
  }
}

export function CTAPopup({ locale }: CTAPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const t = translations[locale as keyof typeof translations] || translations.en

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleConsultClick = () => {
    // Replace with your Google Form URL
    window.open('https://forms.gle/your-form-url', '_blank')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] p-0 gap-0 bg-[#F4EFE5] rounded-lg">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
          </svg>
          <span className="sr-only">Close</span>
        </button>

        <div className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <h2 
              className="text-2xl font-bold"
              style={{ color: colors.darkOlive }}
            >
              {t.title}
            </h2>
            <p className="text-sm text-gray-600">
              {t.description}
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleConsultClick}
              className="w-full h-12 text-base font-medium bg-[#B5BEA7] hover:bg-[#A5AD98] text-white"
            >
              {t.consultButton}
            </Button>

            <Link href={`/${locale}/courses`} className="block w-full">
              <Button
                variant="outline"
                className="w-full h-12 text-base font-medium border-2 border-[#B5BEA7] text-[#6A6F5F] hover:bg-[#F9F6F0]"
              >
                {t.courseButton}
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 