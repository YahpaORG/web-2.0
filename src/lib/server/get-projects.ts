import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const getProjects = async () => {
  const payload = await getPayload({ config: configPromise })

  const data = await payload.find({
    collection: 'projects',
    sort: 'date',
  })

  return data
}
