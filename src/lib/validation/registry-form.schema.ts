import { z } from 'zod'
import validator from 'validator'

export const JOB_STATUS = ['student', 'employed', 'unemployed'] as const

export const SECTORS = [
  { label: 'Private', value: 'private' },
  { label: 'Public', value: 'public' },
] as const
export const CONTACT_METHODS = ['email', 'phone'] as const

export const RegistryFormSchema = z.object({
  first_name: z.string().min(1, { message: 'Please enter your first name.' }),
  last_name: z.string().min(1, { message: 'Please enter your last name.' }),
  primary_phone_number: z
    .string({ required_error: 'Your phone number is required.' })
    .refine(validator.isMobilePhone, { message: 'Please provide a valid phone number.' }),
  preferred_contact_method: z.enum(CONTACT_METHODS),
  // secondary_phone_number: z.string(),
  languages: z.array(z.string()).min(1, {
    message: 'You have to select at least one language.',
  }),
  // other_languages: z.string().optional(),

  // Professional info
  status: z.enum(JOB_STATUS, { message: 'Please choose your current employement status.' }),
  //   status: z.array(z.string()).refine((value) => value.some((item) => item), {
  //     message: 'You have to select at least one item.',
  //   }),
  estimated_graduation_date: z.date().optional(),
  profession: z.string({ required_error: 'Please choose a profession.' }),
  // other_profession: z.string().optional(),
  // sectors: z.array(z.string()).refine((value) => value.some((item) => item), {
  //   message: 'You have to select at least one item.',
  // }),
})

export type RegistryFormValues = z.infer<typeof RegistryFormSchema>
