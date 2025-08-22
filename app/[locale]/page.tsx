import { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { TeacherTeam } from '@/components/sections/TeacherTeam'
import { CourseFeatures } from '@/components/sections/CourseFeatures'
import { LearningEnvironment } from '@/components/sections/LearningEnvironment'
import { LanguageLevels } from '@/components/sections/LanguageLevels'
import { PartnersAndFooter } from '@/components/sections/PartnersAndFooter'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { CTAPopup } from '@/components/CTAPopup'
import { useTranslations } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import Script from 'next/script'

interface HomePageProps {
  params: {
    locale: Locale;
  };
}

export default function HomePage({ params: { locale } }: HomePageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chichivietnamese.com'
  
  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LanguageSchool",
    "name": "芝芝越南語",
    "alternateName": "Chi Chi Vietnamese Language School",
    "description": "Professional Vietnamese language teaching with online and offline courses",
    "url": baseUrl,
    "logo": `${baseUrl}/Logo.png`,
    "image": `${baseUrl}/images/hero.png`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hanoi",
      "addressCountry": "VN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Vietnamese", "English", "Chinese"]
    },
    "sameAs": [
      "https://www.facebook.com/chichivietnamese",
      "https://www.instagram.com/chichivietnamese"
    ],
    "offers": {
      "@type": "Offer",
      "description": "Vietnamese language courses for all levels"
    }
  }

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="flex flex-col min-h-screen">
        <CTAPopup locale={locale} />
        <HeroSection locale={locale} />
        <TeacherTeam locale={locale} />
        <CourseFeatures locale={locale} />
        <LanguageLevels locale={locale} />
        <LearningEnvironment locale={locale} />
        <TestimonialsSection locale={locale} />
        <PartnersAndFooter locale={locale} />
      </div>
    </>
  )
}

export async function generateMetadata({ params: { locale } }: HomePageProps): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chichivietnamese.com'
  const canonicalUrl = `${baseUrl}/${locale}`
  
  // Get locale-specific content
  const getLocaleContent = (locale: Locale) => {
    switch (locale) {
      case 'zh-Hant':
        return {
          title: '芝芝越南語 - 專業越南語教學中心',
          description: '專業越南語教學，線上線下課程，量身打造學習計畫。提供越南語、英語、中文課程，由經驗豐富的教師團隊授課。',
          keywords: '越南語教學,越南語課程,越南語學習,越南語老師,河內越南語,線上越南語,越南語補習班,越南語會話,越南語發音,越南語文法'
        }
      case 'zh-Hans':
        return {
          title: '芝芝越南语 - 专业越南语教学中心',
          description: '专业越南语教学，线上线下课程，量身打造学习计划。提供越南语、英语、中文课程，由经验丰富的教师团队授课。',
          keywords: '越南语教学,越南语课程,越南语学习,越南语老师,河内越南语,线上越南语,越南语补习班,越南语会话,越南语发音,越南语文法'
        }
      case 'en':
        return {
          title: 'Chi Chi Vietnamese - Professional Vietnamese Language School',
          description: 'Professional Vietnamese language teaching with online and offline courses, customized learning plans. We offer Vietnamese, English, and Chinese courses taught by experienced teachers.',
          keywords: 'Vietnamese language school,Vietnamese courses,Vietnamese learning,Vietnamese teachers,Hanoi Vietnamese,online Vietnamese,Vietnamese tutoring,Vietnamese conversation,Vietnamese pronunciation,Vietnamese grammar'
        }
      default:
        return {
          title: '芝芝越南語 - 專業越南語教學中心',
          description: '專業越南語教學，線上線下課程，量身打造學習計畫。',
          keywords: '越南語教學,越南語課程,越南語學習'
        }
    }
  }

  const content = getLocaleContent(locale)

  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords,
    authors: [{ name: '芝芝越南語' }],
    creator: '芝芝越南語',
    publisher: '芝芝越南語',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'zh-Hant': `${baseUrl}/zh-Hant`,
        'zh-Hans': `${baseUrl}/zh-Hans`,
        'en': `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: content.title,
      description: content.description,
      url: canonicalUrl,
      siteName: '芝芝越南語',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/hero.png`,
          width: 1200,
          height: 630,
          alt: content.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
      images: [`${baseUrl}/images/hero.png`],
      creator: '@chichivietnamese',
      site: '@chichivietnamese',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
} 