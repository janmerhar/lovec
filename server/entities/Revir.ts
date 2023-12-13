import RevirModel from "@models/revirModel"
import { IDruzinaDetails } from "@shared/types"
import Druzina, { DruzinaDetails } from "./Druzina"

export class RevirDetails {
  id: string
  ime: string
  koordinate: number[][]

  constructor(id: string, ime: string, koordinate: number[][]) {
    this.id = id
    this.ime = ime
    this.koordinate = koordinate
  }
}

export default class Revir<D = string> {
  id: string
  ime: string
  koordinate: number[][]
  druzina: D

  constructor(id: string, ime: string, koordinate: number[][], druzina: D) {
    this.id = id
    this.ime = ime
    this.koordinate = koordinate
    this.druzina = druzina
  }

  static async fetchRevirji(): Promise<any> {
    const revirji = await RevirModel.find().populate<{
      druzina: IDruzinaDetails
    }>({
      path: "druzina",
      select: "_id ime",
    })

    return revirji.map((revirInstance) => {
      return new Revir<DruzinaDetails>(
        revirInstance._id.toString(),
        revirInstance.ime,
        revirInstance.koordinate,
        new DruzinaDetails(
          revirInstance.druzina._id.toString(),
          revirInstance.druzina.ime
        )
      )
    })
  }

  static async vnesiRevir(
    ime: string,
    koordinate: number[][],
    druzina: string
  ): Promise<Revir> {
    const revir = await RevirModel.create({
      ime,
      koordinate,
      druzina,
    })

    Druzina.dodajRevir(druzina, revir._id.toString())

    return new Revir(
      revir._id.toString(),
      revir.ime,
      revir.koordinate,
      revir.druzina.toString()
    )
  }

  static async odstraniRevir(id: string): Promise<boolean> {
    const revir = await RevirModel.findByIdAndDelete(id)

    if (!revir) {
      return false
    }

    Druzina.odstraniRevir(revir._id.toString())

    return true
  }

  static async updateRevir(
    id: string,
    ime: string,
    koordinate: number[][],
    druzina: string
  ): Promise<Revir | null> {
    const originalRevir = await RevirModel.findById(id)

    if (!originalRevir) {
      return null
    }

    Druzina.odstraniRevir(id)

    const updatedRevir = await RevirModel.findByIdAndUpdate(id, {
      ime,
      koordinate,
      druzina,
    })

    if (!updatedRevir) {
      return null
    }

    Druzina.dodajRevir(druzina, updatedRevir._id.toString())

    return new Revir(
      updatedRevir._id.toString(),
      updatedRevir.ime,
      updatedRevir.koordinate,
      updatedRevir.druzina.toString()
    )
  }
}
