import { createRegistryForm } from '@/lib/server/create-registry-form.action'
import { getLanguages } from '@/lib/server/get-languages'
import { CreateRegistryForm } from '@/components/RegistryForm'
import { getUser } from '@/lib/server/get-user.action'
import { getTranslations } from 'next-intl/server'

export default async function AccountRegisterPage() {
  const languages = await getLanguages()
  const user = await getUser()
  const t = await getTranslations('RegistryForm')
  return (
    <section className="flex flex-col items-center justify-center h-full py-12">
      <div className="flex flex-col items-center justify-center w-full gap-12 md:flex-row">
        <div className="flex flex-col w-full max-w-xl gap-4 mb-4 md:self-start">
          <h1 className="text-3xl">{t('title')}</h1>
          <CreateRegistryForm
            languages={languages.docs}
            action={createRegistryForm}
            values={{
              firstName: '',
              lastName: '',
              languages: [],
              preferredContactMethod: 'email',
              email: user?.email ?? '',
              primaryPhoneNumber: '',
              specialty: '',
              graduationDate: new Date().toDateString(),
              profession: 'acupuncturist',
              sector: 'private',
              professionalOrder: 'none',
              isAcceptingPatients: 'yes',
            }}
          />
        </div>
      </div>
    </section>
  )
}
