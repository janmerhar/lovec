import OpazovalnicaModel from "@models/opazovalnicaModel"
import type { IOpazovalnica } from "@shared/types"

export default class Opazovalnica {
  id: string
  ime: string
  kapaciteta: number
  prespanje: boolean
  koordinate: number[]

  constructor(
    id: string,
    ime: string,
    kapaciteta: number,
    prespanje: boolean,
    koordinate: number[]
  ) {
    this.id = id
    this.ime = ime
    this.kapaciteta = kapaciteta
    this.prespanje = prespanje
    this.koordinate = koordinate
  }

  static async fetchOpazovalnica(id: string): Promise<Opazovalnica | null> {
    const result = await OpazovalnicaModel.findById(id)

    if (!result) {
      return null
    }

    return new Opazovalnica(
      result._id.toString(),
      result.ime,
      result.kapaciteta,
      result.prespanje,
      result.koordinate
    )
  }

  static async fetchOpazovalnice(): Promise<Opazovalnica[]> {
    const result = await OpazovalnicaModel.find()

    return result.map((opazovalnica) => {
      return new Opazovalnica(
        opazovalnica._id.toString(),
        opazovalnica.ime,
        opazovalnica.kapaciteta,
        opazovalnica.prespanje,
        opazovalnica.koordinate
      )
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

    return new Opazovalnica(
      result._id.toString(),
      result.ime,
      result.kapaciteta,
      result.prespanje,
      result.koordinate
    )
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

    return new Opazovalnica(
      result._id.toString(),
      result.ime,
      result.kapaciteta,
      result.prespanje,
      result.koordinate
    )
  }

  static async deleteOpazovalnica(id: string): Promise<boolean> {
    const result = await OpazovalnicaModel.findByIdAndDelete(id)

    return !!result
  }
}
