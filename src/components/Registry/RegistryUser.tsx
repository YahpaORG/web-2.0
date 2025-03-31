import { fetchSearchResults } from '@/app/(frontend)/registry/search/actions'
import { Badge } from '../ui/badge'
import { Language, Profession } from '@/payload/payload-types'
import { getLanguages, getProfessions } from '@/lib/server/get-languages'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function RegistryUser({ userId }: { userId: string }) {
  const payload = await getPayload({
    config: configPromise,
  })

  return null
}
