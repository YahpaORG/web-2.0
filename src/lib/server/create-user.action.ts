'use server'

import { SignUpFormSchema, SignUpFormValues } from '@/lib/validation/signup-form.schema'
import { ActionState } from '@/types/action-state'
import configPromise from '@payload-config'
import { redirect } from 'next/navigation'
import { APIError, getPayload } from 'payload'

export const createUser = async (
  initialState: ActionState<SignUpFormValues>,
  formData: FormData,
): Promise<ActionState<SignUpFormValues>> => {
  const payload = await getPayload({
    config: configPromise,
  })

  // 1. Parse incoming form data
  const values = {
    first_name: String(formData.get('first_name')),
    last_name: String(formData.get('last_name')),
    email: String(formData.get('email')),
    password: String(formData.get('password')),
    confirm_password: String(formData.get('confirm_password')),
  }

  // 2. Validate parsed data and check for field errors
  const { error: parseError } = SignUpFormSchema.safeParse(values)
  const errors: ActionState<SignUpFormValues>['errors'] = {}
  for (const { path, message } of parseError?.issues || []) {
    errors[path.join('.')] = { message }
  }

  if (Object.keys(errors).length) {
    return {
      values: { ...initialState.values, ...values },
      errors,
    }
  }

  // 3. If no errors then signup the user and redirect
  try {
    await payload.create({
      collection: 'users',
      data: {
        email: values.email,
        password: values.password,
      },
    })
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

  redirect('/signup/confirm')
}
