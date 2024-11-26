'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/providers/AuthProvider'

type FormValues = z.infer<typeof formSchema>

const formSchema = z
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
    agreeToTerms: z.literal<boolean>(true, {
      message: 'You must agree to the general terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Your passwords don't match",
    path: ['confirm_password'],
  })

export function SignUpForm() {
  const { signup } = useAuth()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
      first_name: '',
      last_name: '',
      agreeToTerms: false,
    },
  })

  async function onSubmit(values: FormValues) {
    await signup({
      email: values.email,
      password: values.password,
      firstName: values.first_name,
      lastName: values.last_name,
    }).then(() => {
      toast({
        title: 'Your account as been created!',
        description: new Date().toUTCString(),
      })
      form.reset()
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="max-w-md">
          <h3 className="text-2xl">Sign Up with YAHPA</h3>
          <p>Please fill out the form below to create your account with YAHPA.</p>
        </div>
        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Jimmy" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Choo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormDescription>
                This is the email that will be used to connect to your account.
              </FormDescription>
              <FormControl>
                <Input type="text" placeholder="example@yahpa.org" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="not12345678" {...field} />
              </FormControl>
              <FormDescription>Your password should have at least 8 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="not12345678" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agreeToTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I accept the{' '}
                  <Link
                    href="/terms-and-conditions"
                    style={{ textDecoration: 'underline' }}
                    target="_blank"
                  >
                    general terms and conditions
                  </Link>
                </FormLabel>
                <FormDescription>
                  Please read the terms and conditions to better understand our platform and its
                  intended use.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <p className="text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Log in
            </Link>
          </p>
          <div>
            <Button type="submit" disabled={!form.formState.isDirty}>
              Create Account
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
