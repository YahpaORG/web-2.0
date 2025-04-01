import { fetchSearchResults } from '@/app/(frontend)/registry/search/actions'
import { LanguagesSelect, Profession } from '@/payload/payload-types'

type SearchResultsProps = {
  query: string
  currentPage: number
}

export default async function SearchResults({ query, currentPage }: SearchResultsProps) {
  const results = await fetchSearchResults({ query, currentPage })

  return (
    <ul className="flex flex-col w-full gap-4">
      {results.docs.map((result) => (
        <li
          key={result.id}
          className="flex flex-col w-full gap-2 p-4 border-2 border-black rounded-md"
        >
          {result.profession && (
            <p className="capitalize">{(result.profession.value as Profession).title}</p>
          )}
          <div className="flex gap-2">
            <span>Spoken Languages:</span>
            <ul className="flex flex-row items-center gap-4">
              {(result.languages as LanguagesSelect[])?.map((language, index) => (
                <div className="px-4 text-white bg-black rounded-3xl" key={`${result.id}-${index}`}>
                  {language.autonym}
                </div>
              ))}
            </ul>
          </div>
          <p>Joined since {new Date(result.createdAt).toDateString()}</p>
          <p>Last Updated on: {new Date(result.updatedAt).toDateString()}</p>
        </li>
      ))}
    </ul>
  )
}
