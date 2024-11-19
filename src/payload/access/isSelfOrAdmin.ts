import type { Access } from 'payload'

export const isSelfOrAdmin: Access = async ({ req }) => {
  if (req.user && req.user?.collection === 'admins') return true

  if (req.user) {
    return {
      id: {
        equals: req.user.id,
      },
    }
  }

  return false
}
