import type { CollectionConfig, FieldHook } from 'payload'

import { isSelfOrAdmin } from '../access/isSelfOrAdmin'
import { adminsOnly } from '../access/adminsOnly'
import { FirstNameField, LastNameField } from '../fields/registry-form'
import { RegistryForm } from '../payload-types'

const createRegistryMember: FieldHook<RegistryForm> = async ({ value, operation, data, req }) => {
  if (operation === 'update') {
    if (value === 'approved') {
      await req.payload.create({
        collection: 'registry-members',
        data: {
          languages: data?.languages!,
          profession: data?.profession!,
        },
      })
    }
  }
}

export const registryForms: CollectionConfig = {
  labels: {
    singular: 'Registry Form',
    plural: 'Registry Forms',
  },
  slug: 'registry-forms',
  access: {
    read: isSelfOrAdmin,
    create: isSelfOrAdmin,
    delete: isSelfOrAdmin,
    update: adminsOnly,
  },
  fields: [
    {
      name: 'registry_status',
      label: 'Registry Status',
      type: 'select',
      options: [
        {
          label: 'Approved',
          value: 'approved',
        },
        {
          label: 'In Review',
          value: 'review',
        },
      ],
      defaultValue: 'review',
      hasMany: false,
      required: false,
      hooks: {
        afterChange: [createRegistryMember],
      },
    },
    {
      name: 'submittedBy',
      label: 'Submitted By User',
      type: 'text',
    },
    FirstNameField,
    LastNameField,
    {
      name: 'primary_phone_number',
      label: 'Primary Phone Number',
      type: 'text',
      required: true,
    },
    {
      label: 'Preferred Contact Method',
      name: 'preferred_contact_method',
      type: 'radio',
      options: [
        { label: 'By email', value: 'email' },
        { label: 'By phone', value: 'phone' },
      ],
      required: true,
    },
    {
      name: 'languages',
      label: 'Spoken Languages',
      type: 'relationship',
      relationTo: 'languages',
      hasMany: true,
      required: true,
    },
    // {
    //   label: 'Other Languages',
    //   name: 'other_languages',
    //   type: 'text',
    //   required: false,
    // },
    {
      label: 'Status',
      name: 'status',
      type: 'radio',
      options: [
        {
          label: 'Studying',
          value: 'student',
        },
        {
          label: 'Seeking employment',
          value: 'unemployed',
        },
        {
          label: 'Employed',
          value: 'employed',
        },
      ],
      required: true,
    },
    // {
    //   name: 'estimated graduation date',
    //   type: 'date',
    //   required: false,
    // },
    {
      name: 'profession',
      label: 'Professional Title',
      type: 'relationship',
      relationTo: ['professions'],
      hasMany: false,
      required: true,
    },
    // {
    //   name: 'other profession',
    //   type: 'text',
    //   required: false,
    // },
    // {
    //   name: 'sectors',
    //   type: 'select',
    //   options: [
    //     {
    //       label: 'Public',
    //       value: 'public',
    //     },
    //     {
    //       label: 'Private',
    //       value: 'private',
    //     },
    //   ],
    //   hasMany: true,
    //   required: false,
    // },
  ],
}
