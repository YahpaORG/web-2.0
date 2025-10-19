import { Timeline } from '@/components/Timeline'
import { getProjects } from '@/lib/server/get-projects'
import { Media, Project } from '@/payload/payload-types'
import { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

type PageArgs = {
  params: Promise<{
    locale: Locale
  }>
}

export default async function ProjectsPage({ params }: PageArgs) {
  const { locale } = await params

  const { docs: projects } = await getProjects({ locale })

  const filteredProjects = projects.filter(
    (p): p is Project & { image?: Media | null | undefined } => typeof p.image !== 'string',
  )

  const t = await getTranslations('ProjectsPage')

  return (
    <div className="mt-8">
      <h1 className="mx-auto mb-10 text-3xl font-bold text-gray-900 w-fit dark:text-white">
        {t('header')}
      </h1>
      <Timeline className="max-w-3xl mx-auto" items={filteredProjects} />
    </div>
  )
}
