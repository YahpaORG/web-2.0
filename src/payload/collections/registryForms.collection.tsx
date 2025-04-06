import type { CollectionConfig, FieldHook } from 'payload'

import { isSelfOrAdmin } from '../access/isSelfOrAdmin'
import { adminsOnly } from '../access/adminsOnly'
import {
  EmailField,
  FirstNameField,
  GraduationDateField,
  IsAcceptingPatientsField,
  LanguagesRelationshipField,
  LastNameField,
  NewPatientAcceptanceDateField,
  PreferredContactMethodField,
  PrimaryPhoneNumberField,
  ProfessionalOrderSelectField,
  ProfessionSelectField,
  SectorField,
  SpecialtyField,
} from '../fields/registry-form'
import { RegistryForm } from '../payload-types'

const createRegistryMember: FieldHook<RegistryForm> = async ({ value, operation, data, req }) => {
  if (operation === 'update') {
    if (value === 'approved') {
      await req.payload.create({
        collection: 'registry-members',
        data: {
          ...(data as RegistryForm),
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
    LanguagesRelationshipField,
    EmailField,
    PrimaryPhoneNumberField,
    PreferredContactMethodField,
    ProfessionSelectField,
    SpecialtyField,
    GraduationDateField,
    ProfessionalOrderSelectField,
    SectorField,
    IsAcceptingPatientsField,
    NewPatientAcceptanceDateField,
  ],
}
