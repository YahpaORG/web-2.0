import type { CollectionConfig } from 'payload'
import { admins } from '@/payload/access/admins'

export const Admins: CollectionConfig = {
  slug: 'admins',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: admins,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
