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

  static async vnesiOprema(naziv, tip, stanje) {
    const result = await this.axiosInstance.post("/oprema/dodaj", {
      naziv,
      tip,
      stanje,
    })

    result.data.data = new Oprema(result.data.data)

    return result.data
  }

  static async izbrisiOprema(id) {
    const result = await this.axiosInstance.delete("/oprema/izbrisi", {
      data: {
        id,
      },
    })

    return result.data
  }
}
