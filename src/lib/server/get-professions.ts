import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const getProfessions = async () => {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'professions',
  })
  return data
}
