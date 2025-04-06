import { z } from 'zod'

export const RegistrySearchFormSchema = z.object({
  query: z.string().min(0).optional(),
  currentPage: z.number().default(1),
})

export type RegistrySearchFormValues = z.infer<typeof RegistrySearchFormSchema>
