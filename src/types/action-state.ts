import { PaginatedDocs } from 'payload'

// Used for server action state for form data validation
export type ActionState<T, ResultT = any> = {
  errors: Record<string, { message: string }>
  values: T
  results?: PaginatedDocs<ResultT>
}
