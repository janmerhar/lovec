import VplenModel from "@models/vplenModel"
import { IVplenDetails } from "@shared/types"
import mongoose from "mongoose"

export class VplenDetails {
  datum: string
  zivali: string[]

  constructor(datum: Date | string, zivali: string[]) {
    if (datum instanceof Date) {
      this.datum = datum.toISOString()
    } else {
      this.datum = datum
    }
    this.zivali = zivali
  }
}

export default class Vplen {
  id: string
  uporabnik: string
  koordinate: number[]
  zival: string
  teza: number
  datum: string
  bolezni: string[]

  constructor(
    id: string,
    uporabnikId: string,
    koordinate: number[],
    zival: string,
    teza: number,
    datum: Date | string,
    bolezni: string[]
  ) {
    this.id = id
    this.uporabnik = uporabnikId
    this.koordinate = koordinate
    this.zival = zival
    this.teza = teza

    if (datum instanceof Date) {
      this.datum = datum.toISOString()
    } else {
      this.datum = datum
    }

    this.bolezni = bolezni
  }

  static async fetchVpleni(
    uporabnikId: string,
    stran: number,
    PAGE_SIZE: number
  ): Promise<VplenDetails[]> {
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

    const vpleni: IVplenDetails[] = await VplenModel.aggregate(pipeline)
      .sort({ datum: -1 })
      .skip((stran - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)

    return vpleni.map((vplen) => {
      return new VplenDetails(vplen.datum, vplen.zivali)
    })
  }

  static async fetchVpleniDatum(
    uporabnikId: string,
    datum: string
  ): Promise<Vplen[]> {
    const vpleni = await VplenModel.find({
      uporabnik: uporabnikId,
      datum: datum,
    })

    return vpleni.map((vplenInstance) => {
      return new Vplen(
        vplenInstance._id.toString(),
        vplenInstance.uporabnik.toString(),
        vplenInstance.koordinate,
        vplenInstance.zival,
        vplenInstance.teza,
        vplenInstance.datum,
        vplenInstance.bolezni
      )
    })
  }

  static async vnesiVplen(
    uporabnikId: string,
    koordinate: number[],
    zival: string,
    teza: number,
    datum: string,
    bolezni: string[]
  ): Promise<Vplen> {
    const vplen = await VplenModel.create({
      uporabnik: uporabnikId,
      koordinate: koordinate,
      zival: zival,
      teza: teza,
      datum: datum,
      bolezni: bolezni,
    })

    return new Vplen(
      vplen._id.toString(),
      vplen.uporabnik.toString(),
      vplen.koordinate,
      vplen.zival,
      vplen.teza,
      vplen.datum,
      vplen.bolezni
    )
  }

  static async izbrisiVplen(
    uporabnikId: string,
    vplenId: string
  ): Promise<boolean> {
    const vplen = await VplenModel.findOneAndDelete({
      _id: vplenId,
      uporabnik: uporabnikId,
    })

    return vplen ? true : false
  }
}
