'use client'

import { usePathname, useRouter } from 'next/navigation'
import { i18n, type Locale } from '@/translations/i18n-config'
import { useTranslation } from './providers/TranslationProvider'
import { useState } from 'react'

export default function LocaleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const { t, currentLocale } = useTranslation()
  const [locale, setLocal] = useState(currentLocale)

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return '/'
    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <div>
      <select
        onChange={(e) => {
          const newLocale = e.currentTarget.value as Locale
          router.push(redirectedPathname(newLocale))
          setLocal(newLocale)
        }}
        value={locale}
      >
        {i18n.locales.map((locale) => {
          return (
            <option key={locale} value={locale}>
              {t?.language[locale]}
            </option>
          )
        })}
      </select>
    </div>
  )
}
