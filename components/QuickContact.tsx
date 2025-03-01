'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { colors } from '@/lib/colors'
import Link from 'next/link'
import Image from 'next/image'

interface QuickContactProps {
  locale: string;
}

const translations = {
  vi: {
    contact: 'Liên hệ',
    message: 'Nhắn tin',
    call: 'Gọi điện',
  },
  en: {
    contact: 'Contact',
    message: 'Message',
    call: 'Call',
  },
  'zh-Hant': {
    contact: '聯絡',
    message: '傳訊息',
    call: '撥打電話',
  },
  'zh-Hans': {
    contact: '联系',
    message: '发消息',
    call: '拨打电话',
  }
}

const contactOptions = [
  { 
    type: 'line',
    icon: '/images/Line.png',
    link: 'https://line.me/ti/p/your-line-id'
  },
  {
    type: 'wechat',
    icon: '/images/Wechat.png',
    link: 'weixin://dl/chat?your-wechat-id'
  },
  {
    type: 'zalo',
    icon: '/images/zalo.png',
    link: 'https://zalo.me/your-zalo-id'
  },
  {
    type: 'phone',
    icon: '/images/phone.png',
    link: 'tel:+886123456789'
  }
]

export function QuickContact({ locale }: QuickContactProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const t = translations[locale as keyof typeof translations] || translations.en

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end space-y-2">
      {isExpanded && (
        <div className="flex flex-col items-end space-y-2 mb-2">
          {contactOptions.map((option) => (
            <Link 
              key={option.type}
              href={option.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-white rounded-full shadow-lg p-2 hover:scale-105 transition-transform"
            >
              <Image
                src={option.icon}
                alt={option.type}
                width={32}
                height={32}
                className="rounded-full"
              />
            </Link>
          ))}
        </div>
      )}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="rounded-full w-12 h-12 shadow-lg"
        style={{ 
          backgroundColor: colors.secondary,
          color: colors.lightCream
        }}
      >
        {isExpanded ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </Button>
    </div>
  )
} 