'use client'

import { useState, useEffect } from 'react'
// Removed toggle button to always show contact options
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
    link: 'https://line.me/ti/p/cynCJgm3Xu',
    label: 'hayleenguyen'
  },
  {
    type: 'wechat',
    icon: '/images/Wechat.png',
    link: 'weixin://dl/chat?zhizhiyueyu',
    label: 'zhizhiyueyu'
  },
  {
    type: 'zalo',
    icon: '/images/zalo.png',
    link: 'https://zalo.me/84966352690',
    label: '+84 966 352 690'
  },
  {
    type: 'email',
    icon: '/images/gmail.png',
    link: 'mailto:chinestudylab@gmail.com',
    label: 'chinestudylab@gmail.com'
  },
  {
    type: 'messenger',
    icon: '/images/messenger.png',
    link: 'http://m.me/chichivietnamese',
    label: 'chichivietnamese'
  }
]

export function QuickContact({ locale }: QuickContactProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isBlogListing, setIsBlogListing] = useState(false)
  const t = translations[locale as keyof typeof translations] || translations.en

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()
    // Detect blog listing route: /{locale}/blog
    try {
      const path = window.location.pathname || ''
      const segments = path.split('/').filter(Boolean)
      const isBlog = segments.length === 2 && segments[1] === 'blog'
      setIsBlogListing(isBlog)
    } catch {
      // ignore
    }

    // Add event listener
    window.addEventListener('resize', checkMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className={`fixed ${isMobile ? 'bottom-[130px]' : 'bottom-20'} right-4 z-40 flex flex-col items-end space-y-2`}>
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
    </div>
  )
} 