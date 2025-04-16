import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { type NextRequest } from 'next/server'
import { redirect } from 'next/navigation'

export const GET = async (request: NextRequest) => {
  const payload = await getPayload({
    config: configPromise,
  })

  const token = request.nextUrl.searchParams.get('token')
  if (!token) {
    redirect('/?error="notoken"')
  }

  try {
    await payload.verifyEmail({
      collection: 'users', // required
      token: token, // the token saved on the user as `_verificationToken`
    })
    return Response.redirect(`${process.env.NEXT_PUBLIC_CMS_URL}/login`) // redirect doesnt work in try catch block
  } catch (e) {
    redirect('/?error="notoken"')
  }
}
