import { Button } from '@/components/ui/button'
import { getUser } from '@/lib/server/get-user.action'
import config from '@payload-config'
import Link from 'next/link'
import { getPayload } from 'payload'
import { deleteRegistry } from '@/lib/server/delete-registry.action'
import { getTranslations } from 'next-intl/server'

export default async function AccountPage() {
  const payload = await getPayload({
    config,
  })
  const t = await getTranslations('AccountPage')
  const user = await getUser()

  const data = await payload.find({
    collection: 'registry-forms',
    where: {
      submittedBy: {
        equals: user?.id,
      },
    },
  })

  const registryForm = data.docs[0]
  const isApproved = registryForm?.registry_status === 'approved' || false
  const hasUploadedForm = data.docs.length > 0

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="flex flex-col max-w-xl gap-4 mb-8">
        <h1 className="text-3xl">{t('title')}</h1>
        <h2 className="font-bold">{t('subtitle')}</h2>
      </div>

      {isApproved ? (
        <div className="flex flex-col items-center justify-center w-full max-w-xl p-6 my-2 border-2 rounded-md">
          <h3 className="mb-4 text-xl text-center">{t('modify.title')}</h3>
          <p className="mb-10">{t('modify.description')}</p>
          <Button asChild>
            <Link href="/account/manage">{t('modify.manage')}</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full max-w-xl p-6 my-2 border-2 rounded-md">
          <h3 className="mb-4 text-xl text-center">{t('join.title')}</h3>
          <p className="mb-10">{t('join.description')}</p>
          {hasUploadedForm ? (
            <div className="flex flex-col gap-2 text-center">
              <p className="font-bold">{t('join.inReview')}</p>
              <span>
                {t('join.submittedOn')} {new Date(data.docs[0].createdAt).toDateString()}
              </span>
              <div>
                <Button variant="destructive" onClick={deleteRegistry}>
                  {t('join.delete')}
                </Button>
              </div>
            </div>
          ) : (
            <Button asChild>
              <Link href="/account/register">{t('join.signup')}</Link>
            </Button>
          )}
        </div>
      )}
    </section>
  )
}
