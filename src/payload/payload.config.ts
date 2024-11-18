// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { resendAdapter } from '@payloadcms/email-resend'
import { Members } from './collections/Members'
import { Media } from './collections/Media'
import { Admins } from './collections/Admins'
import { ContactForms } from './collections/ContactForms'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Admins.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  email: resendAdapter({
    defaultFromAddress: 'website@yahpa.org',
    defaultFromName: 'YAHPA - Web (testing)',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  collections: [Members, Media, Admins, ContactForms],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, './payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
