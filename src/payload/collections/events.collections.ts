import { CollectionConfig } from 'payload'
import { adminsOnly } from "../access/adminsOnly"


// 1. config
export const events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'location']

  },
  fields: [
    {
        name: 'title',
        type: 'text',
        required: true,
    },
    {
        name: 'date',
        type: 'date',
        required: true,
    },
    {
        name: 'location',
        type: 'text',
        required: true,
    },
    {   name: 'description',
        type: 'textarea',
        required: true,
    }
  ]
}

