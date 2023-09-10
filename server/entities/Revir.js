const RevirModel = require("../models/revirModel")

module.exports = class Revir {
  constructor(id, ime, koordinate, druzina) {
    this.id = id
    this.ime = ime
    this.koordinate = koordinate
    this.druzina = druzina
  }

  static async fetchRevirji() {
    const revirji = await RevirModel.find().populate({
      path: "druzina",
      select: "_id ime",
    })

    return revirji
  }
}
