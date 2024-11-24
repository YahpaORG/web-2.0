import type { CollectionConfig } from 'payload'
import { anyone } from '@/payload//access/anyone'
import { isSelfOrAdmin } from '../access/isSelfOrAdmin'
import { render } from '@react-email/render'
import AccountConfirmation from '@/payload/emails/AccountConfirmation'

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
    // Email added by default
    // Add more fields as needed
  ],
}
