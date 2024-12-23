import type { CollectionConfig } from 'payload'
import { admins } from '@/payload/access/admins'
import { anyone } from '../access/anyone'

export const Professions: CollectionConfig = {
  slug: 'professions',
  admin: {
    useAsTitle: 'title',
  },
  labels: { singular: 'Healthcare Profession', plural: 'Healthcare Professions' },
  access: {
    read: anyone,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: [{ name: 'title', label: 'Name of Profession', type: 'text', required: true }],
}
