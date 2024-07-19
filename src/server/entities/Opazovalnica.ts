import OpazovalnicaModel from "@models/opazovalnicaModel"
import type { IOpazovalnica } from "@shared/types"

export default class Opazovalnica {
  id: string
  ime: string
  kapaciteta: number
  prespanje: boolean
  koordinate: number[]
  isDeleted: boolean
  zasedenost?: number

  constructor({
    _id,
    ime,
    kapaciteta,
    prespanje,
    koordinate,
    isDeleted,
    zasedenost,
  }: IOpazovalnica) {
    this.id = _id.toString()
    this.ime = ime
    this.kapaciteta = kapaciteta
    this.prespanje = prespanje
    this.koordinate = koordinate
    this.isDeleted = isDeleted

    if (Number.isInteger(zasedenost)) {
      this.zasedenost = zasedenost
    }
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
    const zacetek = new Date(new Date().toISOString())
    zacetek.setHours(0, 0, 0, 0)

    const konec = new Date()
    konec.setDate(konec.getDate() + 1)

    let matchCase: { isDeleted?: boolean } = {
      isDeleted: false,
    }

    if (includeDeleted) {
      matchCase = {}
    }

    const result = await OpazovalnicaModel.aggregate([
      {
        $match: matchCase,
      },
      {
        $lookup: {
          from: "Obiski",
          let: { opazovalnicaId: "$_id" },
          localField: "_id",
          foreignField: "opazovalnica",
          as: "obiskiData",
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$opazovalnica", "$$opazovalnicaId"] },
                    { $gte: ["$zacetek", zacetek] },
                    { $lt: ["$zacetek", konec] },
                    { $eq: ["$isDeleted", false] },
                  ],
                },
              },
            },
          ],
        },
      },
      {
        $addFields: {
          zasedenost: { $size: "$obiskiData" },
        },
      },
      {
        $project: {
          _id: 1,
          ime: 1,
          kapaciteta: 1,
          prespanje: 1,
          koordinate: 1,
          isDeleted: 1,
          zasedenost: 1,
        },
      },
    ])

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
