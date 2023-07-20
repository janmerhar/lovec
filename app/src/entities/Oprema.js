import { Request } from "../util/Request"

export class Oprema extends Request {
  constructor({ _id, naziv, tip, stanje, datum }) {
    super()
    this.id = _id
    this.naziv = naziv
    this.tip = tip
    this.stanje = stanje
    this.datum = datum
  }

  static async fetchUporabnikOprema() {
    const result = await this.axiosInstance.get("/oprema/uporabnik")

    result.data.data = result.data.data.map((oprema) => new Oprema(oprema))

    return result.data
  }

  static async vnesiOprema(naziv, tip, stanje) {}
  async izbrisiOprema() {}
}
