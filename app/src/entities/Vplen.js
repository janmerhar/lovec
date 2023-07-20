/* eslint-disable */
import { Request } from "../util/Request"

export class Vplen extends Request {
  constructor({ _id, zival, teza, datum, bolezni }) {
    super()
    this.id = _id
    this.zival = zival
    this.teza = teza
    this.datum = datum
    this.bolezni = bolezni
  }

  static async vnesiVplen(zival, teza, datum, bolezni) {
    const result = await this.axiosInstance.post("/vpleni/dodaj", {
      zival,
      teza,
      datum,
      bolezni,
    })

    return result.data
  }

  static async fetchVpleni(stran) {
    const result = await this.axiosInstance.get(`/vpleni/moji/${stran}`)

    result.data.data = result.data.data.map((vplen) => {
      return {
        datum: vplen.datum,
        zivali: vplen.zivali
          .map(
            (zival) =>
              zival.charAt(0).toUpperCase() + zival.slice(1).toLowerCase()
          )
          .sort(),
      }
    })

    return result.data
  }

  static async fetchVplenDatum(datum) {
    const result = await this.axiosInstance.get(`/vpleni/${datum}`)

    result.data.data = result.data.data.map((vplen) => new Vplen(vplen))

    return result.data
  }
}
