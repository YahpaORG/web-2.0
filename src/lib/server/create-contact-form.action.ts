'use server'

import { ActionState } from '@/types/action-state'
import configPromise from '@payload-config'
import { APIError, getPayload } from 'payload'
import { ContactFormSchema, ContactFormValues } from '../validation/contact-form.schema'

export const createContactForm = async (
  initialState: ActionState<ContactFormValues>,
  formData: FormData,
): Promise<ActionState<ContactFormValues>> => {
  const payload = await getPayload({
    config: configPromise,
  })

  // 1. Parse incoming form data
  const values = {
    name: String(formData.get('name')),
    email: String(formData.get('email')),
    reason: String(formData.get('reason')),
    message: String(formData.get('message')),
  }

  // 2. Validate parsed data and check for field errors
  const { error: parseError } = ContactFormSchema.safeParse(values)
  const errors: ActionState<ContactFormValues>['errors'] = {}
  for (const { path, message } of parseError?.issues || []) {
    errors[path.join('.')] = { message }
  }

  if (Object.keys(errors).length) {
    return {
      values: { ...initialState.values, ...values },
      errors,
    }
  }

  // 3. If no errors then create contact form from validated data
  try {
    await payload.create({ collection: 'contact-forms', data: { ...values } })
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

  // 4. Reset the form on return and send a success message to display
  return {
    values: {
      email: '',
      message: '',
      name: '',
      reason: '',
    },
    // TODO: create a message property for ActionState?
    errors: {
      complete: {
        message: 'Your message to YAHPA has been sent successfully.',
      },
    },
  }
}
