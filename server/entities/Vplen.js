const VplenModel = require("../models/vplen")

module.exports = class Vplen {
  constructor(id, uporabnikId, zival, teza, datum, bolezni) {
    this.id = id
    this.uporabnik = uporabnikId
    this.zival = zival
    this.teza = teza
    this.datum = datum
    this.bolezni = bolezni
  }

  // Prenasam samo po delih
  static async fetchVpleni(uporabnikId, from, to) {}
  // Prenesem vse uporabnikove vplene za določen datum
  static async fetchVpleniDatum(uporabnikId, datum) {}
  static async vnesiVplen(uporabnikId, zival, teza, datum, bolezni) {
    const vplen = await VplenModel.create({
      uporabnik: uporabnikId,
      zival: zival,
      teza: teza,
      datum: datum,
      bolezni: bolezni,
    })

    return vplen
  }
}
