const UporabnikModel = require("../../models/uporabnikModel")
const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")
module.exports = class UporabnikFactory {
  // Tebe dam v factory
  static async login(email, password) {
    const uporabnik = await UporabnikModel.findOne({ email }).exec()

    const geslo_verify = await bcrypt.compare(password, uporabnik.hash)

    if (geslo_verify) {
      const token = await this.JWTcreate({
        uporabnikId: uporabnik._id.toString(),
        role: uporabnik.role,
      })

      let returnUporabnik = await UporabnikFactory.fetchUporabnik(uporabnik._id)

      returnUporabnik = returnUporabnik.toObject()
      returnUporabnik.refresh_token = undefined

      return {
        ...returnUporabnik,
        token,
      }
    }
    return null
  }

  static async register(ime, priimek, slika, rojstniDatum, email, geslo) {
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

  static async fetchUporabnik(uporabnikId) {
    const result = await UporabnikModel.findById(uporabnikId)
      .populate("mentor", "_id ime priimek ")
      .populate("druzina", "_id ime")
      .exec()

    result.hash = undefined

    return result
  }

  //
  // JWT
  //
  static async JWTcreate(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" })

    return token
  }

  static async JWTverify(req) {
    try {
      const token = req.headers.authorization.split(" ")[1]

      const payload = jwt.verify(token, process.env.JWT_SECRET)

      return true
    } catch (error) {
      return false
    }
  }

  static async JWTpayload(req) {
    try {
      const token = req.headers.authorization.split(" ")[1]

      const payload = jwt.verify(token, process.env.JWT_SECRET)

      return {
        uporabnikId: payload.uporabnikId,
        role: payload.role,
      }
    } catch (error) {
      throw new Error("Napaka pri preverjanju JWT")
    }
  }

  static async JWTrefresh(req) {}
}
