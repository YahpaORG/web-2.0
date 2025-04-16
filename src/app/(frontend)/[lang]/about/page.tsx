import { getTranslations } from '@/lib/get-translations'
import { PageProps } from '@/types/page-props'

export default async function AboutPage(props: PageProps) {
  const { lang } = await props.params

  const t = await getTranslations(lang)

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="flex flex-col max-w-xl gap-4 mb-8">
        <h1 className="text-3xl">{t.about.header}</h1>
        <h2 className="font-bold">{t.about.subheader}</h2>
        <p>{t.about.description}</p>
      </div>
    </section>
  )
}
