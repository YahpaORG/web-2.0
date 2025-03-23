'use client'

import { logout } from '@/app/(frontend)/actions'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()
  return (
    <Button
      onClick={async () => {
        await logout()
        router.refresh()
      }}
    >
      Logout
    </Button>
  )
}
