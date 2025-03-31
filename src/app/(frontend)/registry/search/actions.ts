'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

type SearchResultsProps = {
  query: string
  currentPage: number
}

export const fetchSearchResults = async ({ query = '', currentPage = 1 }: SearchResultsProps) => {
  const payload = await getPayload({
    config: configPromise,
  })

  const results = await payload.find({
    collection: 'registry-members',
    where: {
      or: [
        // {
        //   first_name: {
        //     like: query,
        //   },
        // },
        // {
        //   last_name: {
        //     like: query,
        //   },
        // },
        {
          profession: {
            like: query,
          },
        },
      ],
    },
    page: currentPage,
  })

  return results
}
