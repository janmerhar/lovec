export class Oprema {
  constructor(id, naziv, tip, stanje) {
    this.id = id
    this.naziv = naziv
    this.tip = tip
    this.stanje = stanje
  }

  static async fetchUporabnikOprema() {}
  static async vnesiOprema(naziv, tip, stanje) {}
  async izbrisiOprema() {}
}
