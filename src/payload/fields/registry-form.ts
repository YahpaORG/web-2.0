import { Field } from 'payload'

export const FirstNameField: Field = {
  name: 'firstName',
  label: 'First Name',
  type: 'text',
  required: true,
}

export const LastNameField: Field = {
  name: 'lastName',
  label: 'Last Name',
  type: 'text',
  required: true,
}

export const EmailField: Field = {
  name: 'email',
  label: 'Contact Email',
  type: 'email',
  required: false,
}

export const PrimaryPhoneNumberField: Field = {
  name: 'primaryPhoneNumber',
  label: 'Primary Phone Number',
  type: 'text',
  required: false,
}

export const PreferredContactMethodField: Field = {
  label: 'Preferred Contact Method',
  name: 'preferredContactMethod',
  type: 'radio',
  options: [
    { label: 'By email', value: 'email' },
    { label: 'By phone', value: 'phone' },
    { label: 'Website', value: 'website' },
    { label: 'Other', value: 'other' },
  ],
  required: false,
}

export const PracticeInfoField: Field = {
  name: 'practiceInfo',
  label: 'Practice Information',
  type: 'group',
  admin: {
    description: 'Optional — only fill in if you want your practice information shown publicly.',
  },
  fields: [
    {
      name: 'name',
      label: 'Clinic / Hospital Name',
      type: 'text',
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
    },
    {
      name: 'email',
      label: 'Practice Email',
      type: 'email',
    },
    {
      name: 'phone',
      label: 'Practice Phone Number',
      type: 'text',
    },
    {
      name: 'website',
      label: 'Website',
      type: 'text'
    }
  ],
}

export const LanguagesRelationshipField: Field = {
  name: 'languages',
  label: 'Spoken Languages',
  type: 'relationship',
  relationTo: 'languages',
  hasMany: true,
  required: true,
}

export const JobStatusField: Field = {
  name: 'jobStatus',
  label: 'You are',
  type: 'radio',
  options: [
    { label: 'Healthcare Practitioner', value: 'practitioner' },
    { label: 'Student in a health discipline', value: 'student' },
  ],
  required: true,
}

export const ProfessionSelectField: Field = {
  name: 'profession',
  label: 'Profession',
  type: 'select',
  options: [
    { label: 'Acupuncturist', value: 'acupuncturist' },
    { label: 'Art Therapist', value: 'art_therapist' },
    { label: 'Audiologist', value: 'audiologist' },
    { label: 'Chiropractor', value: 'chiropractor' },
    { label: 'Dentist', value: 'dentist' },
    { label: 'Dietitian', value: 'dietitian' },
    { label: 'Denturologist', value: 'denturologist' },
    { label: 'Occupational Therapist', value: 'occupational_therapist' },
    { label: 'Nurse', value: 'nurse' },
    { label: 'Kinesiologist', value: 'kinesiologist' },
    { label: 'Massage Therapist', value: 'massage_therapist' },
    { label: 'Physician', value: 'physician' },
    { label: 'Optometrist', value: 'optometrist' },
    { label: 'Osteopath', value: 'osteopath' },
    { label: 'Pharmacist', value: 'pharmacist' },
    { label: 'Podiatrist', value: 'podiatrist' },
    { label: 'Physiotherapist', value: 'physiotherapist' },
    { label: 'Psychologist', value: 'psychologist' },
    { label: 'Psychotherapist', value: 'psychotherapist' },
    { label: 'Social Worker', value: 'social_worker' },
    { label: 'Speech Language Pathologist', value: 'speech_language_pathologist' },
    { label: 'Other', value: 'other' },
  ],
  required: true,
}

export const SpecialtyField: Field = {
  name: 'specialty',
  label: 'Specialty',
  type: 'text',
  required: false,
}

export const GraduationDateField: Field = {
  name: 'graduationDate',
  label: 'Graduation Date',
  type: 'date',
  required: false,
}

export const ProfessionalOrderSelectField: Field = {
  name: 'professionalOrder',
  label: 'Professional Order or Association',
  type: 'select',
  defaultValue: 'none',
  options: [
    { label: 'OOAQ: Ordre des orthophonistes et audiologistes du Québec', value: 'ooaq' },
    { label: 'Ordre des chiropraticiens du Québec', value: 'ocq' },
    { label: 'OEQ: Ordre des ergothérapeutes du Québec', value: 'oeq' },
    { label: 'ONDQ: Ordre des diététistes-nutritionnistes du Québec', value: 'ondq' },
    { label: 'Ordre des psychologues du Québec', value: 'psychologues' },
    { label: 'OPIQ: Ordre des inhalothérapeutes du Québec', value: 'opiq' },
    { label: 'OPPQ: Ordre Professionel de la Physiothérapie du Québec', value: 'oppq' },
    { label: 'Ordre des Podiatres du Québec', value: 'podiatres' },
    { label: 'OIIQ: Ordre des infirmières et infirmiers du Québec', value: 'oiiq' },
    { label: 'Ordre des pharmaciens du Québec', value: 'pharmaciens' },
    { label: 'Ordre des dentistes du Québec', value: 'dentistes' },
    { label: 'None', value: 'none' },
    { label: 'Other', value: 'other' },
  ],
  required: false,
}

export const SectorField: Field = {
  name: 'sector',
  label: 'Practice Sector',
  type: 'radio',
  defaultValue: 'private',
  options: [
    { label: 'Public', value: 'public' },
    { label: 'Private', value: 'private' },
    { label: 'Other', value: 'other' },
  ],
  required: false,
}

export const IsAcceptingPatientsField: Field = {
  name: 'isAcceptingPatients',
  label: 'Accepting New Patients',
  type: 'radio',
  options: [
    { label: 'Yes, I am accepting new patients', value: 'yes' },
    { label: 'No, I am not taking new patients', value: 'no' },
    { label: 'Yes - but only for a definite period', value: 'yes_temporary' },
    { label: 'Not right now - but in the future', value: 'no_later' },
    { label: 'Yes - but in private only', value: 'yes_private' },
  ],
  required: true,
}

export const NewPatientAcceptanceDateField: Field = {
  name: 'newPatientAcceptanceDate',
  label: 'New Patient Acceptance Date',
  type: 'date',
  required: false,
}

export const LicenseNumberField: Field = {
  name: 'licenseNumber',
  label: 'License Number',
  type: 'text',
  required: true,
  admin: {
    description: 'For verification purposes only. This information will never be shown publicly. If you are a student, enter: 0000.',
  },
}

export const ConsentToWebsiteField: Field = {
  name: 'consentToWebsite',
  label: 'Consent to be listed on YAHPA website',
  type: 'checkbox',
  required: true,
  admin: {
    description: 'Your practice information will be directly accessible by the general public via yahpa.org/registry.',
  },
}

export const ConsentToReferralsField: Field = {
  name: 'consentToReferrals',
  label: 'Consent to be available for referrals',
  type: 'checkbox',
  required: false,
  admin: {
    description: 'Your practice information will be made available to other health professionals for referrals.',
  },
}