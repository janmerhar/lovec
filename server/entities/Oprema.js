const OpremaModel = require("../models/oprema")

module.exports = class Oprema {
  constructor(id, lastnik, naziv, tip, stanje, datum) {
    this.id = id
    this.naziv = naziv
    this.tip = tip
    this.stanje = stanje
    this.datum = datum
  }

  static async fetchUporabnikOprema(uporabnikId) {}
  
}
