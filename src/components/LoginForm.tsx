'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/providers/AuthProvider'
import { AuthenticationError } from 'payload'

type FormValues = z.infer<typeof formSchema>

const formSchema = z.object({
  email: z
    .string({
      required_error: 'You need to enter your email.',
    })
    .email('This is not a valid email.'),
  password: z
    .string({
      required_error: 'You need to enter your password.',
    })
    .min(8),
})

export function LoginForm() {
  const { login } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: FormValues) {
    try {
      const user = await login({
        email: values.email,
        password: values.password,
      })

      if (user) {
        toast({
          title: 'You are now connected.',
          description: new Date().toUTCString(),
        })
        form.reset()
        router.push('/account')
      }
    } catch (e) {
      // TODO: use server side validation with server actions to send back error messages
      const error = e as AuthenticationError
      form.setError('root', { message: error.message })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="max-w-md">
          <h3 className="text-2xl">Connect to your Account</h3>
          <p>Please enter your email and password to login to your YAHPA account.</p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
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
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <FormMessage>{form.formState.errors.root.message}</FormMessage>
        )}
        <div className="flex flex-col gap-2">
          <p className="text-sm">
            Don&apos;t have one?{' '}
            <Link href="/signup" className="underline">
              Create an account
            </Link>
          </p>
          <div>
            <Button type="submit">Log In</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
