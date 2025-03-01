import Image from 'next/image'
import Link from 'next/link'
import { colors } from '@/lib/colors'

interface PartnersAndFooterProps {
  locale: string;
}

const partners = [
  { name: 'Eva Air', logo: '/images/EvaAir.png' },
  { name: 'Cathay Pacific', logo: '/images/Cathay.jpg' },
  { name: 'First Bank', logo: '/images/First Bank.png' },
  { name: 'CTBC Bank', logo: '/images/CTBC.png' },
  { name: 'Amazon', logo: '/images/Amazon.png' },
  { name: 'Eva Air', logo: '/images/EvaAir.png' },
  { name: 'Cathay Pacific', logo: '/images/Cathay.jpg' },
  { name: 'First Bank', logo: '/images/First Bank.png' },
  { name: 'CTBC Bank', logo: '/images/CTBC.png' },
  { name: 'Amazon', logo: '/images/Amazon.png' },
];

const socialLinks = [
  { name: 'Facebook', icon: '/images/Facebook.png', href: '#' },
  { name: 'Instagram', icon: '/images/IG.png', href: '#' },
  { name: 'Line', icon: '/images/Line.png', href: '#' },
  { name: 'WeChat', icon: '/images/Wechat.png', href: '#' },
  { name: 'Zalo', icon: '/images/zalo.png', href: '#' },
  { name: 'TikTok', icon: '/images/tiktok.png', href: '#' },
  { name: 'YouTube', icon: '/images/youtobe.png', href: '#' },
  { name: 'Xiaohongshu', icon: '/images/小紅書.png', href: '#' },
];

const contactInfo = [
  { icon: '/images/gmail.png', text: 'chichi@gmail.com' },
  { icon: '/images/Line.png', text: 'LINE: chichi_teacher' },
  { icon: '/images/Wechat.png', text: 'WeChat: chichi_vn' },
];

const translations = {
  vi: {
    partnersTitle: 'Đối Tác',
    followUs: 'Theo Dõi Chúng Tôi',
    contactUs: 'Liên Hệ',
    copyright: '© 2024 Chi Chi Vietnamese. Đã đăng ký bản quyền.'
  },
  en: {
    partnersTitle: 'Partners',
    followUs: 'Follow Us',
    contactUs: 'Contact Us',
    copyright: '© 2024 Chi Chi Vietnamese. All rights reserved.'
  },
  'zh-Hant': {
    partnersTitle: '合作夥伴',
    followUs: '關注我們',
    contactUs: '聯絡方式',
    copyright: '© 2024 芝芝越語. 版權所有.'
  },
  'zh-Hans': {
    partnersTitle: '合作伙伴',
    followUs: '关注我们',
    contactUs: '联系方式',
    copyright: '© 2024 芝芝越语. 版权所有.'
  }
}

export const PartnersAndFooter = ({ locale }: PartnersAndFooterProps) => {
  const t = translations[locale as keyof typeof translations] || translations.en

  return (
    <>
      <section id="contact" className="w-full py-16 overflow-hidden" style={{ backgroundColor: colors.primary }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.darkOlive }}>
            {t.partnersTitle}
          </h2>
          <div className="relative w-full">
            <div className="flex animate-scroll">
              {partners.map((partner, index) => (
                <div 
                  key={index} 
                  className="flex-none w-[200px] h-[100px] mx-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center p-6"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full py-12" style={{ backgroundColor: colors.darkOlive }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-6" style={{ color: colors.lightCream }}>
                {t.followUs}
              </h3>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="p-2 rounded-lg transition-all hover:scale-110 flex items-center justify-center bg-white"
                    style={{ 
                      backgroundColor: colors.primary,
                    }}
                  >
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6" style={{ color: colors.lightCream }}>
                {t.contactUs}
              </h3>
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3"
                  >
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <Image
                        src={contact.icon}
                        alt=""
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <span style={{ color: colors.lightCream }}>
                      {contact.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div 
            className="text-center pt-8 border-t"
            style={{ 
              color: colors.lightCream,
              borderColor: colors.primary 
            }}
          >
            {t.copyright}
          </div>
        </div>
      </footer>
    </>
  )
} 