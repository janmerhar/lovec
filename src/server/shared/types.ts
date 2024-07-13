import mongoose from "mongoose"

/* Common */
export interface IIsDeleted {
  isDeleted: boolean
}

/* Uporabnik */

export const uporabnikRoles = ["pripravnik", "lovec", "admin"]

export interface IUporabnikDetails<I = mongoose.Types.ObjectId> {
  _id: I
  ime: string
  priimek: string
  slika: string
  role: (typeof uporabnikRoles)[number]
}

export interface IUporabnik<
  I = mongoose.Types.ObjectId,
  M = mongoose.Types.ObjectId,
  P = mongoose.Types.ObjectId,
  D = mongoose.Types.ObjectId
> extends IUporabnikDetails<I>,
    IIsDeleted {
  // Osebni podatki
  rojstniDatum: Date | string | null
  email: string
  hash: string
  // PRIPRAVNIK ONLY: Tip uporabnik, ki je lovec
  mentor: M | null
  // MENTOR ONLY: Seznam pripravnikov, ki jih mentorira
  pripravniki: P[] | null
  // Clanstvo v neki lovski druzini
  druzina: D | null
  // Polje za osvezevanje JWT tokenov
  refresh_token: string[]
}

/* Druzina */

export interface IDruzinaDetails<I = mongoose.Types.ObjectId> {
  _id: I
  ime: string
  revirjiCount?: number
  claniCount?: number
}

export interface IDruzina<
  I = mongoose.Types.ObjectId,
  R = mongoose.Types.ObjectId,
  C = mongoose.Types.ObjectId
> extends IDruzinaDetails<I> {
  revirji: R[]
  clani: C[]
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

export interface IVplenDetails {
  datum: Date | string
  zivali: (typeof zivalDomain)[number][]
}

export interface IVplen<
  I = mongoose.Types.ObjectId,
  U = mongoose.Types.ObjectId
> {
  _id: I
  uporabnik: U
  koordinate: [number, number]
  zival: (typeof zivalDomain)[number]
  teza: number
  datum: Date | string
  bolezni: (typeof bolezenDomain)[number][]
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

export interface IDnevnik<
  I = mongoose.Types.ObjectId,
  P = mongoose.Types.ObjectId,
  M = mongoose.Types.ObjectId
> {
  _id: I
  pripravnik: P
  mentor: M
  status: (typeof statusDomain)[number]
  datum: Date | string
  ure: number
  opis: string
  delo: (typeof deloDomain)[number]
}

/* Opazovalnica */

export interface IOpazovalnica<I = mongoose.Types.ObjectId> extends IIsDeleted {
  _id: I
  ime: string
  kapaciteta: number
  prespanje: boolean
  koordinate: [number, number]
}

/* Obisk */
export interface IObisk<
  I = mongoose.Types.ObjectId,
  O = mongoose.Types.ObjectId,
  U = mongoose.Types.ObjectId
> {
  _id: I
  opazovalnica: O
  uporabnik: U
  zacetek: Date | string
  konec: Date | string
}

/* Oprema */

export const opremaTipDomain = ["puska", "nahrbtnik", "drugo"]

export interface IOprema<
  I = mongoose.Types.ObjectId,
  L = mongoose.Types.ObjectId
> {
  _id: I
  lastnik: L
  naziv: string
  tip: (typeof opremaTipDomain)[number]
  stanje: string
  datum: Date | string
}

/* Revir */

export interface IRevirDetails<I = mongoose.Types.ObjectId> {
  _id: I
  ime: string
  koordinate: number[][]
}

export interface IRevir<
  I = mongoose.Types.ObjectId,
  D = mongoose.Types.ObjectId
> {
  _id: I
  ime: string
  koordinate: number[][]
  druzina: D
}

/* Jaga */

export interface IJaga<
  I = mongoose.Types.ObjectId,
  O = mongoose.Types.ObjectId,
  U = mongoose.Types.ObjectId
> {
  _id: I
  organizator: O
  naziv: string
  opis: string
  maxUdelezeni: number
  udelezeni: U[]
  lokacija: [[number]]
  zacetek: Date | string
}

/* Sistemske spremenljivke */

export interface ISistemskeSpremenljivke<I = mongoose.Types.ObjectId> {
  _id: I
  datum: Date | string
  PAGE_SIZE: number
  JAGA_MAX_MEMBERS: number
  OBISK_MAX_LENGTH: number
  USER_OBISKS_MAX_LENGTH: number
}

/* JWT */
export type JWTDecoded = {
  uporabnikId: string
  role: string
  iat: number
  exp: number
}

export type JWTPayload = {
  uporabnikId: string
  role: string
}

export type JWTTokenPair = {
  accessToken: string
  refreshToken: string
}
