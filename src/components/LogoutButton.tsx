'use client'

import { logoutUser } from '@/lib/server/logoutUser.action'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { useTranslation } from './providers/TranslationProvider'

export function LogoutButton() {
  const router = useRouter()
  const { t } = useTranslation()
  return (
    <Button
      onClick={async () => {
        await logoutUser()
        router.refresh()
      }}
    >
      {t.header.logout}
    </Button>
  )
}
