export class Vplen {
  constructor({ _id, koordinate, zival, teza, datum, bolezni }) {
    this.id = _id
    this.koordinate = koordinate
    this.zival = zival
    this.teza = teza
    this.datum = datum
    this.bolezni = bolezni
  }

  static async vnesiVplen(koordinate, zival, teza, datum, bolezni) {}
  static async fetchVpleni() {}
  static async fetchVplenDatum(datum) {}
}
