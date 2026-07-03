import validator from 'validator'
import { z } from 'zod'

export const JOB_STATUS = [
  { label: 'Healthcare Practitioner', value: 'practitioner' },
  { label: 'Student', value: 'student' },
] as const

export const SECTORS = [
  { label: 'Private', value: 'private' },
  { label: 'Public', value: 'public' },
  { label: 'Other', value: 'other' },
] as const

export const CONTACT_METHODS = [
  { label: 'By Email', value: 'email' },
  { label: 'By Phone', value: 'phone' },
  { label: 'Other', value: 'other' },
] as const

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
  { label: 'Other', value: 'other' },
] as const

export const PATIENT_OPTIONS = [
  { label: 'Yes, I am accepting new patients', value: 'yes' },
  { label: 'No, I am not taking new patients', value: 'no' },
  { label: 'Yes - but only for a definite period', value: 'yes_temporary' },
  { label: 'Not right now - but in the future', value: 'no_later' },
  { label: 'Yes - but in private only', value: 'yes_private' },
] as const

export const ORDERS = [
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
] as const

export const RegistryFormSchema = z.object({
  // Personal info — required
  firstName: z.string().min(1, { message: 'Please enter your first name.' }),
  lastName: z.string().min(1, { message: 'Please enter your last name.' }),
  languages: z.array(z.string()).min(1, { message: 'Please select at least one language.' }),

  // Contact info — optional, but at least one contact method should be provided
  email: z.string().email().optional(),
  primaryPhoneNumber: z
    .string()
    .refine((val) => !val || validator.isMobilePhone(val), {
      message: 'Please provide a valid phone number.',
    })
    .optional(),
  preferredContactMethod: z.enum(['email', 'phone', 'website', 'other']).optional(),

  // Practice info — fully optional group
  practiceInfo: z.object({
    name: z.string().optional(),
    address: z.string().optional(),
    email: z.string().email({ message: 'Please provide a valid practice email.' }).optional().or(z.literal('')),
    phone: z
      .string()
      .refine((val) => !val || validator.isMobilePhone(val), {
        message: 'Please provide a valid phone number.',
      })
      .optional(),
    website: z
    .string()
    .refine((val) => !val || validator.isURL(val), {
      message: 'Please provide a valid URL.',
    })
    .optional(),
  }).optional(),

  // Professional info — required
  jobStatus: z.enum(['practitioner', 'student'], {
    message: 'Please select your job status.',
  }),
  profession: z.enum([
    'acupuncturist', 'art_therapist', 'audiologist', 'chiropractor', 'dentist',
    'dietitian', 'denturologist', 'occupational_therapist', 'nurse', 'kinesiologist',
    'massage_therapist', 'physician', 'optometrist', 'osteopath', 'pharmacist',
    'podiatrist', 'physiotherapist', 'psychologist', 'psychotherapist', 'social_worker',
    'speech_language_pathologist', 'other',
  ], { message: 'Please select a profession.' }),
  specialty: z.string().optional(),
  professionalOrder: z.enum([
    'ooaq', 'ocq', 'oeq', 'ondq', 'psychologues', 'opiq', 'oppq',
    'podiatres', 'oiiq', 'pharmaciens', 'dentistes', 'none', 'other',
  ]).default('none'),
  graduationDate: z.string().optional(),
  sector: z.enum(['public', 'private', 'other']).default('private'),
  isAcceptingPatients: z.enum(['yes', 'no', 'yes_temporary', 'no_later', 'yes_private'], {
    message: 'Please indicate if you are accepting new patients.',
  }),
  newPatientAcceptanceDate: z.string().optional(),
  licenseNumber: z.string().min(1, { message: 'Please enter your license number.' }),

  // Consent
  consentToWebsite: z.literal<boolean>(true, {
    message: 'You must consent to being listed on the YAHPA website.',
  }),
  consentToReferrals: z.boolean().optional(),
}).refine(
  (data) =>  data.practiceInfo?.website || data.practiceInfo?.email || data.practiceInfo?.phone,
  {
    message: 'Please provide at least one way for patients to contact you.',
    path: ['practiceInfo'],
  }
)

export type RegistryFormValues = z.infer<typeof RegistryFormSchema>