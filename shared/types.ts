import { ObjectId } from "mongoose"

/* Uporabnik */

export const uporabnikRoles = ["pripravnik", "lovec", "admin"]

export interface IUporabnikDetails<I = ObjectId> {
  _id: I
  ime: string
  priimek: string
  slika: string
  role: (typeof uporabnikRoles)[number]
}

export interface IUporabnik<
  I = ObjectId,
  M = ObjectId,
  P = ObjectId,
  D = ObjectId
> extends IUporabnikDetails<I> {
  // Osebni podatki
  rojstniDatum: Date | null
  email: string
  hash: string
  // PRIPRAVNIK ONLY: Tip uporabnik, ki je lovec
  mentor: M | null
  // MENTOR ONLY: Seznam pripravnikov, ki jih mentorira
  pripravniki: P[] | null
  // Clanstvo v neki lovski druzini
  druzina: D | null
  // Polje za osvezevanje JWT tokenov
  refresh_token: string
}

/* Druzina */

export interface IDruzinaDetails<I = ObjectId> {
  _id: I
  ime: string
}

export interface IDruzina<I = ObjectId, R = ObjectId, C = ObjectId>
  extends IDruzinaDetails<I> {
  revirji: R[]
  clani: C[]
}

/* Vplen */

export interface IVplenDetails {
  datum: Date
  zivali: string[]
}

export interface IVplen<I = ObjectId, U = ObjectId> {
  _id: I
  uporabnik: U
  koordinate: [number, number]
  zival: string
  teza: number
  datum: Date
  bolezni?: string[]
}

/* Dnevnik */

export interface IDnevnik<I = ObjectId, P = ObjectId, M = ObjectId> {
  _id: I
  pripravnik: P
  mentor: M
  status: string
  datum: Date
  ure: number
  opis: string
  delo: string
}

/* Opazovalnica */

export interface IOpazovalnica<I = ObjectId, U = ObjectId> {
  _id: I
  koordinate: [number, number]
  obiski: [
    {
      uporabnik: U
      zacetek: Date
      konec: Date
    }
  ]
}

/* Oprema */

export interface IOprema<I = ObjectId, L = ObjectId> {
  _id: I
  lastnik: L
  naziv: string
  tip: string
  stanje: string
  datum: Date
}

/* Revir */

export interface IRevir<I = ObjectId, D = ObjectId> {
  _id: I
  ime: string
  koordinate: number[][]
  druzina: D
}

/* Jaga */

export interface IJaga<I = ObjectId, O = ObjectId, U = ObjectId> {
  _id: I
  organizator: O
  maxUdelezeni: number
  udelezeni: U
  lokacija: [[number]]
  zacetek: Date
}

/* Sistemske spremenljivke */

export interface ISistemskeSpremenljivke<I = ObjectId> {
  _id: I
  datum: Date
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
