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
  koordinate: number[][][]
  druzina: D
}
