import { Request } from "../util/Request"

export class Dnevnik extends Request {
  constructor({ _id, pripravnik, mentor, status, datum, delo, ure, opis }) {
    super()
    this.id = _id
    this.pripravnik = pripravnik
    this.mentorId = mentor
    this.status = status
    this.datum = datum
    this.delo = delo
    this.ure = ure
    this.opis = opis
  }

  static async spremeniStatusDnevnik(id, status) {
    const dnevnik = await this.axiosInstance.patch(`/dnevniki/status`, {
      dnevnikId: id,
      status,
    })

    return true
  }

  //   Funkcije za mentorja
  static async fetchDnevnikiMentor(datum) {
    const dnevniki = await this.axiosInstance.get(`/dnevniki/mentor/${datum}`)

    // dnevniki.data.data = dnevniki.data.data.map((dnevnik) => {
    // new Dnevnik(dnevnik)
    // })

    return dnevniki.data
  }


  //   Funkcije za pripravnika
  static async vnesiDnevnik(datum, ure, opis, delo) {
    const dnevnik = await this.axiosInstance.post("/dnevniki/dodaj", {
      datum,
      ure,
      opis,
      delo,
    })

    dnevnik.data.data = new Dnevnik(dnevnik.data.data)

    return dnevnik.data
  }
}
