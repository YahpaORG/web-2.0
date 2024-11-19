'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { headers } from 'next/headers'

// TODO: remove, should not be reading from server actions
export const isAuthenticated = async () => {
  const headersList = await headers()
  const payload = await getPayload({
    config: configPromise,
  })

  const result = await payload.auth({ headers: headersList })

  return Boolean(result.user)
}
