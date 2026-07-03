import { getRegistryResults } from '@/lib/server/get-registry-results'
import { ORDERS, PATIENT_OPTIONS, PROFESSIONS } from '@/lib/validation/registry-form.schema'
import { Language } from '@/payload/payload-types'
import { getTranslations } from 'next-intl/server'
import { Building2, Globe, Mail, MapPin, Phone, Languages } from 'lucide-react'

type SearchResultsProps = {
  query: string
  currentPage: number
  profession?: string[]
  language?: string[]
}

const professionLabels = Object.fromEntries(PROFESSIONS.map((p) => [p.value, p.label]))
const orderLabels = Object.fromEntries(ORDERS.map((o) => [o.value, o.label]))

export default async function SearchResults({ query, currentPage, profession, language }: SearchResultsProps) {
  const results = await getRegistryResults({ query, currentPage, profession, language })
  const t = await getTranslations('RegistrySearchPage')

  return (
    <ul className="grid grid-cols-1 gap-4 py-6 mb-10">
      {results.docs.map((result) => {
        const contactEmail = result.practiceInfo?.email || result.email
        const website = result.practiceInfo?.website
        const practiceName = result.practiceInfo?.name
        const practiceAddress = result.practiceInfo?.address

        return (
          <li
            key={result.id}
            className="relative flex flex-col w-full gap-4 p-6 bg-white border border-gray-200 shadow-sm rounded-xl transition-all hover:shadow-md dark:bg-zinc-950 dark:border-zinc-800"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
              <div>
                <h3 className="text-2xl font-semibold text-primary capitalize">
                  {result.firstName} {result.lastName}
                </h3>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  {professionLabels[result.profession]}
                  {result.specialty && ` — ${result.specialty}`}
                </p>
                {result.professionalOrder && result.professionalOrder !== 'none' && (
                  <p className="text-sm text-gray-500 italic">
                    {orderLabels[result.professionalOrder]}
                  </p>
                )}
              </div>
            </div>

            <hr className="border-gray-100 dark:border-zinc-800" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {practiceName && (
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {practiceName}
                    </span>
                  </div>
                )}
                {practiceAddress && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    <span>{practiceAddress}</span>
                  </div>
                )}
                {website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary shrink-0" />
                    <a
                      href={website.startsWith('http') ? website : `https://${website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline truncate"
                    >
                      {website}
                    </a>
                  </div>
                )}
              </div>

              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {result.primaryPhoneNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <span>{result.primaryPhoneNumber}</span>
                  </div>
                )}
                {contactEmail && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <a href={`mailto:${contactEmail}`} className="hover:underline">{contactEmail}</a>
                  </div>
                )}
                {!result.primaryPhoneNumber && !contactEmail && (
                  <p className="text-xs italic text-gray-400">{t('results.noContactInfo')}</p>
                )}
              </div>
            </div>

            {
              result.languages && result.languages.length > 0 && (
                <div className="mt-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Languages className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('results.spokenLanguages')}:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {(result.languages as Language[]).map((language, index) => (
                        <span
                          key={`${result.id}-${index}`}
                          className="px-3 py-0.5 text-xs bg-secondary rounded-full"
                        >
                          {language.autonym}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }
          </li>
        )
      })}
    </ul >
  )
}