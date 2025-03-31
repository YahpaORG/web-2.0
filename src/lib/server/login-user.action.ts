'use server'

import { LoginFormSchema } from '@/lib/validation/login-form.schema'
import { ActionState } from '@/types/action-state'
import configPromise from '@payload-config'
import { cookies } from 'next/headers'
import { APIError, getPayload } from 'payload'
import { LoginFormValues } from '../validation/login-form.schema'
import { redirect } from 'next/navigation'

export const loginUser = async (
  initialState: ActionState<LoginFormValues>,
  formData: FormData,
): Promise<ActionState<LoginFormValues>> => {
  const payload = await getPayload({
    config: configPromise,
  })

  // 1. Parse incoming form data
  const values = {
    email: String(formData.get('email')),
    password: String(formData.get('password')),
  }

  // 2. Validate parsed data and check for field errors
  const { error: parseError } = LoginFormSchema.safeParse(values)
  const errors: ActionState<LoginFormValues>['errors'] = {}
  for (const { path, message } of parseError?.issues || []) {
    errors[path.join('.')] = { message }
  }

  if (Object.keys(errors).length) {
    return {
      values: { ...initialState.values, ...values },
      errors,
    }
  }

  // 3. If no errors then login user, set cookies and redirect
  try {
    const result = await payload.login({ collection: 'users', data: { ...values } })

    if (result.token) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      })
    }
  } catch (e) {
    const apiError = e as APIError
    return {
      values: { ...initialState.values, ...values },
      errors: {
        ...errors,
        api: {
          message: apiError.message,
        },
      },
    }
  }

  redirect('/account')
}
