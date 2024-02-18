import UporabnikModel from "@models/uporabnikModel"
import { DruzinaDetails } from "@entities/Druzina"
import type {
  IDruzinaDetails,
  IUporabnik,
  IUporabnikDetails,
  JWTDecoded,
  JWTPayload,
  JWTTokenPair,
} from "@shared/types"

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

export class UporabnikProfile extends UporabnikDetails {
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

    this.id = id
    this.ime = ime
    this.priimek = priimek
    this.slika = slika
    this.role = role
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

// user login
// - jwt
// - refresh token

export default class Uporabnik<M = string, P = string, D = string> {
  id: string
  ime: string
  priimek: string
  slika: string
  rojstniDatum: string
  email: string
  hash: string
  role: string
  mentor: M | null
  pripravniki: P[] | null
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
    pripravniki: P[] | null,
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

  static async login(
    email: string,
    password: string
  ): Promise<UserLogin | null> {
    const uporabnik = await UporabnikModel.findOne({
      email,
      isDeleted: {
        $ne: true,
      },
    }).exec()

    if (uporabnik == null) {
      return null
    }

    const geslo_verify = await bcrypt.compare(password, uporabnik.hash)

    if (!geslo_verify) {
      return null
    }

    const token = this.JWTcreate({
      uporabnikId: uporabnik._id.toString(),
      role: uporabnik.role,
    })

    const refreshToken = this.JWTcreateRefreshToken({
      uporabnikId: uporabnik._id.toString(),
      role: uporabnik.role,
    })

    let returnUporabnik = await Uporabnik.insertRefreshToken(
      uporabnik._id.toString(),
      refreshToken
    )

    if (returnUporabnik == null) {
      return null
    }

    return new UserLogin(
      returnUporabnik._id.toString(),
      returnUporabnik.ime,
      returnUporabnik.priimek,
      returnUporabnik.slika,
      returnUporabnik.role,
      token,
      returnUporabnik.refresh_token
    )
  }

  static async logout(uporabnikId: string): Promise<boolean> {
    const result = await Uporabnik.deleteRefreshToken(uporabnikId)

    return result
  }

  static async register(
    ime: string,
    priimek: string,
    slika: string,
    rojstniDatum: string,
    email: string,
    geslo: string,
    role: string,
    mentor: string | null,
    pripravniki: string[] | null,
    druzina: string | null
  ): Promise<boolean> {
    const salt = await bcrypt.genSalt(10)
    const geslo_hash = await bcrypt.hash(geslo, salt)

    const uporabnik = new UporabnikModel({
      ime,
      priimek,
      slika,
      rojstniDatum,
      email,
      hash: geslo_hash,
      role,
      mentor,
      pripravniki,
      druzina,
    })

    await uporabnik.save()

    return !!uporabnik
  }

  static async fetchUserProfile(
    uporabnikId: string
  ): Promise<UporabnikProfile | null> {
    const result = await UporabnikModel.findById(uporabnikId)
      .populate<{ mentor: IUporabnikDetails }>(
        "mentor",
        "_id ime priimek slika role"
      )
      .populate<{ pripravniki: IUporabnikDetails[] }>(
        "pripravniki",
        "_id ime priimek slika role"
      )
      .populate<{ druzina: IDruzinaDetails }>("druzina", "_id ime")
      .exec()

    if (result == null) {
      return null
    }

    return new UporabnikProfile(
      result._id.toString(),
      result.ime,
      result.priimek,
      result.slika,
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
      result.pripravniki
        ? result.pripravniki?.map(
            (pripravnik) =>
              new UporabnikDetails(
                pripravnik._id.toString(),
                pripravnik.ime,
                pripravnik.priimek,
                pripravnik.slika,
                pripravnik.role
              )
          )
        : null,
      result.druzina
        ? new DruzinaDetails(result.druzina._id.toString(), result.druzina.ime)
        : null,
      result.isDeleted
    )
  }

  static async fetchUporabnik(
    uporabnikId: string
  ): Promise<Uporabnik<UporabnikDetails, string, DruzinaDetails> | null> {
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

    return new Uporabnik<UporabnikDetails, string, DruzinaDetails>(
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
      result.pripravniki ? result.pripravniki.map((id) => id.toString()) : null,
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

  static async insertRefreshToken(
    uporabnikId: string,
    refresh_token: string
  ): Promise<IUporabnik | null> {
    const uporabnik = await UporabnikModel.findByIdAndUpdate(
      uporabnikId,
      {
        refresh_token,
      },
      { new: true }
    )

    if (uporabnik == null) {
      return null
    }

    return uporabnik
  }

  static async deleteRefreshToken(uporabnikId: string): Promise<boolean> {
    const uporabnik = await UporabnikModel.findByIdAndUpdate(
      uporabnikId,
      {
        refresh_token: null,
      },
      { new: true }
    )

    return !!uporabnik
  }

  static async fetchUserByRefreshToken(
    refreshToken: string
  ): Promise<IUporabnik | null> {
    const result = await UporabnikModel.findOne({ refresh_token: refreshToken })

    if (result == null) {
      return null
    }

    return result
  }

  static JWTcreate(payload: JWTPayload): string {
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    })

    return token
  }

  static JWTverify(req: Request): boolean {
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

  static JWTverifyString(token: string): boolean {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET as string)

      return true
    } catch (error) {
      return false
    }
  }

  static JWTpayload(req: Request): JWTPayload {
    try {
      if (!req.headers.authorization) {
        throw new Error("ERR_JWT_NO_TOKEN")
      }

      const token = req.headers.authorization.split(" ")[1]

      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JWTDecoded

      return {
        uporabnikId: payload.uporabnikId,
        role: payload.role,
      } as JWTPayload
    } catch (error) {
      throw new Error("ERR_JWT_INVALID_PAYLOAD")
    }
  }

  static JWTcreateRefreshToken(payload: JWTPayload): string {
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "90 days",
    })

    return token
  }

  static async JWTrefresh(refresh_token: string): Promise<JWTTokenPair | null> {
    const isValid = Uporabnik.JWTverifyString(refresh_token)

    if (!isValid) {
      return null
    }

    const uporabnik = await Uporabnik.fetchUserByRefreshToken(refresh_token)

    if (uporabnik == null) {
      return null
    }

    const accessToken = this.JWTcreate({
      uporabnikId: uporabnik._id.toString(),
      role: uporabnik.role,
    })

    const refreshToken = this.JWTcreateRefreshToken({
      uporabnikId: uporabnik._id.toString(),
      role: uporabnik.role,
    })

    const uporabnikWithToken = await Uporabnik.insertRefreshToken(
      uporabnik._id.toString(),
      refreshToken
    )

    if (uporabnikWithToken == null) {
      return null
    }

    return {
      accessToken,
      refreshToken: uporabnikWithToken.refresh_token,
    }
  }
}
