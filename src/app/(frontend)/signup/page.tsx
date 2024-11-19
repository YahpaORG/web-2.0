import { SignUpForm } from '@/components/SignupForm'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { headers } from 'next/headers'

import { redirect } from 'next/navigation'

export default async function SignupPage() {
  const headersList = await headers()
  const payload = await getPayload({
    config: configPromise,
  })

  const { user } = await payload.auth({ headers: headersList })

  if (user) {
    redirect('/')
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full gap-2 px-8 ">
      <section className="max-w-xl">
        <SignUpForm />
      </section>
    </div>
  )
}
