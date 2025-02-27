import { redirect } from 'next/navigation'

interface ContactPageProps {
  params: {
    locale: string;
  };
}

export default function ContactPage({ params: { locale } }: ContactPageProps) {
  redirect(`/${locale}/#contact`)
} 