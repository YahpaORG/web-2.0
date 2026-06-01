import { CollectionConfig } from 'payload'
import { adminsOnly } from "../access/adminsOnly"

export const events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: []
  }
}
