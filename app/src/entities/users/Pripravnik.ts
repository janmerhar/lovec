import { AxiosInstance } from "axios"
import { RegularUporabnik } from "./RegularUporabnik"

export class Pripravnik extends RegularUporabnik {
  mentor: string | null

  constructor(
    axiosInstance: AxiosInstance,
    {
      _id,
      ime,
      priimek,
      slika,
      rojstniDatum,
      email,
      token,
      druzina,
      mentor,
    }: {
      _id: string
      ime: string
      priimek: string
      slika: string
      rojstniDatum: Date
      email: string
      token: string
      druzina: string | null
      mentor: string | null
    }
  ) {
    super(axiosInstance, {
      _id,
      ime,
      priimek,
      slika,
      rojstniDatum,
      email,
      token,
      druzina,
    })

    this.mentor = mentor ? mentor : null
  }
}
