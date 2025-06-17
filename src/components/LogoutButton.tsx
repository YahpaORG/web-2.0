'use client'

import { logoutUser } from '@/lib/server/logoutUser.action'
import { Button, ButtonProps } from './ui/button'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

export function LogoutButton(props: ButtonProps) {
  const router = useRouter()
  const t = useTranslations()
  return (
    <Button
      onClick={async () => {
        await logoutUser()
        router.refresh()
      }}
      {...props}
    >
      {t('Header.logout')}
    </Button>
  )
}
