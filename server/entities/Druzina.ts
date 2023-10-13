import DruzinaModel, { IDruzina } from "@models/druzinaModel"

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

  static async fetchDruzine(): Promise<IDruzina[]> {
    const druzine: IDruzina[] = await DruzinaModel.find()
      .populate({
        path: "revirji",
        select: "",
      })
      .populate({
        path: "clani",
        select: "_id ime priimek slika role",
      })
      .exec()

    return druzine
  }
}
