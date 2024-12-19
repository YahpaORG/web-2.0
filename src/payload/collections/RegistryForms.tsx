import type { CollectionConfig, FieldHook } from 'payload'

import { isSelfOrAdmin } from '../access/isSelfOrAdmin'
import { admins } from '../access/admins'
import { RegistryForm } from '../payload-types'
import {
  ProfessionField,
  LanguageField,
  FirstNameField,
  LastNameField,
  EmailField,
} from '../fields/registry-form'

/**
 * Hook that creates a registry member after the registry form status has been changed to approved
 */
const registerUserToRegistry: FieldHook<RegistryForm> = async ({
  collection,
  operation,
  req,
  data,
  value,
  ...rest
}) => {
  const { payload } = req
  const formData = data as RegistryForm
  if (operation === 'update') {
    if (value === 'approved') {
      const result = await payload.create({
        collection: 'registry',
        data: {
          relatedUser: formData.user_id,
          profession: formData.profession,
          language: formData.language,
          first_name: formData.first_name,
          last_name: formData.last_name,
          emails: [{ email: formData.email }],
          phone_numbers: [{ phone_number: formData.primary_phone_number }],
        },
      })

      console.log('Successfully created Registry', result)
    }
  }
}

// TODO: create afterChange hook to update User collection with data.
export const RegistryForms: CollectionConfig = {
  labels: {
    singular: 'Registry Form',
    plural: 'Registry Forms',
  },
  slug: 'registry-forms',
  access: {
    read: isSelfOrAdmin,
    create: isSelfOrAdmin,
    delete: isSelfOrAdmin,
    update: admins,
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
      hooks: {
        afterChange: [registerUserToRegistry],
      },
      hasMany: false,
      required: false,
    },
    {
      name: 'user_id',
      label: 'User ID',
      type: 'text',
      required: true,
      access: {
        update: () => false,
      },
    },
    FirstNameField,
    LastNameField,
    EmailField,
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
    LanguageField,
    {
      label: 'Other Languages',
      name: 'other_languages',
      type: 'text',
      required: false,
    },
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
    {
      name: 'estimated graduation date',
      type: 'date',
      required: false,
    },
    ProfessionField,
    {
      name: 'other profession',
      type: 'text',
      required: false,
    },
    {
      name: 'sectors',
      type: 'select',
      options: [
        {
          label: 'Public',
          value: 'public',
        },
        {
          label: 'Private',
          value: 'private',
        },
      ],
      hasMany: true,
      required: false,
    },
  ],
}
