import { LoginForm } from '@/components/LoginForm'
import { getUser } from '@/lib/server/get-user.action'
import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const user = await getUser()
  const t = await getTranslations('LoginPage')

  if (user) {
    redirect('/')
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full gap-2 px-8 ">
      <section className="max-w-xl">
        <div className="max-w-md mb-4">
          <h3 className="text-2xl">{t('title')}</h3>
          <p>{t('subtitle')}</p>
        </div>

        <LoginForm />
      </section>
    </div>
  )
}
