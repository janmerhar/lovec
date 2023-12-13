import UporabnikModel from "@models/uporabnikModel"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Request } from "express"
import { DruzinaDetails } from "./Druzina"
import type { IDruzinaDetails, IUporabnikDetails } from "@shared/types"

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

export class UserProfile {}

// manjka
// mentordetails
// pripravnikdetails
// admin details
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
      result.refresh_token
    )
  }

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

  static async JWTverify(req: Request) {
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

  static async JWTpayload(req: Request) {
    try {
      if (!req.headers.authorization) {
        throw new Error("Napaka pri preverjanju JWT")
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
      throw new Error("Napaka pri preverjanju JWT")
    }
  }

  static async JWTrefresh(req: Request) {}
}
