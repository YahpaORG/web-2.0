'use server'

import configPromise from '@payload-config'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { getPayload } from 'payload'

export const deleteRegistry = async () => {
  const payload = await getPayload({
    config: configPromise,
  })
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  const data = await payload.delete({
    collection: 'registry-forms',
    where: {
      submittedBy: {
        equals: user?.id,
      },
    },
  })
  revalidatePath('/account')
  return data
}
