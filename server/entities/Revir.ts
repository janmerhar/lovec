import RevirModel, { IRevir } from "@models/revirModel"

export default class Revir {
  id: string
  ime: string
  koordinate: number[]
  druzina: string

  constructor(id: string, ime: string, koordinate: number[], druzina: string) {
    this.id = id
    this.ime = ime
    this.koordinate = koordinate
    this.druzina = druzina
  }

  static async fetchRevirji(): Promise<IRevir[]> {
    const revirji = await RevirModel.find().populate({
      path: "druzina",
      select: "_id ime",
    })

    return revirji
  }
}
