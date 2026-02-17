import RegistrySearchForm from '@/components/Registry/RegistrySearchForm'
import TempRegistryResults from '@/components/Registry/TempRegistryResults'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

type RegistrySearchPageProps = {
  searchParams?: Promise<{
    query?: string
    page?: string
  }>
}

export default async function RegistrySearchPage(props: RegistrySearchPageProps) {
  const t = await getTranslations('RegistrySearchPage')
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1

  return (
    <section className="flex flex-col items-center max-w-3xl mx-auto pt-8">
      <div className="flex flex-col max-w-xl gap-4 mb-8">
        <h1 className="text-3xl font-semibold">{t('title')}</h1>
        <h2 className="text-center font-medium">{t('subtitle')}</h2>
      </div>
      <div className="w-full mb-4">
        <RegistrySearchForm />
      </div>
      <div className="w-full">
        <Suspense
          key={query + currentPage}
          fallback={
            <div className="flex flex-row justify-center w-full p-6">
              <LoadingSpinner />
            </div>
          }
        >
          <TempRegistryResults query={query} currentPage={currentPage} />
        </Suspense>
      </div>
    </section>
  )
}
