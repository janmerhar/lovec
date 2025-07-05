import VplenModel from "@models/vplenModel"
import { IUporabnikDetails, IVplenDetails } from "@shared/types"
import mongoose from "mongoose"
import { UporabnikDetails } from "./Uporabnik"

export class VplenDetails {
  datum: string
  zivali: string[]
  uporabnik: IUporabnikDetails

  constructor(
    datum: Date | string,
    zivali: string[],
    uporabnik: IUporabnikDetails
  ) {
    if (datum instanceof Date) {
      this.datum = datum.toISOString()
    } else {
      this.datum = datum
    }
    this.zivali = zivali
    this.uporabnik = uporabnik
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
        $lookup: {
          from: "Uporabniki", // ensure this is the correct collection name
          localField: "uporabnik",
          foreignField: "_id",
          as: "uporabnik",
        },
      },
      {
        $unwind: "$uporabnik", // this will flatten the uporabnik array
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$datum" } },
          zivali: { $push: "$zival" },
          uporabnik: { $first: "$uporabnik" }, // add this line
        },
      },
      {
        $project: {
          datum: "$_id",
          zivali: 1,
          "uporabnik._id": 1,
          "uporabnik.ime": 1,
          "uporabnik.priimek": 1,
          "uporabnik.slika": 1,
          "uporabnik.role": 1,
          _id: 0,
        },
      },
    ]

    const vpleni: IVplenDetails[] = await VplenModel.aggregate(pipeline)
      .sort({ datum: -1 })
      .skip((stran - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)

    return vpleni.map((vplen) => {
      return new VplenDetails(
        vplen.datum,
        vplen.zivali,
        // @ts-ignore
        new UporabnikDetails(
          // @ts-ignore
          vplen.uporabnik._id.toString(),
          // @ts-ignore
          vplen.uporabnik.ime,
          // @ts-ignore
          vplen.uporabnik.priimek,
          // @ts-ignore
          vplen.uporabnik.slika,
          // @ts-ignore
          vplen.uporabnik.role
        )
      )
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
    // TODO: popravi datum, da bo ob 00.00 na podan dan
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
