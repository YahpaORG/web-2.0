import { Button } from '@/components/ui/button'
import { getUser } from '@/lib/server/get-user.action'
import { Link } from '@/i18n/navigation'
import { deleteRegistry } from '@/lib/server/delete-registry.action'
import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function AccountPage() {
  const user = await getUser()
  const t = await getTranslations('AccountPage')

  if (!user) redirect('/login')

  const payload = await getPayload({ config: configPromise })

  const data = await payload.find({
    collection: 'registry-forms',
    overrideAccess: true,
    where: {
      submittedBy: { equals: user.id },
    },
  })

  const registryForm = data.docs[0]
  const isApproved = registryForm?.registry_status === 'approved'
  const hasUploadedForm = data.docs.length > 0

  const registryStatusColor = {
    approved: 'bg-green-100 text-green-800',
    review: 'bg-yellow-100 text-yellow-800',
    rejected: 'bg-red-100 text-red-800',
  }

  return (
    <div className="flex justify-center flex-1 w-full px-4 py-16">
      <section className="w-full max-w-xl flex flex-col gap-6">

        {/* Greeting */}
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">{t('greeting')}</p>
          <h1 className="text-3xl font-semibold tracking-tight">
            {registryForm?.firstName
              ? `${registryForm.firstName} ${registryForm.lastName}`
              : user.email}
          </h1>
        </div>

        {/* Account Info */}
        <div className="border rounded-xl p-6 flex flex-col gap-4 shadow-sm bg-card">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            {t('accountInfo')}
          </h2>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">{t('email')}</span>
              <span className="font-medium">{user.email}</span>
            </div>
            {hasUploadedForm && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{t('registryStatus')}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${registryStatusColor[registryForm.registry_status ?? 'review']}`}>
                  {t(`registryStatusLabel.${registryForm.registry_status ?? 'review'}`)}
                </span>
              </div>
            )}
            {hasUploadedForm && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{t('join.submittedOn')}</span>
                <span className="font-medium">
                  {new Date(registryForm.createdAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Registry Card */}
        <div className="border rounded-xl p-6 flex flex-col gap-4 shadow-sm bg-card">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            {t('registrySection')}
          </h2>
          {isApproved ? (
            <>
              <p className="text-sm text-muted-foreground">{t('modify.description')}</p>
              <div>
                <Button asChild>
                  <Link href="/account/manage">{t('modify.manage')}</Link>
                </Button>
              </div>
            </>
          ) : hasUploadedForm ? (
            <>
              <p className="text-sm text-muted-foreground">{t('join.inReview')}</p>
              <div>
                <Button variant="destructive" size="sm" formAction={deleteRegistry}>
                  {t('join.delete')}
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">{t('join.description')}</p>
              <div>
                <Button asChild>
                  <Link href="/account/register">{t('join.signup')}</Link>
                </Button>
              </div>
            </>
          )}
        </div>

      </section>
    </div>
  )
}