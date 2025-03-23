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
import { startTransition, useActionState, useEffect, useRef } from 'react'
import { signin } from '@/app/(frontend)/login/actions'
import { LoginFormSchema } from '@/lib/formSchemas'

type FormValues = z.infer<typeof LoginFormSchema>

export function LoginForm() {
  const router = useRouter()
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useActionState(signin, {
    message: '',
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (state.success) {
      toast({ title: state.message })
      router.push('/account')
      router.refresh()
    }
  }, [state.success])

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={(evt) => {
          evt.preventDefault()
          form.handleSubmit(() => {
            startTransition(() => formAction(new FormData(formRef.current!)))
          })(evt)
        }}
        className="space-y-6"
      >
        <div className="max-w-md">
          <h3 className="text-2xl">Connect to your Account</h3>
          <p>Please enter your email and password to login to your YAHPA account.</p>
        </div>

        {state.message && (
          <div>
            <p className="text-sm text-red-500">{state.message}</p>
          </div>
        )}

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
