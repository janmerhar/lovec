import DnevnikModel from "@models/dnevnikModel"
import { IDnevnik, IUporabnikDetails } from "@shared/types"
import { UporabnikDetails } from "./Uporabnik"

export default class Dnevnik<P = string, M = string> {
  id: string
  pripravnikId: P
  mentorId: M
  datum: string
  delo: string
  ure: number
  opis: string

  constructor(
    id: string,
    pripravnikId: P,
    mentorId: M,
    datum: string,
    delo: string,
    ure: number,
    opis: string
  ) {
    this.id = id
    this.pripravnikId = pripravnikId
    this.mentorId = mentorId
    this.datum = datum
    this.delo = delo
    this.ure = ure
    this.opis = opis
  }

  static async fetchDnevnikiMentor(
    mentorId: string,
    datum: string
  ): Promise<Dnevnik<UporabnikDetails, string>[]> {
    const dnevniki = await DnevnikModel.find({
      mentor: mentorId,
      datum: new Date(datum),
    })
      .populate<{ pripravnik: IUporabnikDetails }>({
        path: "pripravnik",
        select: "_id ime priimek slika role",
      })
      .exec()

    return dnevniki.map((dnevnik) => {
      return new Dnevnik<UporabnikDetails, string>(
        dnevnik._id.toString(),
        new UporabnikDetails(
          dnevnik.pripravnik._id.toString(),
          dnevnik.pripravnik.ime,
          dnevnik.pripravnik.priimek,
          dnevnik.pripravnik.slika,
          dnevnik.pripravnik.role
        ),
        dnevnik.mentor.toString(),
        dnevnik.datum.toISOString(),
        dnevnik.delo,
        dnevnik.ure,
        dnevnik.opis
      )
    })
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
  ): Promise<Dnevnik | null> {
    const novDnevnik = await DnevnikModel.create({
      pripravnik: pripravnikId,
      mentor: mentorId,
      status: "neobdelan",
      datum: new Date(datum),
      ure,
      opis,
      delo,
    })

    if (!novDnevnik) {
      return null
    }

    return new Dnevnik(
      novDnevnik._id.toString(),
      novDnevnik.pripravnik.toString(),
      novDnevnik.mentor.toString(),
      novDnevnik.datum.toISOString(),
      novDnevnik.delo,
      novDnevnik.ure,
      novDnevnik.opis
    )
  }

  static async spremeniStatusDnevnik(
    mentorId: string,
    dnevnikId: string,
    status: string
  ): Promise<Dnevnik | null> {
    const posodobljenDnevnik = await DnevnikModel.findOneAndUpdate(
      { _id: dnevnikId, mentor: mentorId },
      { status: status },
      { new: true }
    )

    if (!posodobljenDnevnik) {
      return null
    }

    return new Dnevnik(
      posodobljenDnevnik._id.toString(),
      posodobljenDnevnik.pripravnik.toString(),
      posodobljenDnevnik.mentor.toString(),
      posodobljenDnevnik.datum.toISOString(),
      posodobljenDnevnik.delo,
      posodobljenDnevnik.ure,
      posodobljenDnevnik.opis
    )
  }
}
