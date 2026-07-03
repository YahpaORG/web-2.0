'use client'
import { PROFESSIONS } from '@/lib/validation/registry-form.schema'
import { Language } from '@/payload/payload-types'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

type RegistrySearchFormProps = {
  languages: Language[],
  activeProfessions: string[],
}

const professionLabels = Object.fromEntries(PROFESSIONS.map((p) => [p.value, p.label]))

function FilterChip({
  label,
  count,
  children,
}: {
  label: string
  count: number
  children: React.ReactNode
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          {label}
          {count > 0 && (
            <span className="flex items-center justify-center min-w-5 h-5 px-1 text-xs font-semibold text-white bg-primary rounded-full">
              {count}
            </span>
          )}
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-h-72 overflow-y-auto">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function RegistrySearchForm({ languages, activeProfessions }: RegistrySearchFormProps) {
  const t = useTranslations('RegistrySearchPage')
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const currentQuery = searchParams.get('query') || ''
  const selectedProfessions = searchParams.get('profession')?.split(',').filter(Boolean) || []
  const selectedLanguages = searchParams.get('language')?.split(',').filter(Boolean) || []

  const [query, setQuery] = useState(currentQuery)

  const updateListParam = (key: string, values: string[]) => {
    const params = new URLSearchParams(searchParams)
    if (values.length > 0) {
      params.set(key, values.join(','))
    } else {
      params.delete(key)
    }
    params.delete('page')
    replace(`${pathname}?${params.toString()}`)
  }

  const toggleProfession = (value: string) => {
    const next = selectedProfessions.includes(value)
      ? selectedProfessions.filter((v) => v !== value)
      : [...selectedProfessions, value]
    updateListParam('profession', next)
  }

  const toggleLanguage = (value: string) => {
    const next = selectedLanguages.includes(value)
      ? selectedLanguages.filter((v) => v !== value)
      : [...selectedLanguages, value]
    updateListParam('language', next)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    const params = new URLSearchParams(searchParams)
    if (newQuery) {
      params.set('query', newQuery)
    } else {
      params.delete('query')
    }
    params.delete('page')
    replace(`${pathname}?${params.toString()}`)
  }

  const handleClear = () => {
    setQuery('')
    const params = new URLSearchParams(searchParams)
    params.delete('query')
    params.delete('page')
    replace(`${pathname}?${params.toString()}`)
  }

  const hasActiveFilters = query || selectedProfessions.length > 0 || selectedLanguages.length > 0

  const handleClearAll = () => {
    setQuery('')
    replace(pathname)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row flex-wrap gap-2">
        <FilterChip label={t('search.profession')} count={selectedProfessions.length}>
          {activeProfessions.map((value) => (
            <DropdownMenuCheckboxItem
              key={value}
              checked={selectedProfessions.includes(value)}
              onCheckedChange={() => toggleProfession(value)}
              onSelect={(e) => e.preventDefault()}
            >
              {professionLabels[value] ?? value}
            </DropdownMenuCheckboxItem>
          ))}
          {selectedProfessions.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <button
                onClick={() => updateListParam('profession', [])}
                className="w-full px-2 py-1.5 text-sm text-left text-muted-foreground hover:text-foreground"
              >
                {t('search.clearFilter')}
              </button>
            </>
          )}
        </FilterChip>

        <FilterChip label={t('search.language')} count={selectedLanguages.length}>
          {languages.map((language) => (
            <DropdownMenuCheckboxItem
              key={language.id}
              checked={selectedLanguages.includes(language.id)}
              onCheckedChange={() => toggleLanguage(language.id)}
              onSelect={(e) => e.preventDefault()}
            >
              {language.autonym}
            </DropdownMenuCheckboxItem>
          ))}
          {selectedLanguages.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <button
                onClick={() => updateListParam('language', [])}
                className="w-full px-2 py-1.5 text-sm text-left text-muted-foreground hover:text-foreground"
              >
                {t('search.clearFilter')}
              </button>
            </>
          )}
        </FilterChip>

        {hasActiveFilters && (
          <button
            onClick={handleClearAll}
            className="text-sm text-muted-foreground hover:text-foreground underline"
          >
            {t('search.clearAll')}
          </button>
        )}
      </div>

      {/* <div className="relative">
        <input
          value={query}
          onChange={handleInputChange}
          name="query"
          type="text"
          placeholder={t('search.placeholder')}
          className="flex w-full px-4 py-2 pr-10 text-base transition-colors bg-transparent border rounded-md shadow-sm h-11 border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:text-sm"
        />
        {query && (
          <button
            onClick={handleClear}
            aria-label={t('search.clear')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div> */}
    </div>
  )
}