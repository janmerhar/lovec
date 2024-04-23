import JagaModel from "@models/jagaModel"
import { UporabnikDetails } from "./Uporabnik"
import { IUporabnikDetails } from "@shared/types"

export class Jaga<O = string, U = string> {
  id: string
  organizator: O
  naziv: string
  opis: string
  udelezeni: U[]
  maxUdelezeni: number
  lokacija: number[][]
  zacetek: string

  constructor(
    id: string,
    organizator: O,
    naziv: string,
    opis: string,
    udelezeni: U[],
    maxUdelezeni: number,
    lokacija: number[][],
    zacetek: string
  ) {
    this.id = id
    this.organizator = organizator
    this.naziv = naziv
    this.opis = opis
    this.udelezeni = udelezeni
    this.maxUdelezeni = maxUdelezeni
    this.lokacija = lokacija
    this.zacetek = zacetek
  }

  // TODO: preverjanje, ali je dosti prostora
  // TODO: preverjanje, ali je uporabnik ze notri
  // uporabi mongodb "triggerje"
  // https://stackoverflow.com/questions/43124366/how-to-trigger-a-function-whenever-a-mongoose-document-is-updated
  static async insertJaga(
    organizator: string,
    naziv: string,
    opis: string,
    udelezeni: string[],
    maxUdelezeni: number,
    lokacija: number[][],
    zacetek: string
    // TODO: za vse metode, ki vracajo jago
    // naredi tako, da bodo vedno uporabniki in organizatorji
    // poulated
  ): Promise<Jaga<UporabnikDetails, UporabnikDetails> | null> {
    const result = await JagaModel.create({
      organizator,
      naziv,
      opis,
      udelezeni,
      maxUdelezeni,
      lokacija,
      zacetek,
    })

    if (!result) {
      return null
    }

    const populatedResult = await Jaga.fetchJaga(result._id.toString())

    return populatedResult
  }

  static async updateJaga(
    id: string,
    organizator: string,
    naziv: string,
    opis: string,
    udelezeni: string[],
    lokacija: number[][],
    zacetek: string
  ): Promise<Jaga<UporabnikDetails, UporabnikDetails> | null> {
    const result = await JagaModel.findByIdAndUpdate(
      id,
      {
        organizator,
        naziv,
        opis,
        udelezeni,
        lokacija,
        zacetek,
      },
      { new: true }
    )
      .populate<{ organizator: IUporabnikDetails }>(
        "organizator",
        "_id ime priimek slika role"
      )
      .populate<{ udelezeni: IUporabnikDetails[] }>(
        "udelezeni",
        "_id ime priimek slika role"
      )

    if (!result) {
      return null
    }

    return new Jaga<UporabnikDetails, UporabnikDetails>(
      result._id.toString(),
      new UporabnikDetails(
        result.organizator._id.toString(),
        result.organizator.ime,
        result.organizator.priimek,
        result.organizator.slika,
        result.organizator.role
      ),
      result.naziv,
      result.opis,
      result.udelezeni.map((udelezeni) => {
        return new UporabnikDetails(
          udelezeni._id.toString(),
          udelezeni.ime,
          udelezeni.priimek,
          udelezeni.slika,
          udelezeni.role
        )
      }),
      result.maxUdelezeni,
      result.lokacija,
      result.zacetek.toString()
    )
  }

  static async deleteJagaOrganizator(
    jagaId: string,
    organizatorId: string
  ): Promise<boolean> {
    const result = await JagaModel.deleteOne({
      _id: jagaId,
      organizator: organizatorId,
    })

    return result.deletedCount > 0
  }

  static async deleteJaga(id: string): Promise<boolean> {
    const result = await JagaModel.findByIdAndDelete(id)

    if (!result) {
      return false
    }

    return true
  }

  static async fetchJaga(
    id: string
  ): Promise<Jaga<UporabnikDetails, UporabnikDetails> | null> {
    const result = await JagaModel.findById(id)
      .populate<{ organizator: IUporabnikDetails }>(
        "organizator",
        "_id ime priimek slika role"
      )
      .populate<{ udelezeni: IUporabnikDetails[] }>(
        "udelezeni",
        "_id ime priimek slika role"
      )

    if (!result) {
      return null
    }

    return new Jaga<UporabnikDetails, UporabnikDetails>(
      result._id.toString(),
      new UporabnikDetails(
        result.organizator._id.toString(),
        result.organizator.ime,
        result.organizator.priimek,
        result.organizator.slika,
        result.organizator.role
      ),
      result.naziv,
      result.opis,
      result.udelezeni.map((udelezeni) => {
        return new UporabnikDetails(
          udelezeni._id.toString(),
          udelezeni.ime,
          udelezeni.priimek,
          udelezeni.slika,
          udelezeni.role
        )
      }),
      result.maxUdelezeni,
      result.lokacija,
      result.zacetek.toString()
    )
  }

  static async fetchJage(
    isActive: boolean,
    stran: number,
    PAGE_SIZE: number = 10
  ): Promise<Jaga<UporabnikDetails, UporabnikDetails>[]> {
    const zacetek = isActive ? { $gte: new Date() } : { $lt: new Date() }

    const result = await JagaModel.find({ zacetek })
      .populate<{ organizator: IUporabnikDetails }>(
        "organizator",
        "_id ime priimek slika role"
      )
      .populate<{ udelezeni: IUporabnikDetails[] }>(
        "udelezeni",
        "_id ime priimek slika role"
      )
      .sort({ zacetek: -1 })
      .skip((stran - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)

    return result.map((jaga) => {
      return new Jaga<UporabnikDetails, UporabnikDetails>(
        jaga._id.toString(),
        new UporabnikDetails(
          jaga.organizator._id.toString(),
          jaga.organizator.ime,
          jaga.organizator.priimek,
          jaga.organizator.slika,
          jaga.organizator.role
        ),
        jaga.naziv,
        jaga.opis,
        jaga.udelezeni.map(
          (udelezeni) =>
            new UporabnikDetails(
              udelezeni._id.toString(),
              udelezeni.ime,
              udelezeni.priimek,
              udelezeni.slika,
              udelezeni.role
            )
        ),
        jaga.maxUdelezeni,
        jaga.lokacija,
        jaga.zacetek.toString()
      )
    })
  }

  // Moram preverjati, ali je uporabnik tudi organizator
  // to tudi steje kot clanstvo
  // oz. te lahko dodam v udelezene, ob sami kreaciji jage lol
  static async fetchUporabnikJage(
    uporabnikId: string,
    isActive: boolean,
    stran: number,
    PAGE_SIZE: number = 10
  ): Promise<Jaga<UporabnikDetails, UporabnikDetails>[]> {
    const zacetek = isActive ? { $gte: new Date() } : { $lt: new Date() }

    const result = await JagaModel.find({ udelezeni: uporabnikId, zacetek })
      .populate<{ organizator: IUporabnikDetails }>(
        "organizator",
        "_id ime priimek slika role"
      )
      .populate<{ udelezeni: IUporabnikDetails[] }>(
        "udelezeni",
        "_id ime priimek slika role"
      )
      .sort({ zacetek: -1 })
      .skip((stran - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)

    return result.map((jaga) => {
      return new Jaga<UporabnikDetails, UporabnikDetails>(
        jaga._id.toString(),
        new UporabnikDetails(
          jaga.organizator._id.toString(),
          jaga.organizator.ime,
          jaga.organizator.priimek,
          jaga.organizator.slika,
          jaga.organizator.role
        ),
        jaga.naziv,
        jaga.opis,
        jaga.udelezeni.map(
          (udelezeni) =>
            new UporabnikDetails(
              udelezeni._id.toString(),
              udelezeni.ime,
              udelezeni.priimek,
              udelezeni.slika,
              udelezeni.role
            )
        ),
        jaga.maxUdelezeni,
        jaga.lokacija,
        jaga.zacetek.toString()
      )
    })
  }

  // TODO: preveri, je uporabnik ze notri
  // TODO: preveri, ce je jaga ze polna
  static async joinJaga(
    jagaId: string,
    uporabnikId: string
  ): Promise<Jaga<UporabnikDetails, UporabnikDetails> | null> {
    const result = await JagaModel.findByIdAndUpdate(
      {
        _id: jagaId,
        udelezeni: { $ne: uporabnikId },
        maxUdelezeni: { $gt: { $size: "$udelezeni" } },
      },
      {
        $push: { udelezeni: uporabnikId },
      },
      { new: true }
    )
      .populate<{ organizator: IUporabnikDetails }>(
        "organizator",
        "_id ime priimek slika role"
      )
      .populate<{ udelezeni: IUporabnikDetails[] }>(
        "udelezeni",
        "_id ime priimek slika role"
      )

    if (!result) {
      return null
    }

    return new Jaga<UporabnikDetails, UporabnikDetails>(
      result._id.toString(),
      new UporabnikDetails(
        result.organizator._id.toString(),
        result.organizator.ime,
        result.organizator.priimek,
        result.organizator.slika,
        result.organizator.role
      ),
      result.naziv,
      result.opis,
      result.udelezeni.map((udelezeni) => {
        return new UporabnikDetails(
          udelezeni._id.toString(),
          udelezeni.ime,
          udelezeni.priimek,
          udelezeni.slika,
          udelezeni.role
        )
      }),
      result.maxUdelezeni,
      result.lokacija,
      result.zacetek.toString()
    )
  }

  // TODO: tebe predelaj v boolean in vrni true/false
  static async leaveJaga(
    jagaId: string,
    uporabnikId: string
  ): Promise<Jaga<UporabnikDetails, UporabnikDetails> | null> {
    const result = await JagaModel.findByIdAndUpdate(
      {
        _id: jagaId,
        udelezeni: uporabnikId,
      },
      {
        $pull: { udelezeni: uporabnikId },
      },
      { new: true }
    )
      .populate<{ organizator: IUporabnikDetails }>(
        "organizator",
        "_id ime priimek slika role"
      )
      .populate<{ udelezeni: IUporabnikDetails[] }>(
        "udelezeni",
        "_id ime priimek slika role"
      )

    if (!result) {
      return null
    }

    return new Jaga<UporabnikDetails, UporabnikDetails>(
      result._id.toString(),
      new UporabnikDetails(
        result.organizator._id.toString(),
        result.organizator.ime,
        result.organizator.priimek,
        result.organizator.slika,
        result.organizator.role
      ),
      result.naziv,
      result.opis,
      result.udelezeni.map((udelezeni) => {
        return new UporabnikDetails(
          udelezeni._id.toString(),
          udelezeni.ime,
          udelezeni.priimek,
          udelezeni.slika,
          udelezeni.role
        )
      }),
      result.maxUdelezeni,
      result.lokacija,
      result.zacetek.toString()
    )
  }
}
