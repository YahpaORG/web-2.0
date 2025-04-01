import type { CollectionConfig } from 'payload'
import { adminsOnly } from '@/payload/access/adminsOnly'

export const media: CollectionConfig = {
  slug: 'media',
  admin: {},
  access: {
    update: adminsOnly,
    delete: adminsOnly,
    create: adminsOnly,
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
