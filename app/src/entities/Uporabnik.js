const { Request } = require("../util/Request")

export class Uporabnik extends Request {
  // mogoce tebi dam tudi konstruktor
  constructor({
    _id,
    ime,
    priimek,
    slika,
    rojstniDatum,
    email,
    role,
    token,
    druzina,
    mentor = null,
  }) {
    super()
    this.id = _id
    this.ime = ime
    this.priimek = priimek
    this.slika = slika
    this.rojstniDatum = rojstniDatum
    this.email = email
    this.role = role
    this.token = token
    this.druzina = druzina

    if (mentor) {
      this.mentor = mentor
    }
  }

}
