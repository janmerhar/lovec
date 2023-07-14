const DruzinaModel = require("../models/druzina")

module.exports = class Druzina {
  constructor(id, ime, revirji, clani) {
    this.id = id
    this.ime = ime
    this.revirji = revirji
    this.clani = clani
  }

  // Vrni instanco druzine
  static async fetchDruzina(id) {}
  // Dobim imena vseh druzin
  static async fetchDruzine() {}
}
