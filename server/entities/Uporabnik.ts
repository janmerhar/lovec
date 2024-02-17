import UporabnikModel from "@models/uporabnikModel"
import { DruzinaDetails } from "@entities/Druzina"
import type { IDruzinaDetails, IUporabnikDetails } from "@shared/types"

import type { Request } from "express"

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export class UporabnikDetails {
  id: string
  ime: string
  priimek: string
  slika: string
  role: string

  constructor(
    id: string,
    ime: string,
    priimek: string,
    slika: string,
    role: string
  ) {
    this.id = id
    this.ime = ime
    this.priimek = priimek
    this.slika = slika
    this.role = role
  }
}

export class UserProfile extends UporabnikDetails {
  id: string
  ime: string
  priimek: string
  slika: string
  role: string

  mentor: UporabnikDetails | null
  pripravniki: UporabnikDetails[] | null
  druzina: DruzinaDetails | null

  isDeleted: boolean

  constructor(
    id: string,
    ime: string,
    priimek: string,
    slika: string,
    role: string,
    mentor: UporabnikDetails | null,
    pripravniki: UporabnikDetails[] | null,
    druzina: DruzinaDetails | null,
    isDeleted: boolean
  ) {
    super(id, ime, priimek, slika, role)

    this.mentor = mentor
    this.pripravniki = pripravniki
    this.druzina = druzina
    this.isDeleted = isDeleted
  }
}

export class UserLogin extends UporabnikDetails {
  id: string
  ime: string
  priimek: string
  slika: string
  role: string

  token: string
  refresh_token: string

  constructor(
    id: string,
    ime: string,
    priimek: string,
    slika: string,
    role: string,
    token: string,
    refresh_token: string
  ) {
    super(id, ime, priimek, slika, role)

    this.token = token
    this.refresh_token = refresh_token
  }
}

// getUporabnik
// - iskanje uporabnika po id/email

// user profile
// - dela ne glede na to ali je uporabnik admin / pripravnik / lovec

// user login
// - jwt
// - refresh token

export default class Uporabnik<M = string, D = string> {
  id: string
  ime: string
  priimek: string
  slika: string
  rojstniDatum: string
  email: string
  hash: string
  role: string
  mentor: M | null
  pripravniki: string[]
  druzina: D | null
  isDeleted: boolean
  refresh_token: string | null

  constructor(
    id: string,
    ime: string,
    priimek: string,
    slika: string,
    rojstniDatum: string,
    email: string,
    hash: string,
    role: string,
    mentor: M | null,
    pripravniki: string[],
    druzina: D | null,
    isDeleted: boolean,
    refresh_token: string | null
  ) {
    this.id = id
    this.ime = ime
    this.priimek = priimek
    this.slika = slika
    this.rojstniDatum = rojstniDatum
    this.email = email
    this.hash = hash
    this.role = role
    this.mentor = mentor
    this.pripravniki = pripravniki
    this.druzina = druzina
    this.isDeleted = isDeleted
    this.refresh_token = refresh_token
  }

  static async login(email: string, password: string) {
    const uporabnik = await UporabnikModel.findOne({ email }).exec()

    if (uporabnik == null) {
      return null
    }

    const geslo_verify = await bcrypt.compare(password, uporabnik.hash)

    if (geslo_verify) {
      // TODO
      // @ts-ignore
      const token = await this.JWTcreate({
        uporabnikId: uporabnik._id.toString(),
        role: uporabnik.role,
      })

      let returnUporabnik = await Uporabnik.fetchUporabnik(
        uporabnik._id.toString()
      )

      if (returnUporabnik == null) {
        return null
      }

      // TODO
      // @ts-ignore
      returnUporabnik.refresh_token = undefined

      return {
        ...returnUporabnik,
        token,
      }
    }

    return null
  }

  static async register(
    ime: string,
    priimek: string,
    slika: string,
    rojstniDatum: string,
    email: string,
    geslo: string
  ) {
    const salt = await bcrypt.genSalt(10)
    const geslo_hash = await bcrypt.hash(geslo, salt)

    const uporabnik = new UporabnikModel({
      ime,
      priimek,
      slika,
      rojstniDatum,
      email,
      hash: geslo_hash,
      role: "pripravnik",
      mentor: null,
      druzina: null,
    })

    await uporabnik.save()

    // Tukaj samo vrnem true ali false
    // glede na to ali je bila registracija uspešna
    // Ce ni bila, se bo sprozila izjema, ki jo obravnavam v controllerju
    return true
  }

  static async fetchUporabnik(
    uporabnikId: string
  ): Promise<Uporabnik<UporabnikDetails, DruzinaDetails> | null> {
    const result = await UporabnikModel.findById(uporabnikId)
      .populate<{ mentor: IUporabnikDetails }>(
        "mentor",
        "_id ime priimek slika role"
      )
      .populate<{ druzina: IDruzinaDetails }>("druzina", "_id ime")
      .exec()

    if (result == null) {
      return null
    }

    return new Uporabnik<UporabnikDetails, DruzinaDetails>(
      result._id.toString(),
      result.ime,
      result.priimek,
      result.slika,
      result.rojstniDatum ? result.rojstniDatum.toISOString() : "",
      result.email,
      result.hash,
      result.role,
      result.mentor
        ? new UporabnikDetails(
            result.mentor._id.toString(),
            result.mentor.ime,
            result.mentor.priimek,
            result.mentor.slika,
            result.mentor.role
          )
        : null,
      result.pripravniki ? result.pripravniki.map((id) => id.toString()) : [],
      result.druzina
        ? new DruzinaDetails(result.druzina._id.toString(), result.druzina.ime)
        : null,
      result.isDeleted,
      result.refresh_token
    )
  }

  //
  // Druzina
  //

  static async odstraniClanstvoDruzine(uporabnikId: string): Promise<boolean> {
    const result = await UporabnikModel.updateOne(
      { _id: uporabnikId },
      { druzina: null }
    )

    return result.modifiedCount > 0
  }

  static async odstraniVseClaneDruzine(druzinaId: string): Promise<boolean> {
    const result = await UporabnikModel.updateMany(
      { druzina: druzinaId },
      { druzina: null }
    )

    return result.modifiedCount > 0
  }

  static async dodajClanstvoDruzine(
    uporabnikId: string,
    druzinaId: string
  ): Promise<boolean> {
    const result = await UporabnikModel.updateOne(
      { _id: uporabnikId },
      { druzina: druzinaId }
    )

    return result.modifiedCount > 0
  }

  //
  // JWT
  //

  static async JWTcreate(payload: string) {
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    })

    return token
  }

  static JWTverify(req: Request) {
    try {
      if (!req.headers.authorization) {
        return false
      }

      const token = req.headers.authorization.split(" ")[1]

      const payload = jwt.verify(token, process.env.JWT_SECRET as string)

      return true
    } catch (error) {
      return false
    }
  }

  static JWTpayload(req: Request) {
    try {
      if (!req.headers.authorization) {
        throw new Error("ERR_JWT_NO_TOKEN")
      }

      const token = req.headers.authorization.split(" ")[1]

      const payload = jwt.verify(token, process.env.JWT_SECRET as string)

      return {
        // TODO
        // @ts-ignore
        uporabnikId: payload.uporabnikId,
        // TODO
        // @ts-ignore
        role: payload.role,
      }
    } catch (error) {
      throw new Error("ERR_JWT_INVALID_PAYLOAD")
    }
  }

  static async JWTrefresh(req: Request) {}
}
