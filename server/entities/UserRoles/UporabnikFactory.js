const UporabnikModel = require("../../models/uporabnik")
const bcrypt = require("bcrypt")

module.exports = class UporabnikFactory {
  // Tebe dam v factory
  static async login(email, password) {
    const uporabnik = await UporabnikModel.findOne({ email }).exec()

    const geslo_verify = await bcrypt.compare(password, uporabnik.hash)

    return geslo_verify ? await this.JWTcreate() : null
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
    const result = await UporabnikFactory.findbyId(uporabnikId)

    return result
  }

}
