type SearchResultsProps = {
  query: string
  currentPage: number
}

import { ORDERS, PATIENT_OPTIONS } from '@/lib/validation/registry-form.schema'
import { registryData } from '@/data/registryData'
import { getProfessionLabel } from '@/data/occupation-mappings'
import { useLocale, useTranslations } from 'next-intl'
import { MapPin, Building2, Phone, Mail, Languages } from 'lucide-react' // Optional: if using Lucide icons

export default function TempRegistryResults({ query }: SearchResultsProps) {
  const results = registryData
  const locale = useLocale()
  const t = useTranslations('RegistrySearchPage')

  const filteredResults = results.filter((result) => {
    const searchTerm = query.toLowerCase()
    const profession = getProfessionLabel(result.profession, locale).toLowerCase()
    return profession.includes(searchTerm)
  })

  return (
    <ul className="grid grid-cols-1 gap-4 py-6 mb-10">
      {filteredResults.map((result) => (
        <li
          key={result.id}
          className="relative flex flex-col w-full gap-4 p-6 bg-white border border-gray-200 shadow-sm rounded-xl transition-all hover:shadow-md dark:bg-zinc-950 dark:border-zinc-800"
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
            <div>
              <h3 className="text-2xl font-semibold text-primary capitalize">
                {result.firstName} {result.lastName}
              </h3>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                {getProfessionLabel(result.profession, locale)}
              </p>
              <p className="text-sm text-gray-500 italic">
                {ORDERS.find((o) => o.value === result.professionalOrder)?.label}
              </p>
            </div>
            {/* Accepting Patients Badge
            {result.isAcceptingPatients && (
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full w-fit">
                {t('results.newPatients.label', {
                  answer: t(`results.newPatients.${result.isAcceptingPatients}`),
                })}
              </span>
            )} */}
          </div>

          <hr className="border-gray-100 dark:border-zinc-800" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {result.workplace || 'Private Practice'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                <span>{result.address || 'Address not listed'}</span>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>{result.primaryPhoneNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>{result.email}</span>
              </div>
            </div>
          </div>

          <div className="mt-2">
            <div className="flex flex-wrap items-center gap-2">
              <Languages className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('results.spokenLanguages')}:
              </span>
              <div className="flex flex-wrap gap-2">
                {result.languages?.map((lang, idx) => (
                  <span key={idx} className="px-3 py-0.5 text-xs  bg-secondary rounded-full">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
