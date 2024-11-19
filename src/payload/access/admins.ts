import type { Access } from 'payload'

export const admins: Access = async ({ req }) => {
  if (req.user && req.user?.collection === 'admins') return true

  return false
}
