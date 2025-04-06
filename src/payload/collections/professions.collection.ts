import type { CollectionConfig } from 'payload'
import { adminsOnly } from '@/payload/access/adminsOnly'
import { anyone } from '../access/anyone'

export const professions: CollectionConfig = {
  slug: 'professions',
  admin: {
    useAsTitle: 'title',
  },
  labels: { singular: 'Healthcare Profession', plural: 'Healthcare Professions' },
  access: {
    read: anyone,
    create: adminsOnly,
    update: adminsOnly,
    delete: adminsOnly,
  },
  fields: [
    { name: 'title', label: 'Name of Profession', type: 'text', required: true },
    // {
    //   name: 'relatedMember',
    //   type: 'join',
    //   collection: 'registry-members',
    //   on: 'profession',
    // },
  ],
}
