import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import { colors } from '@/lib/colors'

interface PartnersAndFooterProps {
  locale: string;
}

const partners = [
  { 
    name: 'Eva Air', 
    logo: '/images/EvaAir.png',
    href: 'https://www.evaair.com/your-affiliate-link',
    width: 130,
    height: 20
  },
  { 
    name: 'Cathay Pacific', 
    logo: '/images/Cathay.jpg',
    href: 'https://www.cathaypacific.com',
    width: 200,
    height: 1000
  },
  { 
    name: 'First Bank', 
    logo: '/images/First Bank.png',
    href: 'https://www.firstbank.com.tw',
    width: 160,
    height: 70
  },
  { 
    name: 'CTBC Bank', 
    logo: '/images/CTBC.png',
    href: 'https://www.ctbcbank.com',
    width: 170,
    height: 60
  },
  { 
    name: 'Amazon', 
    logo: '/images/Amazon.png',
    href: 'https://www.amazon.com',
    width: 150,
    height: 60
  },
];

const socialLinks = [
  { 
    name: 'Facebook', 
    icon: '/images/Facebook.png', 
    href: 'https://www.facebook.com/chichivietnamese', 
    ariaLabel: 'Visit our Facebook page',
    width: 40,
    height: 40
  },
  { 
    name: 'Instagram', 
    icon: '/images/IG.png', 
    href: 'https://www.instagram.com/zhizhi_yuenanyu', 
    ariaLabel: 'Follow our Instagram',
    width: 40,
    height: 40
  },
  { 
    name: 'Threads', 
    icon: '/images/threads.png', 
    href: 'https://www.threads.com/@zhizhi_yuenanyu', 
    ariaLabel: 'Follow us on Threads',
    width: 40,
    height: 40
  },
  { 
    name: 'Xiaohongshu', 
    icon: '/images/小紅書.png', 
    href: 'https://www.xiaohongshu.com/user/profile/5fe16ee4000000000100af07', 
    ariaLabel: 'Follow us on Xiaohongshu',
    width: 40,
    height: 40
  },
  { 
    name: 'TikTok', 
    icon: '/images/tiktok.png',
    href: 'https://www.tiktok.com/@zhizhiyuenanyu', 
    ariaLabel: 'Follow us on TikTok',
    width: 40,
    height: 40
  },
];

const contactInfo = [
  { 
    icon: '/images/zalo.png',
    text: 'Zalo: +84966352690',
    component: 'zalo',
    href: 'https://zalo.me/84966352690'
  },
  { 
    icon: '/images/Line.png',
    text: 'Line: hayleenguyen',
    component: 'line',
    href: 'https://line.me/ti/p/hayleenguyen'
  },
  { 
    icon: '/images/Wechat.png',
    text: 'WeChat: zhizhiyueyu',
    component: 'wechat',
    href: 'weixin://dl/chat?zhizhiyueyu'
  },
  { 
    icon: '/images/gmail.png',
    text: 'Gmail: chinestudylab@gmail.com',
    component: 'email',
    href: 'mailto:chinestudylab@gmail.com'
  },
  { 
    icon: '/images/Location.png',
    text: 'Văn phòng: Hà Nội, Việt Nam',
    component: 'address',
    href: '#'
  },

];

const translations = {
  vi: {
    partnersTitle: 'Đối Tác',
    followUs: 'Theo Dõi Chúng Tôi',
    contactUs: 'Liên Hệ',
    copyright: '© 2024 Chine Study Lab. Đã đăng ký Bộ Công Thương.',
    madeBy: 'made by tecxmate.com'
  },
  en: {
    partnersTitle: 'Partners',
    followUs: 'Follow Us',
    contactUs: 'Contact Us',
    copyright: '© 2024 Chine Study Lab. Registered with Ministry of Industry and Trade.',
    madeBy: 'made by tecxmate.com'
  },
  'zh-Hant': {
    partnersTitle: '合作夥伴',
    followUs: '關注我們',
    contactUs: '聯絡方式',
    copyright: '© 2024 Chine Study Lab. 已在工商部註冊.',
    madeBy: 'made by tecxmate.com'
  },
  'zh-Hans': {
    partnersTitle: '合作伙伴',
    followUs: '关注我们',
    contactUs: '联系方式',
    copyright: '© 2024 Chine Study Lab. 已在工商部注册.',
    madeBy: 'made by tecxmate.com'
  }
}

const useTranslations = (locale: string) => {
  return useMemo(() => {
    return translations[locale as keyof typeof translations] || translations.en;
  }, [locale]);
};

export const PartnersAndFooter = ({ locale }: PartnersAndFooterProps) => {
  const t = useTranslations(locale);
  const currentYear = new Date().getFullYear();

  const renderContactItem = (contact: typeof contactInfo[0]) => (
    <div className="flex items-start gap-4 group hover:bg-white/5 p-3 rounded-lg transition-all duration-300">
      <div className="flex-shrink-0">
        <Image
          src={contact.icon}
          alt=""
          width={32}
          height={32}
          aria-hidden="true"
          className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
        />
      </div>
      {contact.href ? (
        <a 
          href={contact.href} 
          className="text-white text-base md:text-lg font-medium transition-all duration-200 hover:text-primary-200 hover:translate-x-1"
          target={contact.component === 'email' ? '_self' : '_blank'}
          rel="noopener noreferrer"
        >
          {contact.text}
        </a>
      ) : (
        <span className="text-white text-base md:text-lg font-medium whitespace-pre-line">
          {contact.text}
        </span>
      )}
    </div>
  );

  return (
    <>
      <section 
        id="partners" 
        className="w-full py-20 overflow-hidden"
        style={{ backgroundColor: colors.primary }}
        aria-labelledby="partners-heading"
      >
        <div className="container mx-auto px-4">
          <h2 
            id="partners-heading"
            className="text-4xl md:text-5xl font-bold text-center mb-16 scroll-mt-16 font-serif relative"
            style={{ color: colors.darkOlive }}
          >
            {t.partnersTitle}
            <span className="block w-24 h-1.5 mx-auto mt-6" style={{ backgroundColor: colors.secondary }}></span>
          </h2>
          <div 
            className="relative w-full overflow-hidden max-w-7xl mx-auto"
            role="region" 
            aria-label="Partner logos"
          >
            <div className="flex animate-scroll hover:animation-paused">
              {[...partners, ...partners].map((partner, index) => (
                <div 
                  key={`partner-${index}`}
                  className="flex-none px-6 transition-transform duration-300 hover:scale-105"
                >
                  <a
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-[250px] h-[120px] bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center p-6 hover:bg-gray-50"
                    aria-label={`Visit ${partner.name} website`}
                  >
                    <Image
                      src={partner.logo}
                      alt=""
                      width={partner.width * 1.2}
                      height={partner.height * 1.2}
                      className="object-contain"
                      sizes="(max-width: 768px) 150px, 250px"
                      priority={index < 3}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer 
        id="contact"
        className="w-full py-20 relative scroll-mt-20"
        style={{ backgroundColor: colors.darkOlive }}
        role="contentinfo"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6 lg:mb-8 text-primary-100 relative">
                {t.followUs}
                <span className="block w-16 h-1 mt-4" style={{ backgroundColor: colors.secondary }}></span>
              </h3>
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="transition-all duration-300 hover:scale-110 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-300 rounded-full w-12 h-12 flex items-center justify-center bg-white bg-opacity-10 hover:bg-opacity-20 p-2 shadow-lg"
                    aria-label={social.ariaLabel}
                  >
                    <Image
                      src={social.icon}
                      alt=""
                      width={(social.width || 24) * 0.6}
                      height={(social.height || 24) * 0.6}
                      className="object-contain w-full h-full"
                      loading="lazy"
                    />
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6 w-full max-w-full lg:max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6 lg:mb-8 text-white relative">
                {t.contactUs}
                <span className="block w-16 h-1 mt-4" style={{ backgroundColor: colors.secondary }}></span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="w-full">{renderContactItem(contact)}</div>
                ))}
              </div>
            </div>

          </div>

          <div className="text-center pt-16 mt-16 border-t border-gray-600">
            <p className="text-gray-100 text-base font-medium">
              {t.copyright.replace('2024', `${currentYear}`)}
            </p>
            <p className="text-gray-200 text-base mt-3">
              <a 
                href="https://texmate.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
                aria-label="Visit tecxmate.com website"
              >
                {t.madeBy}
              </a>
            </p>
          </div>
        </div>
        
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-15 pointer-events-none"
          aria-hidden="true"
        />
      </footer>
    </>
  )
} 