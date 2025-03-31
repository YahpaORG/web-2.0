import { z } from 'zod'

export const SignUpFormSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'You need to provide a valid email to create your account.' })
      .email('This is not a valid email.'),
    password: z
      .string()
      .min(8, { message: 'You need to provide a strong password to create your account.' }),
    confirm_password: z.string().min(8, { message: 'This field must match your password.' }),
    agreeToTerms: z
      .literal<boolean>(true, {
        message: 'You must agree to the general terms and conditions',
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Your passwords don't match",
    path: ['confirm_password'],
  })

export type SignUpFormValues = z.infer<typeof SignUpFormSchema>
