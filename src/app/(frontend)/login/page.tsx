import { LoginForm } from '@/components/LoginForm'
import { isAuthenticated } from '../actions'
import { redirect } from 'next/navigation'
export default async function LoginPage() {
  const isAuth = await isAuthenticated()

  if (isAuth) {
    redirect('/')
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 justify-center items-center gap-2 ">
      <section className="max-w-xl">
        <LoginForm />
      </section>
    </div>
  )
}
