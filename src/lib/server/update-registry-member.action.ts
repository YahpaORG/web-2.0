'use server'
import { EditRegistryFormSchema, EditRegistryFormValues } from '@/lib/validation/edit-registry-form.schema'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { getPayload } from 'payload'

export const updateRegistryMember = async (
  id: string,
  data: EditRegistryFormValues,
): Promise<{ errors?: Record<string, { message: string }> }> => {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    return { errors: { api: { message: 'You must be logged in.' } } }
  }

  const result = EditRegistryFormSchema.safeParse(data)
  if (!result.success) {
    const errors: Record<string, { message: string }> = {}
    for (const { path, message } of result.error.issues) {
      errors[path.join('.')] = { message }
    }
    return { errors }
  }

  try {
    await payload.update({
      collection: 'registry-members',
      id,
      overrideAccess: true,
      data: result.data,
    })
  } catch (e) {
    return { errors: { api: { message: e instanceof Error ? e.message : 'Something went wrong.' } } }
  }

  return {}
}