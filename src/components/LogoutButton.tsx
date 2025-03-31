'use client'

import { logoutUser } from '@/lib/server/logoutUser.action'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()
  return (
    <Button
      onClick={async () => {
        await logoutUser()
        router.refresh()
      }}
    >
      Logout
    </Button>
  )
}
