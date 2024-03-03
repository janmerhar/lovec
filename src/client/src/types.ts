export type APIResponse<T = any> = {
  status: number
  data: T
  message: string
}

// Tebe verjetno sploh ne rabim,
// saj me ne briga vsebina JWT-ja,
// to je posel serverja.
export type JWTPayload = {
  uporabnikId: string
  role: string
}

export type JWTTokenPair = {
  accessToken: string
  refreshToken: string
}

export type UporabnikLogin = {
  id: string
  ime: string
  priimek: string
  slika: string
  role: string

  token: string
  refresh_token: string
}
