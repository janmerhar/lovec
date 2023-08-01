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
    ]).exec()

    return result
  }

  async fetchObiski(datum) {}

  // TODO naredi preverjanje, da opazovalnica ni ze zasedena
  static async rezervirajOpazovalnico(uporabnikId, id, zacetek, konec) {
    const dataToAppend = {
      uporabnik: uporabnikId,
      zacetek: zacetek,
      konec: konec,
    }

    const result = await OpazovalnicaModel.findByIdAndUpdate(
      id,
      { $push: { obiski: dataToAppend } },
      { new: true }
    )

    // TODO ne vracanje podatkov
    // return true
    return result
  }
}
