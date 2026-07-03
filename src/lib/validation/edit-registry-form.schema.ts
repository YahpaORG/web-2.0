import validator from 'validator'
import { z } from 'zod'

const optionalString = z.string().transform((val) => val === '' ? undefined : val).optional()

export const EditRegistryFormSchema = z.object({
  firstName: z.string().min(1, { message: 'Please enter your first name.' }),
  lastName: z.string().min(1, { message: 'Please enter your last name.' }),
  languages: z.array(z.string()).min(1, { message: 'Please select at least one language.' }),
  email: optionalString,
  primaryPhoneNumber: z
    .string()
    .refine((val) => !val || validator.isMobilePhone(val), {
      message: 'Please provide a valid phone number.',
    })
    .optional(),
  practiceInfo: z.object({
    name: optionalString,
    address: optionalString,
    email: z.string().email().optional().or(z.literal('')),
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
  profession: z.enum([
    'acupuncturist', 'art_therapist', 'audiologist', 'chiropractor', 'dentist',
    'dietitian', 'denturologist', 'occupational_therapist', 'nurse', 'kinesiologist',
    'massage_therapist', 'physician', 'optometrist', 'osteopath', 'pharmacist',
    'podiatrist', 'physiotherapist', 'psychologist', 'psychotherapist', 'social_worker',
    'speech_language_pathologist', 'other',
  ], { message: 'Please select a profession.' }),
  specialty: optionalString,
  professionalOrder: z.enum([
    'ooaq', 'ocq', 'oeq', 'ondq', 'psychologues', 'opiq', 'oppq',
    'podiatres', 'oiiq', 'pharmaciens', 'dentistes', 'none', 'other',
  ]).default('none'),
  isAcceptingPatients: z.enum(['yes', 'no', 'yes_temporary', 'no_later', 'yes_private'], {
    message: 'Please indicate if you are accepting new patients.',
  }),
  newPatientAcceptanceDate: optionalString,
  sector: z.enum(['public', 'private', 'other']).default('private'),
})

export type EditRegistryFormValues = z.infer<typeof EditRegistryFormSchema>