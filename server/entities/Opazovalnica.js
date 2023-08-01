const OpazovalnicaModel = require("../models/opazovalnica")

module.exports = class Opazovalnica {
  constructor(id, koordinate, obiski) {
    this.id = id
    this.koordinate = koordinate
    this.obiski = obiski
  }

  static async fetchOpazovalnica(id) {
    const opazovalnica = await OpazovalnicaModel.findById(id)
    console.log(opazovalnica)
    // return opazovalnica
  }

  static async fetchOpazovalnice() {
    const today = new Date()
    const timezoneOffset = -2

    today.setUTCHours(today.getUTCHours() + timezoneOffset)

    today.setUTCHours(0, 0, 0, 0)

    const result = await OpazovalnicaModel.aggregate([
      {
        $addFields: {
          obiski: {
            $filter: {
              input: "$obiski",
              as: "obisk",
              cond: {
                $eq: [
                  {
                    $dateToString: {
                      format: "%Y-%m-%d",
                      date: "$$obisk.zacetek",
                    },
                  },
                  { $dateToString: { format: "%Y-%m-%d", date: today } },
                ],
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "Uporabniki",
          localField: "obiski.uporabnik",
          foreignField: "_id",
          as: "obiski.uporabnik",
        },
      },
      {
        $project: {
          _id: 1,
          koordinate: 1,
          obiski: {
            uporabnik: {
              _id: 1,
              ime: 1,
              priimek: 1,
            },
            zacetek: 1,
            konec: 1,
          },
        },
      },
    ]).exec()

    return result
  }

  async fetchObiski(datum) {}

  static async rezervirajOpazovalnico(uporabnikId, id, zacetek, konec) {
    const timezoneOffset = 2

    const adjustedZacetek = new Date(zacetek)
    adjustedZacetek.setUTCHours(adjustedZacetek.getUTCHours() + timezoneOffset)

    const adjustedKonec = new Date(konec)
    adjustedKonec.setUTCHours(adjustedKonec.getUTCHours() + timezoneOffset)

    const existingDocument = await OpazovalnicaModel.findById(id)

    const dataToAppend = {
      uporabnik: uporabnikId,
      zacetek: adjustedZacetek,
      konec: adjustedKonec,
    }

    const hasOverlap = existingDocument.obiski.some(
      (obisk) =>
        obisk.zacetek <= dataToAppend.konec &&
        obisk.konec >= dataToAppend.zacetek
    )

    if (hasOverlap) {
      throw new Error("Overlap detected with existing time blocks.")
    }

    const result = await OpazovalnicaModel.findByIdAndUpdate(
      id,
      { $push: { obiski: dataToAppend } },
      { new: true }
    )

    // TODO Handle the result or return it as needed
    return result
  }
}
