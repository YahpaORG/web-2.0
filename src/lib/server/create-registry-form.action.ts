'use server'

import { RegistryFormSchema, RegistryFormValues } from '@/lib/validation/registry-form.schema'
import { ActionState } from '@/types/action-state'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { APIError, getPayload } from 'payload'

export const createRegistryForm = async (
  initialState: ActionState<RegistryFormValues>,
  formData: FormData,
): Promise<ActionState<RegistryFormValues>> => {
  const payload = await getPayload({
    config: configPromise,
  })

  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  // 1. Parse incoming form data
  const rawValues = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: user?.email,
    primaryPhoneNumber: formData.get('primaryPhoneNumber'),
    preferredContactMethod: formData.get('preferredContactMethod'),
    languages: formData.getAll('languages'),
    specialty: formData.get('specialty'),
    profession: formData.get('profession'),
    graduationDate: formData.get('graduationDate'),
    sector: formData.get('sector'),
    isAcceptingPatients: formData.get('isAcceptingPatients'),
    professionalOrder: formData.get('professionalOrder'),
  } as RegistryFormValues

  // 2. Validate parsed data and check for field errors
  const { error: parseError, data: safeValues } = RegistryFormSchema.safeParse(rawValues)
  const errors: ActionState<RegistryFormValues>['errors'] = {}
  for (const { path, message } of parseError?.issues || []) {
    errors[path.join('.')] = { message }
  }

  if (Object.keys(errors).length || !safeValues) {
    return {
      values: { ...initialState.values, ...rawValues },
      errors,
    }
  }

  // 3. If no errors then create registry Form from validated data
  try {
    await payload.create({
      collection: 'registry-forms',
      data: {
        ...safeValues,
        submittedBy: user?.id,
      },
    })
  } catch (e) {
    const apiError = e as APIError
    return {
      values: { ...initialState.values, ...safeValues },
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
