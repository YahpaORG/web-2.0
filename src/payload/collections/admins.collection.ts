import type { CollectionConfig } from 'payload'
import { adminsOnly } from '@/payload/access/adminsOnly'
import { anyone } from '../access/anyone'

export const admins: CollectionConfig = {
  slug: 'admins',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: adminsOnly,
    create: adminsOnly,
    update: adminsOnly,
    delete: adminsOnly,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
