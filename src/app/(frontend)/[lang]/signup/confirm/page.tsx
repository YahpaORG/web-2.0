import { Button } from '@/components/ui/button'
import { getUser } from '@/lib/server/get-user.action'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function ConfirmSignUpPage() {
  const user = await getUser()

  if (user) {
    redirect('/account')
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full gap-2 px-8 ">
      <section className="max-w-xl">
        <div className="flex flex-col items-center justify-center w-full max-w-xl p-6 my-2 border-2 rounded-md">
          <h3 className="mb-4 text-xl font-bold text-center">Confirm your account by email</h3>
          <p className="mb-4">
            An email has been sent to you. Please use the verification link to complete the creation
            of your account with YAHPA.
          </p>
          <p>If you have already clicked on the verification link, please sign in here.</p>
          <div className="text-center">
            <Button asChild>
              <Link href="/login">Login to my YAHPA account</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
