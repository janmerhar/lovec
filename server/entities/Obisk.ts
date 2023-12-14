import ObiskModel from "@models/obiskModel"
import { IOpazovalnica, IUporabnikDetails } from "@shared/types"
import Opazovalnica from "./Opazovalnica"
import { UporabnikDetails } from "./Uporabnik"

export default class Obisk<O = string, U = string> {
  id: string
  opazovalnica: O
  uporabnik: U
  zacetek: string
  konec: string

  constructor(
    id: string,
    opazovalnica: O,
    uporabnik: U,
    zacetek: string,
    konec: string
  ) {
    this.id = id
    this.opazovalnica = opazovalnica
    this.uporabnik = uporabnik
    this.zacetek = zacetek
    this.konec = konec
  }

  static async fetchObiski(
    opazovalnicaId: string,
    datum: string = new Date().toISOString()
  ): Promise<Obisk<Opazovalnica, UporabnikDetails>[]> {
    const zacetek = new Date(datum)
    zacetek.setHours(0, 0, 0, 0)

    const konec = new Date()
    konec.setDate(konec.getDate() + 1)

    const result = await ObiskModel.find({
      opazovalnica: opazovalnicaId,
      zacetek: {
        $gte: zacetek,
        $lt: konec,
      },
    })
      .populate<{ opazovalnica: IOpazovalnica }>(
        "opazovalnica",
        "_id ime kapaciteta prespanje koordinate"
      )
      .populate<{ uporabnik: IUporabnikDetails }>(
        "uporabnik",
        "_id ime priimek slika role"
      )
      .sort({ zacetek: 1 })

    return result.map((obisk) => {
      return new Obisk<Opazovalnica, UporabnikDetails>(
        obisk._id.toString(),
        new Opazovalnica(
          obisk.opazovalnica._id.toString(),
          obisk.opazovalnica.ime,
          obisk.opazovalnica.kapaciteta,
          obisk.opazovalnica.prespanje,
          obisk.opazovalnica.koordinate
        ),
        new UporabnikDetails(
          obisk.uporabnik._id.toString(),
          obisk.uporabnik.ime,
          obisk.uporabnik.priimek,
          obisk.uporabnik.slika,
          obisk.uporabnik.role
        ),
        obisk.zacetek.toString(),
        obisk.konec.toString()
      )
    })
  }

  static async fetchUporabnikObiski(
    uporabnikId: string,
    stran: number,
    PAGE_SIZE: number = 10
  ): Promise<Obisk<Opazovalnica, UporabnikDetails>[]> {
    const result = await ObiskModel.find({
      uporabnik: uporabnikId,
    })
      .populate<{ opazovalnica: IOpazovalnica }>(
        "opazovalnica",
        "_id ime kapaciteta prespanje koordinate"
      )
      .populate<{ uporabnik: IUporabnikDetails }>(
        "uporabnik",
        "_id ime priimek slika role"
      )
      .sort({ zacetek: -1 })
      .skip((stran - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)

    return result.map((obisk) => {
      return new Obisk<Opazovalnica, UporabnikDetails>(
        obisk._id.toString(),
        new Opazovalnica(
          obisk.opazovalnica._id.toString(),
          obisk.opazovalnica.ime,
          obisk.opazovalnica.kapaciteta,
          obisk.opazovalnica.prespanje,
          obisk.opazovalnica.koordinate
        ),
        new UporabnikDetails(
          obisk.uporabnik._id.toString(),
          obisk.uporabnik.ime,
          obisk.uporabnik.priimek,
          obisk.uporabnik.slika,
          obisk.uporabnik.role
        ),
        obisk.zacetek.toString(),
        obisk.konec.toString()
      )
    })
  }

  static async fetchUporabnikActiveObisk(
    uporabnikId: string
  ): Promise<Obisk<Opazovalnica, UporabnikDetails> | null> {
    const result = await ObiskModel.findOne({
      uporabnik: uporabnikId,
      konec: {
        $gte: new Date(),
      },
    })
      .populate<{ opazovalnica: IOpazovalnica }>(
        "opazovalnica",
        "_id ime kapaciteta prespanje koordinate"
      )
      .populate<{ uporabnik: IUporabnikDetails }>(
        "uporabnik",
        "_id ime priimek slika role"
      )

    if (!result) {
      return null
    }

    return new Obisk(
      result._id.toString(),
      new Opazovalnica(
        result.opazovalnica._id.toString(),
        result.opazovalnica.ime,
        result.opazovalnica.kapaciteta,
        result.opazovalnica.prespanje,
        result.opazovalnica.koordinate
      ),
      new UporabnikDetails(
        result.uporabnik._id.toString(),
        result.uporabnik.ime,
        result.uporabnik.priimek,
        result.uporabnik.slika,
        result.uporabnik.role
      ),
      result.zacetek.toString(),
      result.konec.toString()
    )
  }

  static async fetchUporabnikObiskiDatum(
    uporabnikId: string,
    datum: string = new Date().toISOString()
  ): Promise<Obisk<Opazovalnica, UporabnikDetails>[]> {
    const zacetek = new Date(datum)
    zacetek.setHours(0, 0, 0, 0)

    const konec = new Date()
    konec.setDate(konec.getDate() + 1)

    const result = await ObiskModel.find({
      uporabnik: uporabnikId,
      zacetek: {
        $gte: zacetek,
        $lt: konec,
      },
    })
      .populate<{ opazovalnica: IOpazovalnica }>(
        "opazovalnica",
        "_id ime kapaciteta prespanje koordinate"
      )
      .populate<{ uporabnik: IUporabnikDetails }>(
        "uporabnik",
        "_id ime priimek slika role"
      )

    return result.map((obisk) => {
      return new Obisk<Opazovalnica, UporabnikDetails>(
        obisk._id.toString(),
        new Opazovalnica(
          obisk.opazovalnica._id.toString(),
          obisk.opazovalnica.ime,
          obisk.opazovalnica.kapaciteta,
          obisk.opazovalnica.prespanje,
          obisk.opazovalnica.koordinate
        ),
        new UporabnikDetails(
          obisk.uporabnik._id.toString(),
          obisk.uporabnik.ime,
          obisk.uporabnik.priimek,
          obisk.uporabnik.slika,
          obisk.uporabnik.role
        ),
        obisk.zacetek.toString(),
        obisk.konec.toString()
      )
    })
  }

  static async fetchUporabnikObiskiTotal(
    uporabnikId: string,
    datum: string = new Date().toISOString()
  ): Promise<number> {
    const obiski = await Obisk.fetchUporabnikObiskiDatum(uporabnikId, datum)

    return obiski.reduce((acc, obisk) => {
      return (
        acc +
        (new Date(obisk.konec).getTime() - new Date(obisk.zacetek).getTime()) /
          60000
      )
    }, 0)
  }

  static async deleteObisk(obiskId: string): Promise<boolean> {
    const result = await ObiskModel.findByIdAndDelete(obiskId)

    return !!result
  }

  static async opazovalnicaZasedenost(
    opazovalnicaId: string,
    datetime: string = new Date().toISOString()
  ): Promise<Obisk<Opazovalnica, UporabnikDetails>[]> {
    const result = await ObiskModel.find({
      opazovalnica: opazovalnicaId,
      konec: {
        $gte: datetime,
      },
    })
      .populate<{ opazovalnica: IOpazovalnica }>(
        "opazovalnica",
        "_id ime kapaciteta prespanje koordinate"
      )
      .populate<{ uporabnik: IUporabnikDetails }>(
        "uporabnik",
        "_id ime priimek slika role"
      )

    return result.map((obisk) => {
      return new Obisk<Opazovalnica, UporabnikDetails>(
        obisk._id.toString(),
        new Opazovalnica(
          obisk.opazovalnica._id.toString(),
          obisk.opazovalnica.ime,
          obisk.opazovalnica.kapaciteta,
          obisk.opazovalnica.prespanje,
          obisk.opazovalnica.koordinate
        ),
        new UporabnikDetails(
          obisk.uporabnik._id.toString(),
          obisk.uporabnik.ime,
          obisk.uporabnik.priimek,
          obisk.uporabnik.slika,
          obisk.uporabnik.role
        ),
        obisk.zacetek.toString(),
        obisk.konec.toString()
      )
    })
  }

  static async isOpazovalnicaZasedena(
    opazovalnicaId: string,
    datetime: string = new Date().toISOString()
  ): Promise<boolean> {
    const result = await Obisk.opazovalnicaZasedenost(opazovalnicaId, datetime)

    if (result.length === 0) {
      return false
    }

    const maxZasedenost = result[0].opazovalnica.kapaciteta
    const trenutnaZasedenost = result.length

    return trenutnaZasedenost >= maxZasedenost
  }

  static async startObisk(
    opazovalnicaId: string,
    uporabnikId: string,
    zacetek: string,
    konec: string
  ): Promise<Obisk | null> {
    const zasedenost = await Obisk.isOpazovalnicaZasedena(opazovalnicaId)

    if (zasedenost) {
      return null
    }

    const activeObisk = await Obisk.fetchUporabnikActiveObisk(uporabnikId)

    if (activeObisk) {
      return null
    }

    const result = await ObiskModel.create({
      opazovalnica: opazovalnicaId,
      uporabnik: uporabnikId,
      zacetek: zacetek,
      konec: konec,
    })

    return new Obisk(
      result._id.toString(),
      result.opazovalnica.toString(),
      result.uporabnik.toString(),
      result.zacetek.toString(),
      result.konec.toString()
    )
  }

  static async endUporabnikObisk(
    uporabnikId: string,
    datum: string = new Date().toISOString()
  ): Promise<Obisk | null> {
    const result = await ObiskModel.findOneAndUpdate(
      {
        uporabnik: uporabnikId,
        konec: {
          $gte: new Date(),
        },
      },
      {
        konec: datum,
      }
    )

    if (!result) {
      return null
    }

    return new Obisk(
      result._id.toString(),
      result.opazovalnica.toString(),
      result.uporabnik.toString(),
      result.zacetek.toString(),
      result.konec.toString()
    )
  }

  static async endObisk(
    obiskId: string,
    konec: string = new Date().toString()
  ): Promise<Obisk | null> {
    const result = await ObiskModel.findByIdAndUpdate(obiskId, {
      konec: konec,
    })

    if (!result) {
      return null
    }

    return new Obisk(
      result._id.toString(),

      result.opazovalnica.toString(),
      result.uporabnik.toString(),
      result.zacetek.toString(),
      result.konec.toString()
    )
  }
}
