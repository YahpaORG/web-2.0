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
  required: true,
}

export const PrimaryPhoneNumberField: Field = {
  name: 'primaryPhoneNumber',
  label: 'Primary Phone Number',
  type: 'text',
  required: true,
}

export const PreferredContactMethodField: Field = {
  label: 'Preferred Contact Method',
  name: 'preferredContactMethod',
  type: 'radio',
  options: [
    { label: 'By email', value: 'email' },
    { label: 'By phone', value: 'phone' },
  ],
  required: true,
}

export const LanguagesRelationshipField: Field = {
  name: 'languages',
  label: 'Spoken Languages',
  type: 'relationship',
  relationTo: 'languages',
  hasMany: true,
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
  ],
  required: true,
}

export const GraduationDateField: Field = {
  name: 'graduationDate',
  type: 'date',
  defaultValue: new Date(),
}

export const SpecialtyField: Field = {
  name: 'specialty',
  label: 'Specialty',
  type: 'text',
}

export const ProfessionalOrderSelectField: Field = {
  name: 'professionalOrder',
  label: 'Professional Order or Association',
  type: 'select',
  options: [
    {
      label: 'OOAQ: Ordre des orthophonistes et audiologistes du Québec',
      value: 'ooaq',
    },
    {
      label: 'Ordre des chiropraticiens du Québec',
      value: 'ocq',
    },
    {
      label: 'OEQ: Ordre des ergothérapeutes du Québec',
      value: 'oeq',
    },
    { label: 'ONDQ: Ordre des diététistes-nutritionnistes du Québec', value: 'ondq' },
    { label: 'Ordre des psychologues du Québec', value: 'psychologues' },
    {
      label: 'OPIQ: Ordre des inhalothérapeutes du Québec',
      value: 'opiq',
    },
    { label: 'OPPQ: Ordre Professionel de la Physiothérapie du Québec', value: 'oppq' },
    { label: 'Ordre des Podiatres du Québec', value: 'podiatres' },
    { label: 'OIIQ: Ordre des infirmières et infirmiers du Québec', value: 'oiiq' },
    { label: 'Ordre des pharmaciens du Québec', value: 'pharmaciens' },
    { label: 'Ordre des dentistes du Québec', value: 'dentistes' },
    { label: 'None', value: 'none' },
    { label: 'Other', value: 'other' },
  ],
  required: true,
}

export const SectorField: Field = {
  name: 'sector',
  type: 'radio',
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
  required: true,
}

export const IsAcceptingPatientsField: Field = {
  name: 'isAcceptingPatients',
  type: 'radio',
  options: [
    {
      label: 'Yes, I am accepting new patients',
      value: 'yes',
    },
    {
      label: 'No, I am not taking new patients',
      value: 'no',
    },
    {
      label: 'Yes - but only for a definite period.',
      value: 'yes_temporary',
    },
    {
      label: 'Not right now - but in the future.',
      value: 'no_later',
    },
    {
      label: 'Yes - but in private only.',
      value: 'yes_private',
    },
  ],
  required: true,
}

export const NewPatientAcceptanceDateField: Field = {
  name: 'newPatientAcceptanceDate',
  type: 'date',
}
