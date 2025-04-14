import React from 'react'
import type { Payload } from 'payload'

export default async function Dashboard({ payload }: { payload: Payload }) {
  const members = await payload.count({
    collection: 'registry-members',
  })

  const pendingForms = await payload.count({
    collection: 'registry-forms',
    where: {
      registry_status: {
        equals: 'review',
      },
    },
  })

  const contactForms = await payload.count({
    collection: 'contact-forms',
  })

  return (
    <div className="flex gap-6">
      <div className="flex flex-col items-center p-4 bg-gray-100 border-2 border-gray-100 rounded-xl min-w-[10rem] dark:bg-gray-500">
        <p>Total Members</p>
        <b className="text-2xl">{members.totalDocs}</b>
      </div>

      <div className="flex flex-col items-center p-4 bg-gray-100 border-2 border-gray-100 rounded-xl min-w-[10rem] dark:bg-gray-500">
        <p>Pending Forms</p>
        <b className="text-2xl">{pendingForms.totalDocs}</b>
      </div>

      <div className="flex flex-col items-center p-4 bg-gray-100 border-2 border-gray-100 rounded-xl min-w-[10rem] dark:bg-gray-500">
        <p>Messages</p>
        <b className="text-2xl">{contactForms.totalDocs}</b>
      </div>
    </div>
  )
}
