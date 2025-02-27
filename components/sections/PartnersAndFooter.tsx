import Image from 'next/image'
import Link from 'next/link'
import { colors } from '@/lib/colors'

const partners = [
  { name: 'Amazon', logo: '/amazon.png' },
  { name: '國泰人壽', logo: '/cathay.png' },
  { name: 'First Bank', logo: '/firstbank.png' },
  { name: 'EVA Air', logo: '/eva.png' },
  { name: '中國信託', logo: '/ctbc.png' }
]

const socialLinks = [
  { name: 'Facebook', icon: '/facebook.svg', href: '#' },
  { name: 'YouTube', icon: '/youtube.svg', href: '#' },
  { name: 'Instagram', icon: '/instagram.svg', href: '#' },
  { name: 'TikTok', icon: '/tiktok.svg', href: '#' },
  { name: 'Line', icon: '/line.svg', href: '#' }
]

const contactLinks = [
  { icon: '/email.svg', text: 'contact@example.com' },
  { icon: '/line-contact.svg', text: 'LINE ID: example' },
  { icon: '/wechat.svg', text: 'WeChat: example' }
]

export const PartnersAndFooter = () => {
  return (
    <>
      <section className="w-full py-16" style={{ backgroundColor: colors.primary }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.darkOlive }}>
            合作夥伴
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {partners.map((partner, index) => (
              <div 
                key={index} 
                className="relative h-20 p-4 rounded-lg"
                style={{ backgroundColor: colors.lightCream }}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain p-2 transition-all hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="w-full py-12" style={{ backgroundColor: colors.darkOlive }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.lightCream }}>
                關注我們
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="p-2 rounded-lg transition-colors"
                    style={{ 
                      backgroundColor: colors.primary,
                      color: colors.darkOlive 
                    }}
                  >
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={24}
                      height={24}
                    />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.lightCream }}>
                聯絡方式
              </h3>
              <div className="space-y-2">
                {contactLinks.map((contact, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-2"
                    style={{ color: colors.lightCream }}
                  >
                    <div 
                      className="p-1 rounded"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <Image
                        src={contact.icon}
                        alt=""
                        width={20}
                        height={20}
                      />
                    </div>
                    <span>{contact.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div 
            className="text-center text-sm"
            style={{ color: colors.lightCream }}
          >
            © 2024 越學越通. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
} 