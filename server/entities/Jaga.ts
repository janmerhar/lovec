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

  static async insertJaga(
    organizator: string,
    naziv: string,
    opis: string,
    udelezeni: string[],
    maxUdelezeni: number,
    lokacija: number[][],
    zacetek: string
  ): Promise<Jaga | null> {
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

    return new Jaga(
      result._id.toString(),
      result.organizator.toString(),
      result.naziv,
      result.opis,
      result.udelezeni.map((udelezeni) => udelezeni.toString()),
      result.maxUdelezeni,
      result.lokacija,
      result.zacetek.toString()
    )
  }

  static async updateJaga(
    id: string,
    opis: string,
    udelezeni: string[],
    maxUdelezeni: number,
    lokacija: number[][],
    zacetek: string
  ): Promise<Jaga<UporabnikDetails, UporabnikDetails> | null> {
    const result = await JagaModel.findByIdAndUpdate(id, {
      opis,
      udelezeni,
      maxUdelezeni,
      lokacija,
      zacetek,
    })
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
    PAGE_SIZE: number = 10
  ): Promise<Jaga<UporabnikDetails, string>[]> {
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
      .limit(PAGE_SIZE)

    return result.map((jaga) => {
      return new Jaga<UporabnikDetails, string>(
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
        jaga.udelezeni.map((udelezeni) => udelezeni.toString()),
        jaga.maxUdelezeni,
        jaga.lokacija,
        jaga.zacetek.toString()
      )
    })
  }

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

  // leave(user)jaga
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
