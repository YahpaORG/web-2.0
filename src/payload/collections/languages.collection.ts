import type { CollectionConfig } from 'payload'
import { adminsOnly } from '@/payload/access/adminsOnly'
import { anyone } from '../access/anyone'

export const languages: CollectionConfig = {
  slug: 'languages',
  admin: {
    useAsTitle: 'heteronym',
  },
  access: {
    read: anyone,
    create: adminsOnly,
    update: adminsOnly,
    delete: adminsOnly,
  },
  fields: [
    {
      name: 'autonym',
      label: 'Autonym',
      type: 'text',
      required: true,
    },
    {
      name: 'code',
      label: 'Language Code',
      type: 'text',
      minLength: 2,
      required: true,
    },
    {
      name: 'heteronym',
      label: 'English Heteronym',
      type: 'text',
    },
  ],
}
