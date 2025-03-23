'use server'

import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { getPayload } from 'payload'

export const getUser = async () => {
  const payload = await getPayload({
    config: configPromise,
  })
  const headersList = await headers()

  const { user } = await payload.auth({ headers: headersList })

  console.log('getUser', user)

  return user
}
