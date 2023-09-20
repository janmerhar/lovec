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
      // TODO
      // vas mogoce preimenujem v pripravnikiId
      // ter dodam getter za pripravniki user type
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
    if (typeof rojstniDatum === "string") {
      rojstniDatum = new Date(rojstniDatum)
    }

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
