'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function RegistrySearchForm() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const currentQuery = searchParams.get('query')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams)
    const newQuery = e.currentTarget.value
    params.set('query', newQuery)
    replace(`${pathname}?${params.toString()}`)
  }

  const handleClear = () => {
    const params = new URLSearchParams(searchParams)
    params.delete('query')
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-col">
      <label>Enter a search term</label>
      <div className="flex flex-row items-center flex-1 gap-4">
        <input
          defaultValue={currentQuery ?? ''}
          onChange={handleInputChange}
          name="query"
          type="text"
          placeholder="Physiotherapist, Dentist, Optometrist..."
          className="flex w-full px-4 py-2 text-base transition-colors bg-transparent border rounded-md shadow-sm h-9 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
        <button onClick={handleClear} className="px-4 py-2 text-sm text-white bg-black rounded-md">
          Clear
        </button>
      </div>
    </div>
  )
}
