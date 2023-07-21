const DnevnikModel = require("../models/dnevnik")

module.exports = class Dnevnik {
  constructor(dnevnikId, pripravnik = null, mentorId, delo, ure, opis) {
    this.dnevnikId = dnevnikId
    this.pripravnikId = pripravnikId
    this.mentorId = mentorId
    this.delo = delo
    this.ure = ure
    this.opis = opis
  }

  // Vrneta tabelo instanc Dnevnik
  static async fetchDnevnikiMentor(mentorId, datum) {
    const dnevniki = await DnevnikModel.find({ mentor: mentorId, datum: datum })
      .populate("pripravnik", "_id ime priimek")
      .exec()

    return dnevniki
  }

  // Return by pages
  static async fetchDnevnikiPripravnik(pripravnikId, stran) {
    const STRAN_SIZE = 10

    const dnevniki = await DnevnikModel.find({ pripravnik: pripravnikId })
      .sort({ datum: -1 })
      .skip((stran - 1) * STRAN_SIZE)
      .limit(STRAN_SIZE)

    return dnevniki
  }

  // vrne dnevnik id
  static async vnesiDnevnik(pripravnikId, mentorId, datum, ure, opis, delo) {
    const novDnevnik = await DnevnikModel.create({
      pripravnik: pripravnikId,
      mentor: mentorId,
      status: "neobdelan",
      datum,
      ure,
      opis,
      delo,
    })

    return novDnevnik
  }

  static async spremeniStatusDnevnik(mentorId, dnevnikId, status) {
    const posodobljenDnevnik = await DnevnikModel.findOneAndUpdate(
      { _id: dnevnikId, mentor: mentorId },
      { status: status },
      { new: true }
    )


    return posodobljenDnevnik !== null
  }
}
