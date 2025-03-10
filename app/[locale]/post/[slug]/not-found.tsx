'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslations } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'

export default function PostNotFound() {
  const { locale } = useParams() as { locale: Locale }
  const { translate } = useTranslations(locale)

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">
        {translate('postNotFound', 'errors')}
      </h1>
      <p className="text-lg mb-8">
        {translate('postNotFoundDescription', 'errors')}
      </p>
      <Link
        href={`/${locale}/blog`}
        className="inline-block bg-[#b17f4a] text-white px-6 py-3 rounded-md hover:bg-[#8c6539] transition-colors"
      >
        {translate('backToBlog', 'common')}
      </Link>
    </div>
  )
} 
  )
} 
  )
} 