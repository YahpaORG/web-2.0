'use server'

import { LoginFormSchema } from '@/lib/formSchemas'
import configPromise from '@payload-config'
import { revalidatePath, revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { APIError, getPayload } from 'payload'

export type FormState = {
  message: string
  data?: Record<string, string>
  errors?: string[]
  success?: boolean
}

export const signin = async (prevState: FormState, data: FormData): Promise<FormState> => {
  const payload = await getPayload({
    config: configPromise,
  })

  // 1. Parse incoming form data
  const formData = Object.fromEntries(data)
  const parsed = LoginFormSchema.safeParse(formData)

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

  // 3. Login user from validated data
  try {
    const result = await payload.login({ collection: 'users', data: { ...parsed.data } })

    if (result.token) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      })

      return { ...prevState, message: 'Login successful!', success: true }
    }
    return { ...prevState, message: 'Something went wrong.', success: false }
  } catch (e) {
    const error = e as APIError
    return { ...prevState, message: error.message, success: false }
  }
}
