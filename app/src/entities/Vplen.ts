import { AxiosInstance } from "axios"
import { APIResponse } from "@/types"

export class Vplen {
  axiosInstance: AxiosInstance

  id: string
  zival: string
  teza: number
  datum: Date
  bolezni: string[]
  // koordinate

  constructor(
    axiosInstance: AxiosInstance,
    {
      _id,
      zival,
      teza,
      datum,
      bolezni,
    }: {
      _id: string
      zival: string
      teza: number
      datum: Date | string
      bolezni: string[]
    }
  ) {
    this.axiosInstance = axiosInstance

    this.id = _id
    this.zival = zival
    this.teza = teza
    this.bolezni = bolezni

    if (typeof datum === "string") {
      this.datum = new Date(datum)
    } else {
      this.datum = datum
    }
  }

  static async insertVplen(
    axiosInstance,
    zival,
    teza,
    datum,
    bolezni
  ): Promise<APIResponse<Vplen>> {
    const result = await axiosInstance.post("/vpleni/dodaj", {
      zival,
      teza,
      datum,
      bolezni,
    })

    return result.data
  }

  static async fetchVpleni(
    axiosInstance,
    stran
  ): Promise<APIResponse<Vplen[]>> {
    const result = await axiosInstance.get(`/vpleni/moji/${stran}`)

    result.data.data = result.data.data.map((vplen) => {
      return {
        datum: vplen.datum,
        zivali: vplen.zivali
          .map(
            (zival) =>
              zival.charAt(0).toUpperCase() + zival.slice(1).toLowerCase()
          )
          .sort(),
      }
    })

    return result.data
  }

  static async fetchVplen(axiosInstance, datum): Promise<APIResponse<Vplen[]>> {
    const result = await axiosInstance.get(`/vpleni/${datum}`)

    result.data.data = result.data.data.map(
      (vplen) => new Vplen(axiosInstance, vplen)
    )

    return result.data
  }
}
