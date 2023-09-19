import { AxiosInstance } from "axios"
import { Uporabnik } from "./Uporabnik"

export class RegularUporabnik extends Uporabnik {
  slika: string
  rojstniDatum: Date
  druzina: string | null

  constructor(
    axioInstance: AxiosInstance,
    {
      _id,
      ime,
      priimek,
      slika,
      rojstniDatum,
      email,
      token,
      druzina,
    }: {
      _id: string
      ime: string
      priimek: string
      slika: string
      rojstniDatum: Date
      email: string
      token: string
      druzina: string | null
    }
  ) {
    super(axioInstance, { _id, ime, priimek, email, token })

    this.slika = slika
    this.rojstniDatum = rojstniDatum
    this.druzina = druzina ? druzina : null
  }
}
