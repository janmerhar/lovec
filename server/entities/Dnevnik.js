const DnevnikModel = require("../models/dnevnik")

module.exports = class Dnevnik {
  constructor(dnevnikId, pripravnikId, mentorId, delo, ure, opis) {
    // tukaj lahko se pridobim imena pripravnika in mentorja
    // v primeru, da ju ze prej nimam
    this.dnevnikId = dnevnikId
    this.pripravnikId = pripravnikId
    this.mentorId = mentorId
    this.delo = delo
    this.ure = ure
    this.opis = opis
  }

  // Vrneta tabelo instanc Dnevnik
  static async fetchDnevnikiMentor(mentorId, datum) {}
  static async fetchDnevnikiPripravnik(pripravnikId, datum) {}

  // vrne dnevnik id
  static async vnesiDnevnik(pripravnikId, mentorId, datum, ure, opis, delo) {}

  static async potrdiDnevnik(mentorId, dnevnikId) {}
  static async zavrniDnevnik(mentorId, dnevnikId) {}
}
