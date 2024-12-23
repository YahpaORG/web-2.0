import type { CollectionConfig } from 'payload'
import { admins } from '@/payload/access/admins'
import { anyone } from '../access/anyone'

export const Languages: CollectionConfig = {
  slug: 'languages',
  admin: {
    useAsTitle: 'heteronym',
  },
  access: {
    read: anyone,
    create: admins,
    update: admins,
    delete: admins,
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
