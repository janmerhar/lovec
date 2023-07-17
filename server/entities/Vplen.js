const VplenModel = require("../models/vplen")
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
    ]

    const vpleni = await VplenModel.aggregate(pipeline)
      .sort({ _id: -1 })
      .skip((stran - 1) * STRAN_SIZE)
      .limit(STRAN_SIZE)

    return vpleni
  }
  // Prenesem vse uporabnikove vplene za določen datum
  static async fetchVpleniDatum(uporabnikId, datum) {}
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
