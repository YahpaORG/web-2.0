import { anyone } from '@/payload//access/anyone'
import AccountConfirmation from '@/payload/emails/AccountConfirmationEmail'
import { render } from '@react-email/render'
import { APIError, type CollectionConfig } from 'payload'
import { isSelfOrAdmin } from '../access/isSelfOrAdmin'

import type { CollectionBeforeValidateHook } from 'payload'

const checkExistingEmail: CollectionBeforeValidateHook = async ({ data, operation, req }) => {
  if (operation === 'create') {
    const result = await req.payload.find({
      collection: 'users',
      where: {
        email: {
          equals: data?.email,
        },
      },
    })

    if (result.totalDocs > 0) {
      throw new APIError(
        'An account with this email already exists. Please enter another email.',
        409,
        undefined,
        true,
      )
    }
  }

  return data
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    verify: {
      generateEmailHTML: async ({ req, token, user }) => {
        // Use the token provided to allow your user to verify their account
        const url = `${process.env.NEXT_PUBLIC_CMS_URL}/verify?token=${token}`
        const html = await render(<AccountConfirmation validationUrl={url} />)
        return html
      },
    },
  },
  access: {
    read: isSelfOrAdmin,
    create: anyone,
    update: isSelfOrAdmin,
    delete: isSelfOrAdmin,
  },
  hooks: {
    beforeValidate: [checkExistingEmail],
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      unique: true,
      required: true,
    },
    {
      name: 'primary_phone_number',
      label: 'Primary Phone Number',
      type: 'text',
    },
    {
      name: 'preferred_contact_method',
      label: 'Preferred Contact Method',
      type: 'radio',
      options: [
        { label: 'By email', value: 'email' },
        { label: 'By phone', value: 'phone' },
      ],
      defaultValue: 'email',
    },
    {
      name: 'relatedRegistry',
      type: 'join',
      collection: 'registry-members',
      on: 'relatedUser',
    },
  ],
}
