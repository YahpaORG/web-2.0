'use client'

import { useState } from 'react'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useParams } from 'next/navigation'
import { useLocale, Locale, useTranslations } from 'next-intl'
import { routing } from '@/i18n/routing'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function LocaleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()
  const t = useTranslations('LocaleSwitcher')
  const [locale, setLocal] = useState(currentLocale)
  const params = useParams()

  return (
    <Select
      defaultValue={locale}
      onValueChange={(value) => {
        const newLocale = value as Locale
        router.replace(
          // @ts-expect-error -- TypeScript will validate that only known `params`
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks.
          { pathname, params },
          { locale: newLocale },
        )
        setLocal(newLocale)
      }}
    >
      <SelectTrigger className="min-w-[8rem]">
        <SelectValue placeholder={t('placeholder')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('label')}</SelectLabel>
          {routing.locales.map((locale) => {
            return (
              <SelectItem key={locale} value={locale}>
                {t(`${locale}`)}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
