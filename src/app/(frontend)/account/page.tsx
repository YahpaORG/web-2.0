import { Button } from '@/components/ui/button'
import { getUser } from '@/lib/get-user'
import config from '@payload-config'
import Link from 'next/link'
import { getPayload } from 'payload'
import { deleteRegistry } from '@/lib/server/delete-registry.action'

export default async function AccountPage() {
  const payload = await getPayload({
    config,
  })

  const user = await getUser()

  const data = await payload.find({
    collection: 'registry-forms',
    where: {
      submittedBy: {
        equals: user?.id,
      },
    },
  })

  const registryForm = data.docs[0]
  const isApproved = registryForm?.registry_status === 'approved' || false
  const hasUploadedForm = data.docs.length > 0

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="flex flex-col max-w-xl gap-4 mb-8">
        <h1 className="text-3xl">My Account</h1>
        <h2 className="font-bold">Manage your YAHPA account and online registry.</h2>
      </div>

      {isApproved ? (
        <div className="flex flex-col items-center justify-center w-full max-w-xl p-6 my-2 border-2 rounded-md">
          <h3 className="mb-4 text-xl text-center">My YAHPA Registry</h3>
          <p className="mb-10">
            You can modify and update your information from YAHPA&apos;s online registry of
            healthcare professionals.
          </p>
          <Button asChild>
            <Link href="/account/manage">Manage Information</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full max-w-xl p-6 my-2 border-2 rounded-md">
          <h3 className="mb-4 text-xl text-center">
            Joining the Registry of Healthcare Professionals
          </h3>
          <p className="mb-10">
            YAHPA invites you to become part of our online network, connecting you with patients and
            other professionals in the Greater Montreal area. By joining, you’ll be helping to
            bridge language barriers, making healthcare more accessible and impactful for diverse
            communities.
          </p>
          {hasUploadedForm ? (
            <div className="flex flex-col gap-2 text-center">
              <p className="font-bold">Your submission is currently being reviewed.</p>
              <span>Submitted on {new Date(data.docs[0].createdAt).toDateString()}</span>
              <div>
                <Button variant="destructive" onClick={deleteRegistry}>
                  Delete Submission
                </Button>
              </div>
            </div>
          ) : (
            <Button asChild>
              <Link href="/account/register">Signup to Online Registry</Link>
            </Button>
          )}
        </div>
      )}
    </section>
  )
}
