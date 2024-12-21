import SearchResults from '@/components/Registry/RegistryResults'
import SearchInput from '@/components/Registry/SearchInput'
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
        <h1 className="text-3xl">Registry of Health Care Professionals</h1>
        <h2 className="font-bold">Find a healthcare professional near you</h2>
      </div>
      <SearchInput />
      <Suspense key={query + currentPage} fallback={<p>Loading...</p>}>
        <SearchResults query={query} currentPage={currentPage} />
      </Suspense>
    </section>
  )
}
