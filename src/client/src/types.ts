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

/* Uporabnik */
export const uporabnikRoles = ["pripravnik", "lovec", "admin"]

export type UporabnikLogin = {
  id: string
  ime: string
  priimek: string
  slika: string
  role: string

  token: string
  refresh_token: string
}

export interface UporabnikDetails {
  id: string
  ime: string
  priimek: string
  slika: string
  role: (typeof uporabnikRoles)[number]
}

export interface UporabnikProfile extends UporabnikDetails {
  id: string
  ime: string
  priimek: string
  slika: string
  role: string

  mentor: UporabnikDetails | null
  pripravniki: UporabnikDetails[] | null
  druzina: DruzinaDetails | null

  isDeleted: boolean
}

/* Oprema */
export interface Oprema {
  id: string
  lastnik: string
  naziv: string
  tip: string
  stanje: string
  datum: string
}

export interface InsertOprema {
  naziv: string
  tip: string
  stanje: string
  datum: string
}

/* Vplen */

export interface VplenDetails {
  datum: string
  zivali: string[]
}

export interface Vplen {
  id: string
  uporabnik: string
  koordinate: number[]
  zival: string
  teza: number
  datum: string
  bolezni: string[]
}

/* Opazovalnica */

export interface Opazovalnica {
  id: string
  ime: string
  kapaciteta: number
  prespanje: boolean
  koordinate: number[]
}

export interface InsertOpazovalnica {
  ime: string
  kapaciteta: number
  prespanje: boolean
  koordinate: number[]
}

/* Obisk */

export interface Obisk {
  id: string
  opazovalnica: Opazovalnica
  uporabnik: UporabnikDetails
  zacetek: string
  konec: string
}

export interface InsertObisk {
  opazovalnica: string
  zacetek?: string
}


/* Druzina */

export interface DruzinaDetails {
  id: string
  ime: string
  revirjiCount?: number
  claniCount?: number
}

export interface Druzina<R = string, C = string> {
  id: string
  ime: string
  revirji: R[]
  clani: C[]
}
