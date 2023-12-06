import RevirModel from "@models/revirModel"
import { IDruzinaDetails, IRevir } from "@shared/types"
import { ObjectId } from "mongoose"

export default class Revir {
  id: string
  ime: string
  koordinate: number[][]
  druzina: string

  constructor(
    id: string,
    ime: string,
    koordinate: number[][],
    druzina: string
  ) {
    this.id = id
    this.ime = ime
    this.koordinate = koordinate
    this.druzina = druzina
  }

  static async fetchRevirji(): Promise<IRevir<ObjectId, IDruzinaDetails>[]> {
    const revirji = await RevirModel.find().populate<{
      druzina: IDruzinaDetails
    }>({
      path: "druzina",
      select: "_id ime",
    })

    return revirji
  }
}
