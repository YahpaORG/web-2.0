import type { Access } from 'payload'

export const admins: Access = async ({ req: { user, payload } }) => {
  if (user) {
    const admin = await payload.findByID({
      collection: 'admins',
      id: user.id,
    })

    return Boolean(admin)
  }

  return false
}
