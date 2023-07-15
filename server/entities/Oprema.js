const OpremaModel = require("../models/oprema")

module.exports = class Oprema {
  constructor(id, lastnikId, naziv, tip, stanje, datum) {
    this.id = id
    this.lastnik = lastnikId
    this.naziv = naziv
    this.tip = tip
    this.stanje = stanje
    this.datum = datum
  }

  static async fetchUporabnikOprema(uporabnikId) {}
  // Vrni instanco opreme
  static async vnesiOprema(lastnikId, naziv, tip, stanje, datum) {}
  static async zbrisiOprema(id) {}
}
