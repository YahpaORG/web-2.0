import type { CollectionConfig } from 'payload'
import { admins } from '@/payload/access/admins'
export const Media: CollectionConfig = {
  slug: 'media',
  admin: {},
  access: {
    update: admins,
    delete: admins,
    create: admins,
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
