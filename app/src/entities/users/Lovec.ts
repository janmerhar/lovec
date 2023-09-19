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
