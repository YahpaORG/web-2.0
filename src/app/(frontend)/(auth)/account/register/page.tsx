import { RegistrySignupForm } from '@/components/RegistrySignupForm'
import { getLanguages, getProfessions } from './actions'

export default async function AccountRegisterPage() {
  const professions = await getProfessions()
  const languages = await getLanguages()
  return (
    <section className="flex flex-col items-center justify-center h-full py-12">
      <div className="flex flex-col items-center justify-center w-full gap-12 md:flex-row">
        <div className="flex flex-col w-full max-w-xl gap-4 mb-4 md:self-start">
          <h1 className="text-3xl">Registration Form</h1>
          <RegistrySignupForm professions={professions.docs} languages={languages.docs} />
        </div>
      </div>
    </section>
  )
}
