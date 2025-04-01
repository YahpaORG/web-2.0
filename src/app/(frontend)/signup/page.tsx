import { SignupForm } from '@/components/SignupForm'
import { getUser } from '@/lib/server/get-user.action'
import { redirect } from 'next/navigation'
import { createUser } from '@/lib/server/create-user.action'

export default async function SignupPage() {
  const user = await getUser()

  if (user) {
    redirect('/account')
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full gap-2 px-8 ">
      <section className="max-w-xl">
        <div className="max-w-md mb-4">
          <h3 className="text-2xl">Create your account with YAHPA</h3>
          <p>Please enter your email and password to create to your account.</p>
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
