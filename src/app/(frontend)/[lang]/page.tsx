import { Button } from '@/components/ui/button'
import { getTranslations } from '@/lib/get-translations'
import { PageProps } from '@/types/page-props'
import Link from 'next/link'

export default async function HomePage(props: PageProps) {
  const { lang } = await props.params

  const t = await getTranslations(lang)

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="flex flex-col max-w-xl gap-4 mb-8">
        <h1 className="text-3xl">{t.home.header}</h1>
        <h2 className="font-bold">{t.home.subheader}</h2>
        <p>{t.home.description}</p>
        <div>
          <Button asChild>
            <Link href="/about">{t.home.learn}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
