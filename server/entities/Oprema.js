const OpremaModel = require("../models/opremaModel")

module.exports = class Oprema {
  constructor(id, lastnikId, naziv, tip, stanje, datum) {
    this.id = id
    this.lastnik = lastnikId
    this.naziv = naziv
    this.tip = tip
    this.stanje = stanje
    this.datum = datum
  }

  static async fetchUporabnikOprema(uporabnikId) {
    const oprema = await OpremaModel.find({ lastnik: uporabnikId })
    return oprema
  }

  static async vnesiOprema(lastnikId, naziv, tip, stanje) {
    const oprema = await OpremaModel.create({
      lastnik: lastnikId,
      naziv: naziv,
      tip: tip,
      stanje: stanje,
    })
    return oprema
  }

  static async izbrisiOprema(uporabnikId, id) {
    const oprema = await OpremaModel.findOneAndDelete({
      _id: id,
      lastnik: uporabnikId,
    })

    console.log(oprema)
    return oprema
  }
}
