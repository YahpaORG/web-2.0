import { Button } from '@/components/ui/button'
import { getUser } from '@/lib/server/get-user.action'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function ConfirmSignUpPage() {
  const user = await getUser()
  const t = await getTranslations('SignUpPage.ConfirmPage')

  if (user) {
    redirect('/account')
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full gap-2 px-8 ">
      <section className="max-w-xl">
        <div className="flex flex-col items-center justify-center w-full max-w-xl p-6 my-2 border-2 rounded-md">
          <h3 className="mb-4 text-xl font-bold text-center">{t('title')}</h3>
          <p className="mb-4">{t('description1')}</p>
          <p>{t('description2')}</p>
          <div className="text-center">
            <Button asChild>
              <Link href="/login">{t('login')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
