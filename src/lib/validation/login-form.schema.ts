import { z } from 'zod'

export const LoginFormSchema = z.object({
  email: z.string({ message: 'Please enter your email.' }).email({
    message: 'This is not a valid email.',
  }),
  password: z
    .string({
      message: 'Please enter your password.',
    })
    .min(8),
})

export type LoginFormValues = z.infer<typeof LoginFormSchema>
