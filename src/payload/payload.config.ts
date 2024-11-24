// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { ContactForms } from './collections/ContactForms'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { Admins } from './collections/Admins'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  admin: {
    user: Admins.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      title: 'YAHPA',
    },
    components: {
      graphics: {
        Logo: {
          path: 'src/payload/ui/logo',
        },
        Icon: {
          path: 'src/payload/ui/icon',
        },
      },
    },
  },
  email: resendAdapter({
    defaultFromAddress: 'website@yahpa.org',
    defaultFromName: 'YAHPA - Web (testing)',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  collections: [Users, Media, ContactForms, Admins],
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
