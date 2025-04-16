'use client'

import { logoutUser } from '@/lib/server/logoutUser.action'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

export function LogoutButton() {
  const router = useRouter()
  const t = useTranslations()
  return (
    <Button
      onClick={async () => {
        await logoutUser()
        router.refresh()
      }}
    >
      {t('header.logout')}
    </Button>
  )
}
