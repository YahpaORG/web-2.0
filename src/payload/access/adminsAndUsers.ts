import type { Access } from 'payload'

export const adminsAndUsers: Access = async ({ req: { user, payload } }) => {
  if (user) {
    const admin = await payload.findByID({
      collection: 'admins',
      id: user.id,
    })

    if (admin) return true

    return Boolean(user)
  }

  return false
}
