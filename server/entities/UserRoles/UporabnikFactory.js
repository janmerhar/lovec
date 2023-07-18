const UporabnikModel = require("../../models/uporabnik")
const bcrypt = require("bcrypt")

module.exports = class UporabnikFactory {
  // Tebe dam v factory
  static async login(email, password) {
    const uporabnik = await UporabnikModel.findOne({ email }).exec()

    const geslo_verify = await bcrypt.compare(password, uporabnik.hash)

    return geslo_verify ? await this.JWTcreate() : null
  }

}
