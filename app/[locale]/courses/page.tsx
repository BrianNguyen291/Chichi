import { redirect } from 'next/navigation'

interface CoursesPageProps {
  params: {
    locale: string;
  };
}

export default function CoursesPage({ params: { locale } }: CoursesPageProps) {
  redirect(`/${locale}/#courses`)
} 