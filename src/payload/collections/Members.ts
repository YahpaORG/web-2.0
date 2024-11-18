import type { CollectionConfig } from 'payload'
import { admins } from '@/payload/access/admins'

export const Members: CollectionConfig = {
  slug: 'members',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: admins,
    create: () => true,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
