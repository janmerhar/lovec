import { AxiosInstance } from "axios"
import { RegularUporabnik } from "./RegularUporabnik"
import { UporabnikDetails } from "@/types"

export class Pripravnik extends RegularUporabnik {
  mentor: UporabnikDetails | null

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
      // TODO mentor naj bo podan s strani backend-a
      mentor: UporabnikDetails | null
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
