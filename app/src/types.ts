export type APIResponse<T> = {
  status: number
  data: T
  message: string
}

export type JWTPayload = {
  uporabnikId: string
  role: string
}

export type UporabnikDetails = {
  id: string
  ime: string
  priimek: string
  role: string
}
