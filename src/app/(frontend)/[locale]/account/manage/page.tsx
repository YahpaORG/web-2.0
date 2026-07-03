import { EditRegistryForm } from '@/components/EditRegistryForm'
import { updateRegistryMember } from '@/lib/server/update-registry-member.action'
import { getLanguages } from '@/lib/server/get-languages'
import { getUser } from '@/lib/server/get-user.action'
import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { EditRegistryFormValues } from '@/lib/validation/edit-registry-form.schema'
import { Language } from '@/payload/payload-types'

export default async function ManageAccountPage() {
  const user = await getUser()
  const t = await getTranslations('AccountPage')

  if (!user) redirect('/login')

  const payload = await getPayload({ config: configPromise })
  const languages = await getLanguages()

  // Find the user's registry-members entry
  const data = await payload.find({
    collection: 'registry-members',
    overrideAccess: true,
    where: {
      email: { equals: user.email },
    },
    limit: 1,
  })

  const member = data.docs[0]

  if (!member) redirect('/account')

  const values: EditRegistryFormValues = {
    firstName: member.firstName,
    lastName: member.lastName,
    languages: (member.languages as Language[]).map((l) => l.id),
    email: member.email ?? undefined,
    primaryPhoneNumber: member.primaryPhoneNumber ?? undefined,
    practiceInfo: member.practiceInfo ? {
      name: member.practiceInfo.name ?? undefined,
      address: member.practiceInfo.address ?? undefined,
      email: member.practiceInfo.email ?? undefined,
      phone: member.practiceInfo.phone ?? undefined,
      website: member.practiceInfo.website ?? undefined,
    } : undefined,
    profession: member.profession,
    specialty: member.specialty ?? undefined,
    professionalOrder: member.professionalOrder ?? 'none',
    isAcceptingPatients: member.isAcceptingPatients,
    newPatientAcceptanceDate: member.newPatientAcceptanceDate ?? undefined,
    sector: member.sector ?? 'private',
  }

  return (
    <div className="flex justify-center flex-1 w-full px-4 py-16">
      <section className="w-full max-w-xl flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{t('modify.title')}</h1>
          <p className="text-muted-foreground">{t('modify.description')}</p>
        </div>
        <EditRegistryForm
          id={member.id}
          values={values}
          languages={languages.docs}
          action={updateRegistryMember}
        />
      </section>
    </div>
  )
}