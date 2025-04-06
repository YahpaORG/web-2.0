import { anyone } from '@/payload//access/anyone'
import type { CollectionConfig } from 'payload'
import { isSelfOrAdmin } from '../access/isSelfOrAdmin'
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

export const registryMembers: CollectionConfig = {
  slug: 'registry-members',
  labels: { plural: 'Registry Members', singular: 'Registry Member' },
  access: {
    read: anyone,
    create: isSelfOrAdmin,
    update: isSelfOrAdmin,
    delete: isSelfOrAdmin,
  },
  fields: [
    FirstNameField,
    LastNameField,
    EmailField,
    PrimaryPhoneNumberField,
    PreferredContactMethodField,
    LanguagesRelationshipField,
    ProfessionSelectField,
    SpecialtyField,
    GraduationDateField,
    ProfessionalOrderSelectField,
    SectorField,
    IsAcceptingPatientsField,
    NewPatientAcceptanceDateField,
  ],
}
