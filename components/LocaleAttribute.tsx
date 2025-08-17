'use client'

import { useEffect } from 'react'

interface LocaleAttributeProps {
    locale: string
}

export default function LocaleAttribute({ locale }: LocaleAttributeProps) {
    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-locale', locale)
        }
    }, [locale])

    return null
}


