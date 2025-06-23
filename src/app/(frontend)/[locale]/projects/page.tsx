import { getProjects } from '@/lib/server/get-projects'
import { Timeline, TimelineItem } from '@/components/Timeline'
import { Media, Project } from '@/payload/payload-types'
import { getTranslations } from 'next-intl/server'

export default async function ProjectsPage() {
  const { docs: projects } = await getProjects()

  const filteredProjects = projects.filter(
    (p): p is Project & { image?: Media | null | undefined } => typeof p.image !== 'string',
  )

  const t = await getTranslations('ProjectsPage')

  return (
    <div className="mt-8">
      <h1 className="w-fit text-3xl font-bold mx-auto text-gray-900 dark:text-white mb-10">
        {t('header')}
      </h1>
      <Timeline className="mx-auto max-w-3xl" items={filteredProjects} />
    </div>
  )
}
