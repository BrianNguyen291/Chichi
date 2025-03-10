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
    href: 'https://facebook.com/your-page', 
    ariaLabel: 'Visit our Facebook page',
    width: 40,
    height: 40
  },
  { 
    name: 'TikTok', 
    icon: '/images/tiktok.png', 
    href: 'https://tiktok.com/@your-account', 
    ariaLabel: 'Follow us on TikTok',
    width: 40,
    height: 40
  },
  { 
    name: 'Instagram', 
    icon: '/images/IG.png', 
    href: 'https://instagram.com/your-account', 
    ariaLabel: 'Follow our Instagram',
    width: 40,
    height: 40
  },
  { 
    name: 'Xiaohongshu', 
    icon: '/images/小紅書.png', 
    href: 'https://www.xiaohongshu.com/user-profile/your-id', 
    ariaLabel: 'Follow us on Xiaohongshu',
    width: 40,
    height: 40
  },
  { 
    name: 'YouTobe', 
    icon: '/images/youtobe.png',
    href: 'https://youtube.com/@your-channel', 
    ariaLabel: 'Subscribe to our YouTube channel',
    width: 24,
    height: 24
  },
];

const contactInfo = [
  { 
    icon: '/images/gmail.png',
    text: 'chinestudilab@gmail.com',
    component: 'email',
    href: 'mailto:chinestudilab@gmail.com'
  },
  { 
    icon: '/images/zalo.png',
    text: 'Zalo: +84 971165332',
    component: 'zalo',
    href: 'https://zalo.me/84971165332'
  },
  { 
    icon: '/images/phone.png',
    text: 'Phone: +84 971165332',
    component: 'phone',
    href: 'tel:+84971165332'
  },
  { 
    icon: '/images/Line.png',
    text: 'LINE: +84 971165332',
    component: 'line',
    href: 'https://line.me/ti/p/~84971165332'
  },
  { 
    icon: '/images/Wechat.png',
    text: 'WeChat: zhizhiyueyu',
    component: 'wechat',
    href: 'weixin://dl/chat?zhizhiyueyu'
  },
  { 
    icon: '/images/Location.png',
    text: 'Số nhà 22, ngõ 143, phố Thụy Lĩnh\nPhường Lĩnh Nam, Quận Hoàng Mai\nThành phố Hà Nội, Việt Nam',
    component: 'address',
    href: 'https://maps.app.goo.gl/your-actual-maps-link'
  },
  { 
    icon: '/images/Clock.png',
    text: 'Giờ làm việc:\nThứ 2 - Thứ 6: 9:00 - 17:00\nThứ 7: 9:00 - 12:00\nChủ nhật & Ngày lễ: Nghỉ',
    component: 'hours',
    href: '/contact#hours'
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
    <div className="flex items-start gap-3 group">
      <div className="flex-shrink-0 mt-1">
        <Image
          src={contact.icon}
          alt=""
          width={24}
          height={24}
          aria-hidden="true"
          className="object-contain"
        />
      </div>
      {contact.href ? (
        <a 
          href={contact.href} 
          className="text-white text-sm transition-colors duration-200 hover:text-primary-200 hover:underline whitespace-pre-line"
          target={contact.component === 'email' ? '_self' : '_blank'}
          rel="noopener noreferrer"
        >
          {contact.text}
        </a>
      ) : (
        <span className="text-white text-sm whitespace-pre-line">
          {contact.text}
        </span>
      )}
    </div>
  );

  return (
    <>
      <section 
        id="partners" 
        className="w-full py-16 overflow-hidden"
        style={{ backgroundColor: colors.primary }}
        aria-labelledby="partners-heading"
      >
        <div className="container mx-auto px-4">
          <h2 
            id="partners-heading"
            className="text-3xl font-bold text-center mb-12 scroll-mt-16"
            style={{ color: colors.darkOlive }}
          >
            {t.partnersTitle}
          </h2>
          <div 
            className="relative w-full overflow-hidden"
            role="region" 
            aria-label="Partner logos"
          >
            <div className="flex animate-scroll hover:animation-paused">
              {[...partners, ...partners].map((partner, index) => (
                <div 
                  key={`partner-${index}`}
                  className="flex-none px-4 transition-transform duration-300 hover:scale-105"
                >
                  <a
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-[200px] h-[100px] bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center p-4"
                    aria-label={`Visit ${partner.name} website`}
                  >
                    <Image
                      src={partner.logo}
                      alt=""
                      width={partner.width}
                      height={partner.height}
                      className="object-contain"
                      sizes="(max-width: 768px) 100px, 200px"
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
        className="w-full py-12"
        style={{ backgroundColor: colors.darkOlive }}
        role="contentinfo"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="text-xl font-bold mb-6 text-white">
                {t.followUs}
              </h3>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-300 rounded-full w-10 h-10 flex items-center justify-center bg-white bg-opacity-10 p-2"
                    aria-label={social.ariaLabel}
                  >
                    <Image
                      src={social.icon}
                      alt=""
                      width={social.width || 24}
                      height={social.height || 24}
                      className="object-contain w-full h-full"
                      loading="lazy"
                    />
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
              <div className="space-y-4">
                {contactInfo.slice(0, 4).map((contact, index) => (
                  renderContactItem(contact)
                ))}
              </div>
              <div className="space-y-4">
                {contactInfo.slice(4, 5).map((contact, index) => (
                  renderContactItem(contact)
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-start">
              <h3 className="sr-only">Address Information</h3>
              <div className="space-y-4 w-full max-w-[300px]">
                {contactInfo.slice(5).map((contact, index) => (
                  renderContactItem(contact)
                ))}
              </div>
            </div>
          </div>

          <div className="text-center pt-8 mt-8 border-t border-gray-600">
            <p className="text-white text-sm">
              {t.copyright.replace('2024', `${currentYear}`)}
            </p>
            <p className="text-white text-sm mt-1">
              <a 
                href="https://texmate.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary-300"
                aria-label="Visit tecxmate.com website"
              >
                {t.madeBy}
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
} 