import DruzinaModel from "@models/druzinaModel"
import { IRevir, IUporabnikDetails } from "@shared/types"
import Uporabnik from "./Uporabnik"

import { UporabnikDetails } from "./Uporabnik"
import { RevirDetails } from "./Revir"

export class DruzinaDetails {
  id: string
  ime: string
  revirjiCount?: number
  claniCount?: number

  constructor(
    id: string,
    ime: string,
    revirjiCount?: number,
    claniCount?: number
  ) {
    this.id = id
    this.ime = ime
    this.revirjiCount = revirjiCount
    this.claniCount = claniCount
  }
}

export default class Druzina<R = string, C = string> {
  id: string
  ime: string
  revirji: R[]
  clani: C[]

  constructor(id: string, ime: string, revirji: R[], clani: C[]) {
    this.id = id
    this.ime = ime
    this.revirji = revirji
    this.clani = clani
  }

  static async fetchDruzina(
    id: string
  ): Promise<Druzina<RevirDetails, UporabnikDetails> | null> {
    const druzina = await DruzinaModel.findById(id)
      .populate<{ revirji: IRevir[] }>({
        path: "revirji",
        select: "",
      })
      .populate<{ clani: IUporabnikDetails[] }>({
        path: "clani",
        select: "_id ime priimek slika role",
      })
      .exec()

    if (druzina == null) {
      return null
    }

    return new Druzina<RevirDetails, UporabnikDetails>(
      druzina._id.toString(),
      druzina.ime,
      druzina.revirji.map((revir) => {
        return new RevirDetails(
          revir._id.toString(),
          revir.ime,
          revir.koordinate
        )
      }),
      druzina.clani.map((clan) => {
        return new UporabnikDetails(
          clan._id.toString(),
          clan.ime,
          clan.priimek,
          clan.slika,
          clan.role
        )
      })
    )
  }

  static async fetchDruzine(): Promise<DruzinaDetails[]> {
    const druzine = await DruzinaModel.aggregate([
      {
        $project: {
          revirjiCount: {
            $size: "$revirji",
          },
          claniCount: {
            $size: "$clani",
          },
        },
      },
    ])

    return druzine.map((druzina) => {
      return new DruzinaDetails(
        druzina._id.toString(),
        druzina.ime,
        druzina.revirjiCount,
        druzina.claniCount
      )
    })
  }

  static async insertDruzina(
    ime: string,
    revirji: string[],
    clani: string[]
  ): Promise<Druzina> {
    const druzina = await DruzinaModel.create({ ime, revirji, clani })

    return new Druzina(
      druzina._id.toString(),
      druzina.ime,
      druzina.revirji.map((revir) => revir.toString()),
      druzina.clani.map((clan) => clan.toString())
    )
  }

  static async dodajRevir(
    druzinaId: string,
    revirId: string
  ): Promise<boolean> {
    const result = await DruzinaModel.updateOne(
      { _id: druzinaId },
      { $push: { revirji: revirId } }
    )

    return result.modifiedCount > 0
  }

  static async odstraniRevir(revirId: string): Promise<boolean> {
    const result = await DruzinaModel.updateMany(
      { revirji: revirId },
      { $pull: { revirji: revirId } }
    )

    return result.modifiedCount > 0
  }

  static async odstraniClana(uporabnikId: string): Promise<boolean> {
    const result = await DruzinaModel.updateMany(
      { clani: uporabnikId },
      { $pull: { clani: uporabnikId } }
    )

    if (result.modifiedCount > 0) {
      const result2 = await Uporabnik.odstraniClanstvoDruzine(uporabnikId)

      return result2 ? true : false
    }

    return false
  }

  static async dodajClana(druzinaId: string, clanId: string): Promise<boolean> {
    const result = await Druzina.odstraniClana(clanId)

    const result2 = await DruzinaModel.updateOne(
      { _id: druzinaId },
      { $push: { clani: clanId } }
    )

    if (result2.modifiedCount > 0) {
      const result3 = await Uporabnik.dodajClanstvoDruzine(clanId, druzinaId)

      return result3 ? true : false
    }

    return false
  }

  static async deleteDruzina(druzinaId: string): Promise<boolean> {
    const result = await DruzinaModel.findByIdAndDelete(druzinaId)

    if (!result) {
      return false
    }

    const result2 = await Uporabnik.odstraniVseClaneDruzine(druzinaId)

    return result2
  }
}
