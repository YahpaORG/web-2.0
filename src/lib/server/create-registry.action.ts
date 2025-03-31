'use server'

import { RegistryFormSchema, RegistryFormValues } from '@/lib/validation/registry-form.schema'
import { ActionState } from '@/types/action-state'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { APIError, getPayload } from 'payload'

export const createRegistry = async (
  initialState: ActionState<RegistryFormValues>,
  formData: FormData,
): Promise<ActionState<RegistryFormValues>> => {
  const payload = await getPayload({
    config: configPromise,
  })

  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  // 1. Parse incoming form data
  const values = {
    first_name: String(formData.get('first_name')),
    last_name: String(formData.get('last_name')),
    primary_phone_number: String(formData.get('primary_phone_number')),
    preferred_contact_method: String(formData.get('preferred_contact_method')) as 'email' | 'phone',
    languages: formData.getAll('languages') as string[],
    status: formData.get('status') as RegistryFormValues['status'],
    profession: String(formData.get('profession')),
  }

  // 2. Validate parsed data and check for field errors
  const { error: parseError } = RegistryFormSchema.safeParse(values)
  const errors: ActionState<RegistryFormValues>['errors'] = {}
  for (const { path, message } of parseError?.issues || []) {
    errors[path.join('.')] = { message }
  }

  if (Object.keys(errors).length) {
    return {
      values: { ...initialState.values, ...values },
      errors,
    }
  }

  // 3. If no errors then create registry Form from validated data
  try {
    await payload.create({
      collection: 'registry-forms',
      data: {
        submittedBy: user?.id,
        ...values,
        profession: {
          relationTo: 'professions',
          value: values.profession,
        },
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

  redirect('/account')
}
