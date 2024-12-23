import { anyone } from '@/payload//access/anyone'
import type { CollectionConfig } from 'payload'
import { isSelfOrAdmin } from '../access/isSelfOrAdmin'
import { FirstNameField, LastNameField } from '../fields/registry-form'

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
    {
      name: 'profession',
      label: 'Professional Title',
      type: 'relationship',
      relationTo: ['professions'],
      required: true,
    },
    {
      name: 'languages',
      label: 'Spoken Languages',
      type: 'relationship',
      relationTo: ['languages'],
      hasMany: true,
      required: true,
    },
    {
      name: 'description',
      label: 'About',
      type: 'textarea',
    },
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
    {
      name: 'clinics',
      label: 'Practice/Clinic Information',
      type: 'array',
      fields: [
        {
          name: 'is_private',
          label: 'Is this a private practice/clinc?',
          type: 'checkbox',
          required: true,
        },
        { name: 'name', label: 'Name of Practice/Clinic', type: 'text', required: true },
        { name: 'address', label: 'Address of Practice/Clinic', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'phone_number', label: 'Primary Phone Number', type: 'text' },
        { name: 'website', label: 'Website Address', type: 'text' },
        { name: 'availability', label: 'Availability/Working Hours', type: 'text' },
        {
          name: 'consultation_methods',
          label: 'Consultation Methods',
          type: 'select',
          options: [
            { label: 'In Person Consultation', value: 'in-person' },
            { label: 'Virtual Consultation', value: 'virtual' },
            { label: 'Walk-in', value: 'walk-in' },
          ],
        },
      ],
    },
  ],
}
