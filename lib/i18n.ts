import en from '@/translations/en.json'
import zhHant from '@/translations/zh-Hant.json'
import zhHans from '@/translations/zh-Hans.json'

export const translations = {
  en,
  'zh-Hant': zhHant,
  'zh-Hans': zhHans,
} as const

export type Locale = keyof typeof translations
export type TranslationKey = keyof typeof translations.en

export function getTranslations(locale: Locale) {
  return translations[locale] || translations.en
}

export function useTranslations(locale: Locale) {
  const t = translations[locale] || translations.en
  return {
    t,
    translate: (key: string, section?: string) => {
      if (section) {
        return t[section as keyof typeof t]?.[key as any] || key
      }
      return t[key as keyof typeof t] || key
    }
  }
} 