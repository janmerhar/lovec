const { Request } = require("../util/Request")
import jwt_decode from "jwt-decode"

export class Uporabnik extends Request {
  // mogoce tebi dam tudi konstruktor
  constructor({
    _id,
    ime,
    priimek,
    slika,
    rojstniDatum,
    email,
    role,
    token,
    druzina,
    mentor = null,
  }) {
    super()
    this.id = _id
    this.ime = ime
    this.priimek = priimek
    this.slika = slika
    this.rojstniDatum = rojstniDatum
    this.email = email
    this.role = role
    this.token = token
    this.druzina = druzina

    this.mentor = mentor
  }

  //
  // JWT methods
  //

  isJWTvalid(token) {
    if (!token) return -1 // Token not provided or empty

    try {
      const decodedToken = jwt_decode(token)
      const currentTime = Math.floor(Date.now() / 1000) // Convert current time to seconds
      const expirationTime = decodedToken.exp

      if (expirationTime > currentTime) {
        return expirationTime - currentTime // Remaining time in seconds
      } else {
        return 0 // Token has expired
      }
    } catch (error) {
      // Failed to decode the token (invalid token format, etc.)
      return -1
    }
  }

  // async JWTrefresh() {}
  // JWTpayload() {}

  static async login(email, geslo) {
    const uporabnik = await this.axiosInstance.post("/login", { email, geslo })

    uporabnik.data.data = new Uporabnik(uporabnik.data.data)

    return uporabnik.data
  }

  // static async register(ime, priimek, slika, rojstniDatum, email, geslo) {}
  // static async fetchUporabnik(uporabnikId) {}

  // Ti periodicno preverjas, ali je token se veljaven
  // in ga po potrebi osvezi
  // static async refreshToken() {}//
}
