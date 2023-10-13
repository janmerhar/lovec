import OpremaModel from "@models/opremaModel"

module.exports = class Oprema {
  id: string
  lastnik: string
  naziv: string
  tip: string
  stanje: string
  datum: string

  constructor(
    id: string,
    lastnikId: string,
    naziv: string,
    tip: string,
    stanje: string,
    datum: string
  ) {
    this.id = id
    this.lastnik = lastnikId
    this.naziv = naziv
    this.tip = tip
    this.stanje = stanje
    this.datum = datum
  }

  static async fetchUporabnikOprema(uporabnikId: string) {
    const oprema = await OpremaModel.find({ lastnik: uporabnikId })
    return oprema
  }

  static async vnesiOprema(
    lastnikId: string,
    naziv: string,
    tip: string,
    stanje: string
  ) {
    const oprema = await OpremaModel.create({
      lastnik: lastnikId,
      naziv: naziv,
      tip: tip,
      stanje: stanje,
    })
    return oprema
  }

  static async izbrisiOprema(uporabnikId: string, id: string) {
    const oprema = await OpremaModel.findOneAndDelete({
      _id: id,
      lastnik: uporabnikId,
    })

    console.log(oprema)
    return oprema
  }
}