import { LoginForm } from '@/components/LoginForm'
import { isAuthenticated } from '../actions'
import { redirect } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { headers } from 'next/headers'

export default async function LoginPage() {
  const headersList = await headers()

  const payload = await getPayload({
    config: configPromise,
  })

  const result = await payload.auth({ headers: headersList })

  console.log('result', result)

  if (result.user) {
    redirect('/')
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full gap-2 px-8 ">
      <section className="max-w-xl">
        <LoginForm />
      </section>
    </div>
  )
}
