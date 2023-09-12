export type APIResponse<T> = {
  status: number
  data: T
  message: string
}

export type JWTPayload = {
  uporabnikId: string
  role: string
}
