'use server'
import { RegistryFormSchema, RegistryFormValues } from '@/lib/validation/registry-form.schema'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { APIError, getPayload } from 'payload'

export const createRegistryForm = async (
  data: RegistryFormValues,
): Promise<{ errors?: Record<string, { message: string }> }> => {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    return { errors: { api: { message: 'You must be logged in to submit the registry form.' } } }
  }

  const result = RegistryFormSchema.safeParse(data)
  if (!result.success) {
    const errors: Record<string, { message: string }> = {}
    for (const { path, message } of result.error.issues) {
      errors[path.join('.')] = { message }
    }
    return { errors }
  }

  try {
    await payload.create({
      collection: 'registry-forms',
      data: {
        ...result.data,
        submittedBy: user.id,
      },
    })
  } catch (e) {
    if (e instanceof APIError) {
      return { errors: { api: { message: e.message } } }
    }
    throw e
  }

  redirect('/account')
}