import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function AccountPage() {
  const payload = await getPayload({
    config,
  })

  // TODO: Get document from Payload
  // const {} = await payload.find()

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="flex flex-col max-w-xl gap-4 mb-8">
        <h1 className="text-3xl">My Account</h1>
        <h2 className="font-bold">Manage your YAHPA account and online registry.</h2>
      </div>

      <div className="flex flex-col items-center justify-center w-full max-w-xl p-6 my-2 border-2 rounded-md">
        <h3 className="mb-4 text-xl text-center">
          Joining the Registry of Healthcare Professionals
        </h3>
        <p className="mb-10 ">
          YAHPA invites you to become part of our online network, connecting you with patients and
          other professionals in the Greater Montreal area. By joining, you’ll be helping to bridge
          language barriers, making healthcare more accessible and impactful for diverse
          communities.
        </p>
        <Button asChild>
          <Link href="/account/register">Signup to Online Registry</Link>
        </Button>
      </div>
    </section>
  )
}
