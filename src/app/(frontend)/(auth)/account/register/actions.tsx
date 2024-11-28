'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const submitRegistryForm = async (registryForm: any) => {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.create({
    collection: 'registry-forms',
    data: {
      ...registryForm,
    },
  })

  console.log('submitRegistryForm', { registryForm, result: data })

  return data
}
