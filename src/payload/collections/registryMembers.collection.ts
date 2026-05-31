import { anyone } from '@/payload/access/anyone'
import type { CollectionConfig } from 'payload'
import { isSelfOrAdmin } from '../access/isSelfOrAdmin'
import {
  ConsentToReferralsField,
  ConsentToWebsiteField,
  EmailField,
  FirstNameField,
  GraduationDateField,
  IsAcceptingPatientsField,
  JobStatusField,
  LanguagesRelationshipField,
  LastNameField,
  NewPatientAcceptanceDateField,
  PracticeInfoField,
  PreferredContactMethodField,
  PrimaryPhoneNumberField,
  ProfessionalOrderSelectField,
  ProfessionSelectField,
  SectorField,
  SpecialtyField,
  WebsiteField,
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
    WebsiteField,
    PreferredContactMethodField,
    PracticeInfoField,
    LanguagesRelationshipField,
    JobStatusField,
    ProfessionSelectField,
    SpecialtyField,
    GraduationDateField,
    ProfessionalOrderSelectField,
    SectorField,
    IsAcceptingPatientsField,
    NewPatientAcceptanceDateField,
    ConsentToWebsiteField,
    ConsentToReferralsField,
  ],
}