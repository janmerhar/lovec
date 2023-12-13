import UporabnikModel from "@models/uporabnikModel"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Request } from "express"

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

export default class Uporabnik {
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

      returnUporabnik = returnUporabnik.toObject()
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

  static async fetchUporabnik(uporabnikId: string) {
    const result = await UporabnikModel.findById(uporabnikId)
      .populate("mentor", "_id ime priimek ")
      .populate("druzina", "_id ime")
      .exec()

    // TODO
    // @ts-ignore
    result.hash = undefined

    return result
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
