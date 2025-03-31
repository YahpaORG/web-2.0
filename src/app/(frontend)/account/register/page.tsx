import { createRegistry } from '@/lib/server/create-registry.action'
import { getLanguages } from '@/lib/server/get-languages'
import { getProfessions } from '@/lib/server/get-professions'
import { CreateRegistryForm } from '@/components/RegistryForm'

export default async function AccountRegisterPage() {
  const professions = await getProfessions()
  const languages = await getLanguages()
  return (
    <section className="flex flex-col items-center justify-center h-full py-12">
      <div className="flex flex-col items-center justify-center w-full gap-12 md:flex-row">
        <div className="flex flex-col w-full max-w-xl gap-4 mb-4 md:self-start">
          <h1 className="text-3xl">Registration Form</h1>
          <CreateRegistryForm
            professions={professions.docs}
            languages={languages.docs}
            action={createRegistry}
            values={{
              first_name: '',
              last_name: '',
              languages: [],
              preferred_contact_method: 'email',
              primary_phone_number: '',
              status: 'employed',
              profession: '',
            }}
          />
        </div>
      </div>
    </section>
  )
}
