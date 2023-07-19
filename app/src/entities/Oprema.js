export class Oprema {
  constructor({ _id, naziv, tip, stanje }) {
    this.id = _id
    this.naziv = naziv
    this.tip = tip
    this.stanje = stanje
  }

  static async fetchUporabnikOprema() {}
  static async vnesiOprema(naziv, tip, stanje) {}
  async izbrisiOprema() {}
}
