import type { CollectionConfig } from 'payload'
import { anyone } from '@/payload//access/anyone'
import { isSelfOrAdmin } from '../access/isSelfOrAdmin'
import {
  ProfessionField,
  LanguageField,
  FirstNameField,
  LastNameField,
} from '../fields/registry-form'
export const RegistryMembers: CollectionConfig = {
  slug: 'registry-members',
  labels: { plural: 'Registry Members', singular: 'Registry Member' },
  access: {
    read: anyone,
    create: isSelfOrAdmin,
    update: isSelfOrAdmin,
    delete: isSelfOrAdmin,
  },
  fields: [
    {
      name: 'relatedUser',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
    },
    FirstNameField,
    LastNameField,
    ProfessionField,
    LanguageField,
    {
      name: 'emails',
      label: 'Emails',
      type: 'array',
      fields: [{ name: 'email', type: 'email' }],
    },

    // TODO: validate phone numbers
    {
      name: 'phone_numbers',
      label: 'Phone Numbers',
      type: 'array',
      fields: [{ name: 'phone_number', type: 'text' }],
    },
  ],
}
