const VplenModel = require("../models/vplenModel")
const mongoose = require("mongoose")

module.exports = class Vplen {
  constructor(id, uporabnikId, zival, teza, datum, bolezni) {
    this.id = id
    this.uporabnik = uporabnikId
    this.zival = zival
    this.teza = teza
    this.datum = datum
    this.bolezni = bolezni
  }

  // Prenasam samo po delih
  static async fetchVpleni(uporabnikId, stran) {
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

  // Prenesem vse uporabnikove vplene za določen datum
  static async fetchVpleniDatum(uporabnikId, datum) {
    const vpleni = await VplenModel.find({
      uporabnik: uporabnikId,
      datum: datum,
    })

    return vpleni
  }

  static async vnesiVplen(uporabnikId, zival, teza, datum, bolezni) {
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
