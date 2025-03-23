import { getUser } from '@/lib/get-user'
import { redirect } from 'next/navigation'

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return children
}
