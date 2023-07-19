export class Dnevnik {
  // Ali naj dodam se mentorjevo ime???
  // mogoce to dodam ze v Pinia store, ko se prirpavnik logina
  constructor({ _id, pripravnikId, mentorId, delo, ure, opis }) {
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
  static async vnesiDnevnik(datum, ure, opis, delo) {}
}
