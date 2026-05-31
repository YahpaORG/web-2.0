import { LoginForm } from '@/components/LoginForm'
import { getUser } from '@/lib/server/get-user.action'
import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const user = await getUser()
  const t = await getTranslations('LoginPage')

  if (user) redirect('/')

  return (
    <div className="flex items-center justify-center flex-1 w-full px-4 py-16">
      <section className="w-full max-w-md bg-card border rounded-xl shadow-sm p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-1 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{t('title')}</h1>
          <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
        </div>
        <LoginForm />
      </section>
    </div>
  )
}