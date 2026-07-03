'use server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const getRegistryFilters = async () => {
  const payload = await getPayload({ config: configPromise })

  const db = (payload.db as any)
  
  const professions: string[] = await db.collections['registry-members'].distinct('profession')
  const languageIds: string[] = await db.collections['registry-members'].distinct('languages')

  return { professions, languageIds }
}