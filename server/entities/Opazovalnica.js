const OpazovalnicaModel = require("../models/opazovalnica")

module.exports = class Opazovalnica {
  constructor(id, koordinate, obiski) {
    this.id = id
    this.koordinate = koordinate
    this.obiski = obiski
  }

  static async fetchOpazovalnica(id) {}
  static async fetchOpazovalnice() {}
  static async fetchObiski(id, datum) {}
}
