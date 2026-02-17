'use client'

import { set } from 'date-fns'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function RegistrySearchForm() {
  const t = useTranslations('RegistrySearchPage')
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  // Single source of truth: the 'query' in the URL
  const currentQuery = searchParams.get('query') || ''

  const [query, setQuery] = useState(currentQuery)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams)
    const newQuery = e.target.value

    if (newQuery) {
      params.set('query', newQuery)
    } else {
      params.delete('query')
    }
    setQuery(newQuery)
    replace(`${pathname}?${params.toString()}`)
  }

  const handleClear = () => {
    const params = new URLSearchParams(searchParams)
    params.delete('query')
    replace(`${pathname}?${params.toString()}`)
    setQuery('')
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center flex-1 gap-4">
        <input
          value={query}
          onChange={handleInputChange}
          name="query"
          type="text"
          placeholder={t('search.placeholder')}
          className="flex w-full px-4 py-2 text-base transition-colors bg-transparent border rounded-md shadow-sm h-11 border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:text-sm"
        />
        <button
          onClick={handleClear}
          className="px-6 py-2 text-sm font-medium text-white transition-colors bg-black rounded-md h-11"
        >
          {t('search.clear')}
        </button>
      </div>
    </div>
  )
}
