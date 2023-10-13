import DnevnikModel, { IDnevnik } from "@models/dnevnikModel"

export default class Dnevnik {
  dnevnikId: string
  pripravnikId: string
  mentorId: string
  delo: string
  ure: number
  opis: string

  constructor(
    dnevnikId: string,
    pripravnikId: string,
    mentorId: string,
    delo: string,
    ure: number,
    opis: string
  ) {
    this.dnevnikId = dnevnikId
    this.pripravnikId = pripravnikId
    this.mentorId = mentorId
    this.delo = delo
    this.ure = ure
    this.opis = opis
  }

  static async fetchDnevnikiMentor(
    mentorId: string,
    datum: string
  ): Promise<IDnevnik[]> {
    const dnevniki = await DnevnikModel.find({
      mentor: mentorId,
      datum: new Date(datum),
    })
      .populate({ path: "pripravnik", select: "_id ime priimek slika role" })
      .exec()

    return dnevniki
  }

  static async fetchDnevnikiPripravnik(
    pripravnikId: string,
    stran: number
  ): Promise<IDnevnik[]> {
    const STRAN_SIZE = 10

    const dnevniki = await DnevnikModel.find({ pripravnik: pripravnikId })
      .sort({ datum: -1 })
      .skip((stran - 1) * STRAN_SIZE)
      .limit(STRAN_SIZE)

    return dnevniki
  }

  static async vnesiDnevnik(
    pripravnikId: string,
    mentorId: string,
    datum: string,
    ure: number,
    opis: string,
    delo: string
  ): Promise<IDnevnik | null> {
    const novDnevnik = await DnevnikModel.create({
      pripravnik: pripravnikId,
      mentor: mentorId,
      status: "neobdelan",
      datum: new Date(datum),
      ure,
      opis,
      delo,
    })

    return novDnevnik ? novDnevnik : null
  }

  static async spremeniStatusDnevnik(
    mentorId: string,
    dnevnikId: string,
    status: string
  ): Promise<IDnevnik | null> {
    const posodobljenDnevnik = await DnevnikModel.findOneAndUpdate(
      { _id: dnevnikId, mentor: mentorId },
      { status: status },
      { new: true }
    )

    return posodobljenDnevnik ? posodobljenDnevnik : null
  }
}
