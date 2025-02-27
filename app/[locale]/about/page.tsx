import { redirect } from 'next/navigation'

interface AboutPageProps {
  params: {
    locale: string;
  };
}

export default function AboutPage({ params: { locale } }: AboutPageProps) {
  redirect(`/${locale}/#about`)
} 