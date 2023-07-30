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

  // TODO
  // preveri s polnimi podatki
  // mogoce samo naredim, da ima vsaka opazovalnice ze dane danasnje podatke
  static async fetchOpazovalnice() {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Set the time to the start of the day

    const pipeline = [
      {
        $addFields: {
          obiski: {
            $filter: {
              input: "$obiski",
              cond: {
                $gte: ["$$this.zacetek", today],
              },
            },
          },
        },
      },
      {
        $addFields: {
          "obiski.konec": {
            $cond: {
              if: { $eq: [{ $size: "$obiski" }, 1] },
              then: "$$REMOVE", // If there's only one element, remove the 'konec' field
              else: "$obiski.konec",
            },
          },
        },
      },
      {
        $project: {
          koordinate: 1,
          obiski: 1,
        },
      },
    ]

    // Assuming 'Opazovalnica' is your model name
    const result = OpazovalnicaModel.aggregate(pipeline).exec()

    return result
  }

  async fetchObiski(datum) {}

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

    return result
  }
}
