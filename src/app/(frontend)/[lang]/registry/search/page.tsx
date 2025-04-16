import SearchResults from '@/components/Registry/RegistryResults'
import RegistrySearchForm from '@/components/Registry/RegistrySearchForm'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Suspense } from 'react'

type RegistrySearchPageProps = {
  searchParams?: Promise<{
    query?: string
    page?: string
  }>
}

export default async function RegistrySearchPage(props: RegistrySearchPageProps) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1

  return (
    <section className="flex flex-col items-center max-w-3xl mx-auto">
      <div className="flex flex-col max-w-xl gap-4 mb-8">
        <h1 className="text-3xl">Find a healthcare professional</h1>
        <h2 className="font-bold">Browse our list of registered professionals</h2>
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
          <SearchResults query={query} currentPage={currentPage} />
        </Suspense>
      </div>
    </section>
  )
}
