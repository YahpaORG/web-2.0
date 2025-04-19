import validator from 'validator'
import { z } from 'zod'

export const JOB_STATUS = ['student', 'employed', 'unemployed'] as const

export const SECTORS = [
  { label: 'Private', value: 'private' },
  { label: 'Public', value: 'public' },
]
export const CONTACT_METHODS = [
  { label: 'By Email', value: 'email' },
  { label: 'By Phone', value: 'phone' },
]
export const PROFESSIONS = [
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
]

export const PATIENT_OPTIONS = [
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
] as const

export const ORDERS = [
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
]

const professions = [
  'acupuncturist',
  'art_therapist',
  'audiologist',
  'chiropractor',
  'dentist',
  'dietitian',
  'denturologist',
  'occupational_therapist',
  'nurse',
  'kinesiologist',
  'massage_therapist',
  'physician',
  'optometrist',
  'osteopath',
  'pharmacist',
  'podiatrist',
  'physiotherapist',
  'psychologist',
  'psychotherapist',
  'social_worker',
  'speech_language_pathologist',
] as const

export const RegistryFormSchema = z.object({
  // Personal info
  firstName: z.string().min(1, { message: 'Please enter your first name.' }),
  lastName: z.string().min(1, { message: 'Please enter your last name.' }),
  languages: z.array(z.string()).min(1, {
    message: 'You have to select at least one language.',
  }),

  // Contact info
  email: z.string().email(),
  primaryPhoneNumber: z
    .string({ required_error: 'Your phone number is required.' })
    .refine(validator.isMobilePhone, { message: 'Please provide a valid phone number.' }),
  preferredContactMethod: z.enum(['email', 'phone']),

  // Professional info
  profession: z.enum(professions, { message: 'Please select a profession.' }),
  specialty: z.string({ message: 'Please write your specialty.' }),
  professionalOrder: z.enum([
    'ooaq',
    'ocq',
    'oeq',
    'ondq',
    'psychologues',
    'opiq',
    'oppq',
    'podiatres',
    'oiiq',
    'pharmaciens',
    'dentistes',
    'none',
    'other',
  ]),
  graduationDate: z.string().optional(),
  sector: z.enum(['public', 'private']),
  isAcceptingPatients: z.enum(['yes', 'no', 'yes_temporary', 'no_later', 'yes_private']),
})

export type RegistryFormValues = z.infer<typeof RegistryFormSchema>
