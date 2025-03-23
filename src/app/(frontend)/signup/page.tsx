import { SignUpForm } from '@/components/SignupForm'
import { getUser } from '@/lib/get-user'
import { redirect } from 'next/navigation'

export default async function SignupPage() {
  const user = await getUser()

  if (user) {
    redirect('/account')
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full gap-2 px-8 ">
      <section className="max-w-xl">
        <SignUpForm />
      </section>
    </div>
  )
}
