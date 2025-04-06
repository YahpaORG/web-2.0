'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

type SearchResultsProps = {
  query: string
  currentPage: number
}

export const getRegistryResults = async ({ query = '', currentPage = 1 }: SearchResultsProps) => {
  const payload = await getPayload({
    config: configPromise,
  })

  const results = await payload.find({
    collection: 'registry-members',
    where: {
      or: [
        {
          firstName: {
            contains: query,
          },
        },
        {
          lastName: {
            contains: query,
          },
        },
        {
          'languages.heteronym': {
            contains: query,
          },
        },
        {
          'languages.autonym': {
            contains: query,
          },
        },
        {
          profession: {
            contains: query,
          },
        },
      ],
    },
    page: currentPage,
  })

  console.log('results', JSON.stringify(results.docs, null, 2))

  return results
}
