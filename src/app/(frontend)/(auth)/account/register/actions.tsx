'use server'

import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { getPayload } from 'payload'

export const submitRegistryForm = async (registryForm: any) => {
  const payload = await getPayload({
    config: configPromise,
  })
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  const data = await payload.create({
    collection: 'registry-forms',
    data: {
      user_id: user?.id,
      ...registryForm,
    },
  })

  console.log('submitRegistryForm', { registryForm, result: data })

  return data
}
