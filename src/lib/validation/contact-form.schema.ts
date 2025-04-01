import { z } from 'zod'

export const ContactFormSchema = z.object({
  name: z.string().min(1, { message: 'Please let us know how to address you.' }).max(50),
  email: z
    .string()
    .min(1, { message: 'Your email is required to send our reply.' })
    .email('This is not a valid email.'),
  reason: z.string(),
  message: z
    .string()
    .min(1, {
      message: 'Could you tell us more about what your inquiry is about?',
    })
    .max(500),
})

export type ContactFormValues = z.infer<typeof ContactFormSchema>
