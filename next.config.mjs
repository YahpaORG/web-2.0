import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
}
const withNextInt = createNextIntlPlugin()

export default withNextInt(withPayload(nextConfig))
