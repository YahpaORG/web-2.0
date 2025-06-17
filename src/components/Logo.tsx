'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export function YahpaLogo() {
  const t = useTranslations()
  return (
    <Link href="/" className="flex flex-row items-center flex-1 gap-1">
      <Image src="/media/6_w_b.png" alt="" width={72} height={72} />
      <div className="flex flex-col justify-center">
        <span className="text-xl font-semibold">{t('yahpa')}</span>
        <span className="text-xs hidden xl:inline-block w-[250px]">{t('yahpa_full')}</span>
      </div>
    </Link>
  )
}
