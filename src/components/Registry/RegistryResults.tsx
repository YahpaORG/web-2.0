import { getRegistryResults } from '@/lib/server/get-registry-results'
import { ORDERS, PATIENT_OPTIONS } from '@/lib/validation/registry-form.schema'
import { LanguagesSelect } from '@/payload/payload-types'
import { getTranslations } from 'next-intl/server'

type SearchResultsProps = {
  query: string
  currentPage: number
}

export default async function SearchResults({ query, currentPage }: SearchResultsProps) {
  const results = await getRegistryResults({ query, currentPage })
  const t = await getTranslations('RegistrySearchPage')

  return (
    <ul className="flex flex-col w-full gap-4 py-4 mb-10">
      {results.docs.map((result) => (
        <li
          key={result.id}
          className="flex flex-col w-full gap-2 p-4 border-2 border-black rounded-md"
        >
          <b className="capitalize">
            {result.firstName} {result.lastName}
          </b>
          <p className="capitalize">{result.profession}</p>
          <p>{ORDERS.find((order) => order.value === result.professionalOrder)?.label}</p>
          <p>
            {t('results.phoneNumber')}: {result.primaryPhoneNumber}
          </p>
          <p>
            {t('results.email')}: {result.email}
          </p>
          <div className="flex gap-2">
            <span>{t('results.spokenLanguages')}:</span>
            <ul className="flex flex-row items-center gap-4">
              {(result.languages as LanguagesSelect[])?.map((language, index) => (
                <div className="px-4 text-white bg-black rounded-3xl" key={`${result.id}-${index}`}>
                  {language.autonym}
                </div>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            {result.isAcceptingPatients && (
              <p>
                {t('results.newPatients.label', {
                  answer: t(
                    `results.newPatients.${
                      PATIENT_OPTIONS.find(
                        (option) => option.value === result.isAcceptingPatients,
                      )!!.value
                    }`,
                  ),
                })}
              </p>
            )}
          </div>
          <p>
            {t('results.joinedSince')} {new Date(result.createdAt).toDateString()}
          </p>
          <p>
            {t('results.lastUpdate')} {new Date(result.updatedAt).toDateString()}
          </p>
        </li>
      ))}
    </ul>
  )
}
