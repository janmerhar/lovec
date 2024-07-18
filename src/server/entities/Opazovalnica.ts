import OpazovalnicaModel from "@models/opazovalnicaModel"
import type { IOpazovalnica } from "@shared/types"

export default class Opazovalnica {
  id: string
  ime: string
  kapaciteta: number
  prespanje: boolean
  koordinate: number[]
  isDeleted: boolean

  constructor({
    _id,
    ime,
    kapaciteta,
    prespanje,
    koordinate,
    isDeleted,
  }: IOpazovalnica) {
    this.id = _id.toString()
    this.ime = ime
    this.kapaciteta = kapaciteta
    this.prespanje = prespanje
    this.koordinate = koordinate
    this.isDeleted = isDeleted
  }

  static async fetchOpazovalnica(id: string): Promise<Opazovalnica | null> {
    const result = await OpazovalnicaModel.findById(id)

    if (!result) {
      return null
    }

    return new Opazovalnica(result)
  }

  static async fetchOpazovalnice(isDeleted = false): Promise<Opazovalnica[]> {
    const result = await OpazovalnicaModel.find({ isDeleted })

    return result.map((opazovalnica) => {
      return new Opazovalnica(opazovalnica)
    })
  }
  static async fetchAllOpazovalnice(
    includeDeleted = false
  ): Promise<Opazovalnica[]> {
    let result = []

    if (includeDeleted) {
      result = await OpazovalnicaModel.find()
    } else {
      result = await OpazovalnicaModel.find({ isDeleted: false })
    }

    return result.map((opazovalnica) => {
      return new Opazovalnica(opazovalnica)
    })
  }

  static async addOpazovalnica(
    ime: string,
    kapaciteta: number,
    prespanje: boolean,
    koordinate: number[]
  ): Promise<Opazovalnica> {
    const result = await OpazovalnicaModel.create({
      ime,
      kapaciteta,
      prespanje,
      koordinate,
    })

    return new Opazovalnica(result)
  }

  static async updateOpazovalnica(
    id: string,
    ime: string,
    kapaciteta: number,
    prespanje: boolean,
    koordinate: number[]
  ): Promise<Opazovalnica | null> {
    const result = await OpazovalnicaModel.findByIdAndUpdate(
      id,
      {
        ime,
        kapaciteta,
        prespanje,
        koordinate,
      },
      { new: true }
    )

    if (!result) {
      return null
    }

    return new Opazovalnica(result)
  }

  static async deleteOpazovalnica(id: string): Promise<boolean> {
    const result = await OpazovalnicaModel.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      { new: true }
    )

    return !!result
  }
}
