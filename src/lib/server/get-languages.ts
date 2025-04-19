import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const getLanguages = async () => {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'languages',
  })
  return data
}
