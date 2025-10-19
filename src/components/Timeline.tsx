'use client'

import { Media } from '@/payload/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { format } from 'date-fns'
import { useLocale } from 'next-intl'

export type TimelineItem = {
  date: string | Date
  title?: string | null | undefined
  description: SerializedEditorState
  image?: Media | null | undefined
}

type GroupedEventsByYear = {
  [year: string]: {
    [month: string]: TimelineItem[]
  }
}

type TimelineProps = {
  type?: 'asc' | 'desc'
  className?: string
  items: TimelineItem[]
}

export function Timeline({ type = 'asc', className, items }: TimelineProps) {
  const locale = useLocale()
  const groupedItems: GroupedEventsByYear = {}

  for (const item of items) {
    const date = new Date(item.date)
    const year = String(date.getFullYear())
    const month = date.toLocaleString(locale, { month: 'long' })

    if (!groupedItems[year]) groupedItems[year] = {}
    if (!groupedItems[year][month]) groupedItems[year][month] = []

    groupedItems[year][month].push(item)
  }

  // Get sorted years descending
  const sortedYears = Object.keys(groupedItems).sort((a, b) =>
    type === 'asc' ? Number(a) - Number(b) : Number(b) - Number(a),
  )

  return (
    <div className={`${className}`}>
      {sortedYears.map((year) => {
        const months = groupedItems[year]

        // Sort months descending by month index
        const sortedMonths = Object.keys(months).sort((a, b) => {
          const monthIndex = (m: string) => new Date(`${m} 1, 2000`).getMonth()
          return type === 'asc' ? monthIndex(a) - monthIndex(b) : monthIndex(b) - monthIndex(a)
        })

        return (
          <div key={year} className="mb-16 ml-4">
            <h3 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">{year}</h3>

            {sortedMonths.map((month) => {
              const items = months[month]

              return (
                <div key={month} className="mb-8">
                  <ol className="relative m-4 border-gray-200 border-s dark:border-gray-700">
                    {items.map((item, idx) => (
                      <li key={idx} className="mb-10 ms-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>

                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                          {`${month} ${new Date(item.date).getDate()}, ${year}`}
                        </time>

                        {item.title && (
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {item.title}
                          </h4>
                        )}

                        <div className="max-w-full mt-2 text-base font-normal prose text-gray-500 break-words dark:text-gray-400 dark:prose-invert">
                          <RichText data={item.description} />
                        </div>

                        {typeof item.image === 'object' && item.image?.url && (
                          <div className="mt-4">
                            <Image
                              src={item.image.url}
                              width={item.image.width!}
                              height={item.image.height!}
                              alt={item.title || 'Timeline image'}
                              className="border rounded-lg shadow-sm"
                            />
                          </div>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
