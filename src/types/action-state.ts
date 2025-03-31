// Used for server action state for form data validation
export type ActionState<T> = {
  errors: Record<string, { message: string }>
  values: T
}
