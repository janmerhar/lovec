import VplenModel from "@models/vplenModel"
import { IVplen, IVplenDetails } from "@shared/types"
import mongoose from "mongoose"

export default class Vplen {
  id: string
  uporabnik: string
  zival: string
  teza: number
  datum: string
  bolezni: string[]

  constructor(
    id: string,
    uporabnikId: string,
    zival: string,
    teza: number,
    datum: string,
    bolezni: string[]
  ) {
    this.id = id
    this.uporabnik = uporabnikId
    this.zival = zival
    this.teza = teza
    this.datum = datum
    this.bolezni = bolezni
  }

  static async fetchVpleni(
    uporabnikId: string,
    stran: number
  ): Promise<IVplenDetails[]> {
    const STRAN_SIZE = 10

    const pipeline = [
      {
        $match: {
          uporabnik: new mongoose.Types.ObjectId(uporabnikId),
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$datum" } },
          zivali: { $push: "$zival" },
        },
      },
      {
        $project: {
          datum: "$_id",
          zivali: 1,
          _id: 0,
        },
      },
    ]

    const vpleni = await VplenModel.aggregate(pipeline)
      .sort({ datum: -1 })
      .skip((stran - 1) * STRAN_SIZE)
      .limit(STRAN_SIZE)

    return vpleni
  }

  static async fetchVpleniDatum(
    uporabnikId: string,
    datum: string
  ): Promise<IVplen[]> {
    const vpleni = await VplenModel.find({
      uporabnik: uporabnikId,
      datum: datum,
    })

    return vpleni
  }

  static async vnesiVplen(
    uporabnikId: string,
    zival: string,
    teza: number,
    datum: string,
    bolezni: string[]
  ): Promise<IVplen> {
    const vplen = await VplenModel.create({
      uporabnik: uporabnikId,
      zival: zival,
      teza: teza,
      datum: datum,
      bolezni: bolezni,
    })

    return vplen
  }
}
