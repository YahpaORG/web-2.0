// src/payload/collections/Timeline.ts

import { CollectionConfig } from 'payload'
import { adminsOnly } from '../access/adminsOnly'

export const projects: CollectionConfig = {
  slug: 'projects',
  access: {
    update: adminsOnly,
    delete: adminsOnly,
    create: adminsOnly,
    read: () => true,
  },
  fields: [
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media', // assuming you have a media collection
    },
  ],
}
