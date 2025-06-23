'use client'

import { Media } from '@/payload/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { format } from 'date-fns'

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
  className?: string
  items: TimelineItem[]
}

export function Timeline({ className, items }: TimelineProps) {
  const groupedItems: GroupedEventsByYear = {}

  for (const item of items) {
    const date = new Date(item.date)
    const year = String(date.getFullYear())
    const month = date.toLocaleString('default', { month: 'long' })

    if (!groupedItems[year]) groupedItems[year] = {}
    if (!groupedItems[year][month]) groupedItems[year][month] = []

    groupedItems[year][month].push(item)
  }

  return (
    <div className={`${className}`}>
      {Object.entries(groupedItems).map(([year, months]) => (
        <div key={year} className="ml-4 mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{year}</h3>

          {Object.entries(months).map(([month, items]) => (
            <div key={month} className="mb-8">
              <ol className="relative border-s border-gray-200 dark:border-gray-700 m-4">
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

                    <div className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400 prose dark:prose-invert max-w-full break-words">
                      <RichText data={item.description} />
                    </div>

                    {typeof item.image === 'object' && item.image?.url && (
                      <div className="mt-4">
                        <Image
                          src={item.image.url}
                          width={item.image.width!}
                          height={item.image.height!}
                          alt={item.title || 'Timeline image'}
                          className="rounded-lg border shadow-sm"
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
