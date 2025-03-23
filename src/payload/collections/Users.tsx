import { anyone } from '@/payload//access/anyone'
import AccountConfirmation from '@/payload/emails/AccountConfirmationEmail'
import { render } from '@react-email/render'
import { APIError, type CollectionBeforeOperationHook, type CollectionConfig } from 'payload'
import { isSelfOrAdmin } from '../access/isSelfOrAdmin'

const checkExistingEmail: CollectionBeforeOperationHook = async ({ args, operation, req }) => {
  if (operation === 'create') {
    const emailExists = await req.payload.find({
      collection: 'users',
      where: {
        email: {
          equals: req.data?.email,
        },
      },
    })

    if (emailExists) {
      throw new APIError('This email already exists', 409, undefined, true)
    }
  }

  return args
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
    beforeOperation: [checkExistingEmail],
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
