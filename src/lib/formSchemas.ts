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

export const SignUpFormSchema = z
  .object({
    first_name: z.string().min(1, { message: 'Please enter your first name.' }),
    last_name: z.string().min(1, { message: 'Please enter your last name.' }),
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
