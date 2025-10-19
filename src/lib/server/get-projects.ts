import configPromise from '@payload-config'
import { Locale } from 'next-intl'
import { getPayload } from 'payload'

type GetProjectsProps = {
  locale: Locale
}

export const getProjects = async ({ locale }: GetProjectsProps) => {
  const payload = await getPayload({ config: configPromise })

  const data = await payload.find({
    collection: 'projects',
    sort: 'date',
    locale,
  })

  return data
}
