import { TeacherTeam } from '@/components/sections/TeacherTeam'

interface TeacherTeamPageProps {
  params: {
    locale: string;
  };
}

export default function TeacherTeamPage({ params: { locale } }: TeacherTeamPageProps) {
  return (
    <main>
      <TeacherTeam locale={locale} />
    </main>
  )
} 