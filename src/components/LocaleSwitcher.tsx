'use client'

import { useState } from 'react'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useParams } from 'next/navigation'
import { useLocale, Locale, useTranslations } from 'next-intl'
import { routing } from '@/i18n/routing'

export default function LocaleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()
  const t = useTranslations()
  const [locale, setLocal] = useState(currentLocale)
  const params = useParams()

  return (
    <div>
      <select
        onChange={(e) => {
          const newLocale = e.currentTarget.value as Locale
          router.replace(
            // @ts-expect-error -- TypeScript will validate that only known `params`
            // are used in combination with a given `pathname`. Since the two will
            // always match for the current route, we can skip runtime checks.
            { pathname, params },
            { locale: newLocale },
          )
          setLocal(newLocale)
        }}
        value={locale}
      >
        {routing.locales.map((locale) => {
          return (
            <option key={locale} value={locale}>
              {t(`language.${locale}`)}
            </option>
          )
        })}
      </select>
    </div>
  )
}
