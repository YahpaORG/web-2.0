'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const logoutUser = async () => {
  const cookieStore = await cookies()
  cookieStore.delete('payload-token')
  redirect('/')
}
