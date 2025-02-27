import Image from "next/image"
import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ContactForm } from "@/components/contact-form"
import { CourseCard } from "@/components/course-card"
import { Toaster } from "sonner"
import { HeroSection } from '@/components/sections/HeroSection'
import { TeachingPhilosophy } from '@/components/sections/TeachingPhilosophy'
import { TeacherTeam } from '@/components/sections/TeacherTeam'
import { CourseFeatures } from '@/components/sections/CourseFeatures'
import { LanguageLevels } from '@/components/sections/LanguageLevels'
import { LearningEnvironment } from '@/components/sections/LearningEnvironment'
import { PartnersAndFooter } from '@/components/sections/PartnersAndFooter'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TeachingPhilosophy />
      <TeacherTeam />
      <CourseFeatures />
      <LanguageLevels />
      <LearningEnvironment />
      <PartnersAndFooter />
    </main>
  )
}

