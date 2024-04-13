// TODO: preveri, kako in kaj s tem
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

export interface InsertUporabnik {
  ime: string
  priimek: string
  slika: File | null
  email: string
  geslo: string
  role: (typeof uporabnikRoles)[number]
  mentor?: string
  pripravniki?: string[]
  druzina?: string
}
/* Oprema */

export const opremaTipDomain = ["puska", "nahrbtnik", "drugo"]

export interface Oprema {
  id: string
  lastnik: string
  naziv: string
  tip: (typeof opremaTipDomain)[number]
  stanje: string
  datum: string
}

export interface InsertOprema {
  naziv: string
  tip: (typeof opremaTipDomain)[number]
  stanje: string
}

/* Vplen */

export const zivalDomain = [
  "srnjad",
  "divjad",
  "lisica",
  "medved",
  "volk",
  "divji prašič",
  "drugo",
]

export const bolezenDomain = ["steklina", "kuga", "drugo"]

export interface VplenDetails {
  datum: string
  zivali: string[]
  uporabnik: UporabnikDetails
}

export interface Vplen {
  id: string
  uporabnik: string
  koordinate: number[]
  zival: (typeof zivalDomain)[number]
  teza: number
  datum: string
  bolezni: (typeof bolezenDomain)[number][]
}

export interface InsertVplen {
  koordinate: number[]
  zival: (typeof zivalDomain)[number]
  teza: number
  datum: string
  bolezni: (typeof bolezenDomain)[number][]
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

/* Jaga */

export interface Jaga {
  id: string
  organizator: UporabnikDetails
  naziv: string
  opis: string
  udelezeni: UporabnikDetails[]
  maxUdelezeni: number
  lokacija: number[][]
  zacetek: string
}

export interface InsertJaga {
  organizator?: string
  naziv: string
  opis: string
  udelezeni?: string[]
  lokacija: number[]
  zacetek: string
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

export interface InsertDruzina {
  ime: string
}

/* Dnevnik */

export const statusDomain = ["potrjen", "zavrnjen", "neobdelan"]

export const deloDomain = [
  "kidanje",
  "pospravljanje",
  "krmljenje",
  "postavljanje krmišča",
  "drugo",
]

export interface Dnevnik {
  id: string
  pripravnikId: UporabnikDetails
  mentorId: UporabnikDetails
  datum: string
  delo: (typeof deloDomain)[number]
  ure: number
  opis: string
  status: (typeof statusDomain)[number]
}

export interface InsertDnevnik {
  datum: string
  ure: number
  opis: string
  delo: (typeof deloDomain)[number]
}

/* Sistemske spremenljivke */
export interface SistemskeSpremenljivke {
  id: string
  datum: Date
  PAGE_SIZE: number
  JAGA_MAX_MEMBERS: number
  OBISK_MAX_LENGTH: number
  USER_OBISKS_MAX_LENGTH: number
}

export interface InsertSistemskeSpremenljivke {
  PAGE_SIZE: number
  JAGA_MAX_MEMBERS: number
  OBISK_MAX_LENGTH: number
  USER_OBISKS_MAX_LENGTH: number
}

/* Revir */
export interface Revir {
  id: string
  ime: string
  koordinate: number[][]
  druzina: DruzinaDetails
}
