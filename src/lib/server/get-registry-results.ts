'use server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

type SearchResultsProps = {
  query: string
  currentPage: number
  profession?: string[]
  language?: string[]
}

import type { Where } from 'payload'

export const getRegistryResults = async ({
  query = '',
  currentPage = 1,
  profession = [],
  language = [],
}: SearchResultsProps) => {
  const payload = await getPayload({ config: configPromise })

  const andFilters: Where[] = []

  if (query) {
    andFilters.push({
      or: [
        { firstName: { contains: query } },
        { lastName: { contains: query } },
        { 'languages.heteronym': { contains: query } },
        { 'languages.autonym': { contains: query } },
        { profession: { contains: query } },
      ],
    })
  }


  if (profession.length > 0) {
    andFilters.push({ profession: { in: profession } })
  }

  if (language.length > 0) {
    andFilters.push({ languages: { in: language } })
  }

  const results = await payload.find({
    collection: 'registry-members',
    where: andFilters.length > 0 ? { and: andFilters } : undefined,
    limit: 100,
    page: currentPage,
    sort: 'lastName',
  })

  return results
}