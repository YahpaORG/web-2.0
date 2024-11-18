'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { headers } from 'next/headers'

export const isAuthenticated = async () => {
  const readHeaders = await headers()
  const payload = await getPayload({
    config: configPromise,
  })

  const result = await payload.auth({ headers: readHeaders })

  return Boolean(result.user)
}
