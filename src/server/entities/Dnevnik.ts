import DnevnikModel from "@models/dnevnikModel"
import type { IUporabnikDetails } from "@shared/types"
import { UporabnikDetails } from "./Uporabnik"

export default class Dnevnik<P = string, M = string> {
  id: string
  pripravnikId: P
  mentorId: M
  datum: string
  delo: string
  ure: number
  opis: string
  status: string

  constructor(
    id: string,
    pripravnikId: P,
    mentorId: M,
    datum: Date | string,
    delo: string,
    ure: number,
    opis: string,
    status: string
  ) {
    this.id = id
    this.pripravnikId = pripravnikId
    this.mentorId = mentorId

    if (datum instanceof Date) {
      this.datum = datum.toISOString()
    } else {
      this.datum = datum
    }

    this.delo = delo
    this.ure = ure
    this.opis = opis
    this.status = status
  }

  private static async fetchDnevnik(
    id: string
  ): Promise<Dnevnik<UporabnikDetails, UporabnikDetails> | null> {
    const dnevnik = await DnevnikModel.findById(id)
      .populate<{ mentor: IUporabnikDetails }>(
        "mentor",
        "_id ime priimek slika role"
      )
      .populate<{ pripravnik: IUporabnikDetails }>(
        "pripravnik",
        "_id ime priimek slika role"
      )

    if (!dnevnik) {
      return null
    }

    return new Dnevnik(
      dnevnik._id.toString(),
      new UporabnikDetails(
        dnevnik.pripravnik._id.toString(),
        dnevnik.pripravnik.ime,
        dnevnik.pripravnik.priimek,
        dnevnik.pripravnik.slika,
        dnevnik.pripravnik.role
      ),
      new UporabnikDetails(
        dnevnik.mentor._id.toString(),
        dnevnik.mentor.ime,
        dnevnik.mentor.priimek,
        dnevnik.mentor.slika,
        dnevnik.mentor.role
      ),
      dnevnik.datum,
      dnevnik.delo,
      dnevnik.ure,
      dnevnik.opis,
      dnevnik.status
    )
  }

  static async fetchDnevnikiMentor(
    mentorId: string,
    datum: string
  ): Promise<Dnevnik<UporabnikDetails, UporabnikDetails>[]> {
    const dnevniki = await DnevnikModel.find({
      mentor: mentorId,
      datum: new Date(datum),
    })
      .populate<{ pripravnik: IUporabnikDetails }>({
        path: "pripravnik",
        select: "_id ime priimek slika role",
      })
      .populate<{ mentor: IUporabnikDetails }>(
        "mentor",
        "_id ime priimek slika role"
      )
      .exec()

    return dnevniki.map((dnevnik) => {
      return new Dnevnik<UporabnikDetails, UporabnikDetails>(
        dnevnik._id.toString(),
        new UporabnikDetails(
          dnevnik.pripravnik._id.toString(),
          dnevnik.pripravnik.ime,
          dnevnik.pripravnik.priimek,
          dnevnik.pripravnik.slika,
          dnevnik.pripravnik.role
        ),
        new UporabnikDetails(
          dnevnik.mentor._id.toString(),
          dnevnik.mentor.ime,
          dnevnik.mentor.priimek,
          dnevnik.mentor.slika,
          dnevnik.mentor.role
        ),
        dnevnik.datum,
        dnevnik.delo,
        dnevnik.ure,
        dnevnik.opis,
        dnevnik.status
      )
    })
  }

  static async fetchDnevnikiPripravnik(
    pripravnikId: string,
    stran: number
  ): Promise<Dnevnik<UporabnikDetails, UporabnikDetails>[]> {
    const STRAN_SIZE = 10

    const dnevniki = await DnevnikModel.find({ pripravnik: pripravnikId })
      .populate<{ mentor: IUporabnikDetails }>(
        "mentor",
        "_id ime priimek slika role"
      )
      .populate<{ pripravnik: IUporabnikDetails }>(
        "pripravnik",
        "_id ime priimek slika role"
      )
      .sort({ datum: -1 })
      .skip((stran - 1) * STRAN_SIZE)
      .limit(STRAN_SIZE)

    return dnevniki.map((dnevnik) => {
      return new Dnevnik<UporabnikDetails, UporabnikDetails>(
        dnevnik._id.toString(),
        new UporabnikDetails(
          dnevnik.pripravnik._id.toString(),
          dnevnik.pripravnik.ime,
          dnevnik.pripravnik.priimek,
          dnevnik.pripravnik.slika,
          dnevnik.pripravnik.role
        ),
        new UporabnikDetails(
          dnevnik.mentor._id.toString(),
          dnevnik.mentor.ime,
          dnevnik.mentor.priimek,
          dnevnik.mentor.slika,
          dnevnik.mentor.role
        ),
        dnevnik.datum,
        dnevnik.delo,
        dnevnik.ure,
        dnevnik.opis,
        dnevnik.status
      )
    })
  }

  static async vnesiDnevnik(
    pripravnikId: string,
    mentorId: string,
    datum: string,
    ure: number,
    opis: string,
    delo: string
  ): Promise<Dnevnik<UporabnikDetails, UporabnikDetails> | null> {
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

    const dnevnikPopulated = await Dnevnik.fetchDnevnik(
      novDnevnik._id.toString()
    )

    return dnevnikPopulated
  }

  static async spremeniStatusDnevnik(
    dnevnikId: string,
    status: string
  ): Promise<Dnevnik<UporabnikDetails, UporabnikDetails> | null> {
    const posodobljenDnevnik = await DnevnikModel.findOneAndUpdate(
      { _id: dnevnikId },
      { status: status },
      { new: true }
    )

    if (!posodobljenDnevnik) {
      return null
    }

    const dnevnikPopulated = await Dnevnik.fetchDnevnik(
      posodobljenDnevnik._id.toString()
    )

    return dnevnikPopulated
  }

  static async deleteDnevnik(dnevnikId: string): Promise<boolean> {
    const result = await DnevnikModel.deleteOne({ _id: dnevnikId })

    return result.deletedCount > 0
  }
}
