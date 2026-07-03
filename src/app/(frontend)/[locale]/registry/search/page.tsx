import RegistryResults from '@/components/Registry/RegistryResults'
import RegistrySearchForm from '@/components/Registry/RegistrySearchForm'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { getLanguages } from '@/lib/server/get-languages'
import { getRegistryFilters } from '@/lib/server/get-registry-filters'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

type RegistrySearchPageProps = {
  searchParams?: Promise<{
    query?: string
    page?: string
    profession?: string
    language?: string
  }>
}

export default async function RegistrySearchPage(props: RegistrySearchPageProps) {
  const t = await getTranslations('RegistrySearchPage')
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1
  const profession = searchParams?.profession?.split(',').filter(Boolean) || []
  const language = searchParams?.language?.split(',').filter(Boolean) || []

  const languages = await getLanguages();
  const { professions: activeProfessions, languageIds: activeLanguageIds } = await getRegistryFilters()

  const filteredLanguages = languages.docs.filter((l) => activeLanguageIds.includes(l.id))

  return (
    <section className="flex flex-col items-center max-w-3xl mx-auto pt-8">
      <div className="flex flex-col max-w-xl gap-4 mb-8">
        <h1 className="text-3xl font-semibold">{t('title')}</h1>
        <h2 className="text-center font-medium">{t('subtitle')}</h2>
      </div>
      <div className="w-full">
        <RegistrySearchForm languages={filteredLanguages} activeProfessions={activeProfessions} />
      </div>
      <div className="w-full">
        <Suspense
          key={query + currentPage + profession.join(',') + language.join(',')}
          fallback={
            <div className="flex flex-row justify-center w-full p-6">
              <LoadingSpinner />
            </div>
          }
        >
          <RegistryResults
            query={query}
            currentPage={currentPage}
            profession={profession}
            language={language}
          />
        </Suspense>
      </div>
    </section>
  )
}