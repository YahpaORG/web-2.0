import { SignupForm } from '@/components/SignupForm'
import { getUser } from '@/lib/server/get-user.action'
import { redirect } from 'next/navigation'
import { createUser } from '@/lib/server/create-user.action'
import { getTranslations } from 'next-intl/server'

export default async function SignupPage() {
  const user = await getUser()
  const t = await getTranslations('SignUpPage')

  if (user) {
    redirect('/account')
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full gap-2 px-8 ">
      <section className="max-w-xl">
        <div className="max-w-md mb-4">
          <h3 className="text-2xl">{t('title')}</h3>
          <p>{t('subtitle')}</p>
        </div>
        <SignupForm
          action={createUser}
          values={{
            email: '',
            password: '',
            confirm_password: '',
            agreeToTerms: false,
          }}
        />
      </section>
    </div>
  )
}
