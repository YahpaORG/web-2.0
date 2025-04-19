import { Button } from '@/components/ui/button'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function RegistryPage() {
  const t = await getTranslations('RegistryPage')

  return (
    <section className="flex flex-col items-center">
      <div className="flex flex-col max-w-xl gap-4 mb-8">
        <h1 className="text-3xl">{t('title')}</h1>
        <h2 className="font-bold">{t('subtitle')}</h2>
        <div className="flex justify-center my-12">
          <Button asChild size="lg">
            <Link href="/registry/search">{t('find')}</Link>
          </Button>
        </div>
        <p>{t('description')}</p>
      </div>
      <div className="flex flex-col items-center justify-center w-full max-w-xl p-6 my-2 border-2 rounded-md">
        <h3 className="mb-4 text-xl text-center">{t('register.title')}</h3>
        <p className="mb-10 ">{t('register.description')}</p>
        <Button asChild>
          <Link href="/signup">{t('register.title')}</Link>
        </Button>
      </div>
    </section>
  )
}
