import { HeroSection } from '@/components/sections/HeroSection'
import { TeacherTeam } from '@/components/sections/TeacherTeam'
import { CourseFeatures } from '@/components/sections/CourseFeatures'
import { TeachingPhilosophy } from '@/components/sections/TeachingPhilosophy'
import { LearningEnvironment } from '@/components/sections/LearningEnvironment'
import { LanguageLevels } from '@/components/sections/LanguageLevels'
import { PartnersAndFooter } from '@/components/sections/PartnersAndFooter'
import { useTranslations } from '@/lib/i18n'

interface HomePageProps {
  params: {
    locale: string;
  };
}

export default function HomePage({ params: { locale } }: HomePageProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection locale={locale} />
      <TeacherTeam locale={locale} />
      <CourseFeatures locale={locale} />
      <TeachingPhilosophy locale={locale} />
      <LearningEnvironment locale={locale} />
      <LanguageLevels locale={locale} />
      <PartnersAndFooter locale={locale} />
    </div>
  )
} 