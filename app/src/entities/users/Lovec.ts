import { AxiosInstance } from "axios"
import { RegularUporabnik } from "./RegularUporabnik"

export class Lovec extends RegularUporabnik {
  pripravniki: string[] | null

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
      pripravniki,
    }: {
      _id: string
      ime: string
      priimek: string
      slika: string
      rojstniDatum: Date | string
      email: string
      token: string
      druzina: string | null
      pripravniki: string[] | null
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

    this.pripravniki = pripravniki ? pripravniki : null
  }
}
