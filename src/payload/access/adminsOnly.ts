import type { Access } from 'payload'

export const adminsOnly: Access = async ({ req }) => {
  if (req.user && req.user?.collection === 'admins') return true

  return false
}
