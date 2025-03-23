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
import { startTransition, useActionState, useEffect, useRef } from 'react'
import { createNewUser } from '@/app/(frontend)/signup/actions'
import { SignUpFormSchema } from '@/lib/formSchemas'
import { useRouter } from 'next/navigation'

type FormValues = z.infer<typeof SignUpFormSchema>

const INITIAL_STATE = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
  agreeToTerms: false,
}

export function SignUpForm() {
  const router = useRouter()
  const [state, formAction] = useActionState(createNewUser, {
    message: '',
    data: INITIAL_STATE,
  })
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: INITIAL_STATE,
  })

  useEffect(() => {
    if (state.success && form.formState.isSubmitSuccessful) {
      router.refresh()
      router.replace('/signup/confirm')
      toast({
        title: state.message,
        description: new Date().toUTCString(),
      })
    }
  }, [state])

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
          <h3 className="text-2xl">Sign Up with YAHPA</h3>
          <p>Please fill out the form below to create your account with YAHPA.</p>
        </div>

        {state.message && !state.success && (
          <div>
            <p className="text-sm text-red-500">{state.message}</p>
          </div>
        )}

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
