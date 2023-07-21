import { Request } from "../util/Request"

export class Dnevnik extends Request {
  // Ali naj dodam se mentorjevo ime???
  // mogoce to dodam ze v Pinia store, ko se prirpavnik logina
  constructor({ _id, pripravnikId, mentorId, delo, ure, opis }) {
    super()
    this.id = _id
    this.pripravnikId = pripravnikId
    this.mentorId = mentorId
    this.delo = delo
    this.ure = ure
    this.opis = opis
  }

  async spremeniStatusDnevnik(status) {}

  //   Funkcije za mentorja
  static async fetchDnevnikiMentor(datum) {}
  static async fetchDnevnikiPripravnik(stran) {}

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
