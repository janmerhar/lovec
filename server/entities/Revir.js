const RevirModel = require("../models/revir")

module.exports = class Revir {
  constructor(id, ime, koordinate, druzina) {
    this.id = id
    this.ime = ime
    this.koordinate = koordinate
    this.druzina = druzina
  }

  static async fetchRevirji() {}
}
