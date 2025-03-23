'use server'

import { SignUpFormSchema } from '@/lib/formSchemas'
import configPromise from '@payload-config'
import { APIError, getPayload } from 'payload'

type FormState = {
  message: string
  data?: Record<string, any>
  errors?: string[]
  success?: boolean
}

export const createNewUser = async (prevState: FormState, data: FormData): Promise<FormState> => {
  const payload = await getPayload({
    config: configPromise,
  })

  // 1. Parse incoming form data
  const formData = Object.fromEntries(data)
  const parsed = SignUpFormSchema.safeParse(formData)

  console.log('form data', formData)

  // 2. Validate parsed data
  if (!parsed.success) {
    const fields: Record<string, string> = {}
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString()
    }

    return {
      ...prevState,
      message: 'Invalid form data',
      data: fields,
      errors: parsed.error.issues.map((issue) => issue.message),
      success: false,
    }
  }

  // 3. Create a new user from validated data

  console.log('parsed data', parsed.data)
  try {
    await payload.create({ collection: 'users', data: { ...parsed.data } })
    return { ...prevState, message: 'Login successful!', success: true }
  } catch (e) {
    const error = e as APIError
    return { ...prevState, message: error.message, success: false }
  }
}
