import type { CollectionConfig, FieldHook } from 'payload'
import { isSelfOrAdmin } from '../access/isSelfOrAdmin'
import { adminsOnly } from '../access/adminsOnly'
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
  LicenseNumberField,
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
import { RegistryForm } from '../payload-types'

const createRegistryMember: FieldHook<RegistryForm> = async ({ value, operation, data, req }) => {
  console.log('createRegistryMember hook fired', { value, operation })
  if (operation === 'update' && value === 'approved' && data) {
    const form = data as unknown as RegistryForm

    await req.payload.create({
      collection: 'registry-members',
      data: {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        primaryPhoneNumber: form.primaryPhoneNumber,
        preferredContactMethod: form.preferredContactMethod,
        website: form.website,
        practiceInfo: form.practiceInfo,
        languages: form.languages,
        jobStatus: form.jobStatus,
        profession: form.profession,
        specialty: form.specialty,
        graduationDate: form.graduationDate,
        professionalOrder: form.professionalOrder,
        sector: form.sector,
        isAcceptingPatients: form.isAcceptingPatients,
        newPatientAcceptanceDate: form.newPatientAcceptanceDate,
        consentToWebsite: form.consentToWebsite,
        consentToReferrals: form.consentToReferrals,
      },
    })
  }
  return value
}
export const registryForms: CollectionConfig = {
  labels: {
    singular: 'Registry Form',
    plural: 'Registry Forms',
  },
  slug: 'registry-forms',
  access: {
    read: isSelfOrAdmin,
    create: ({ req }) => !!req.user,
    delete: isSelfOrAdmin,
    update: adminsOnly,
  },
  fields: [
    {
      name: 'registry_status',
      label: 'Registry Status',
      type: 'select',
      options: [
        { label: 'Approved', value: 'approved' },
        { label: 'In Review', value: 'review' },
        { label: 'Rejected', value: 'rejected' },
      ],
      defaultValue: 'review',
      required: false,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        afterChange: [createRegistryMember],
      },
    },
    {
      name: 'submittedBy',
      label: 'Submitted By User',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
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
    LicenseNumberField,
    ConsentToWebsiteField,
    ConsentToReferralsField,
  ],
}