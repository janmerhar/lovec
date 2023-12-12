import DruzinaModel from "@models/druzinaModel"
import { IDruzina, IRevir, IUporabnikDetails } from "@shared/types"
import { ObjectId } from "mongoose"

export default class Druzina {
  id: string
  ime: string
  revirji: string[]
  clani: string[]

  constructor(id: string, ime: string, revirji: string[], clani: string[]) {
    this.id = id
    this.ime = ime
    this.revirji = revirji
    this.clani = clani
  }

  static async fetchDruzina(id: string): Promise<IDruzina | null> {
    const druzina: IDruzina | null = await DruzinaModel.findById(id)

    return druzina
  }

  static async fetchDruzine(): Promise<
    IDruzina<ObjectId, IRevir, IUporabnikDetails>[]
  > {
    const druzine = await DruzinaModel.find()
      .populate<{ revirji: IRevir }>({
        path: "revirji",
        select: "",
      })
      .populate<{ clani: IUporabnikDetails }>({
        path: "clani",
        select: "_id ime priimek slika role",
      })
      .exec()

    return druzine as unknown as IDruzina<ObjectId, IRevir, IUporabnikDetails>[]
  }

  static async dodajRevir(
    druzinaId: string,
    revirId: string
  ): Promise<boolean> {
    const druzina = await DruzinaModel.updateOne(
      { _id: druzinaId },
      { $push: { revirji: revirId } }
    )

    return true
  }

  static async odstraniRevir(
    druzinaId: string,
    revirId: string
  ): Promise<boolean> {
    const druzina = await DruzinaModel.updateOne(
      { _id: druzinaId },
      { $pull: { revirji: revirId } }
    )

    return true
  }
  // static async dodajClana(druzinaId: string, clanId: string) {}
}

export class DruzinaDetails {
  id: string
  ime: string

  constructor(id: string, ime: string) {
    this.id = id
    this.ime = ime
  }
}
