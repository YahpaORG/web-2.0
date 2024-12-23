import type { CollectionConfig } from 'payload'
import { anyone } from '@/payload//access/anyone'
import { isSelfOrAdmin } from '../access/isSelfOrAdmin'
import { render } from '@react-email/render'
import AccountConfirmation from '@/payload/emails/AccountConfirmationEmail'

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
  fields: [
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
