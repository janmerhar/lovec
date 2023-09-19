import { AxiosInstance } from "axios"
import { APIResponse } from "@/types"

export class Oprema {
  axiosInstance: AxiosInstance

  id: string
  naziv: string
  tip: string
  stanje: string
  datum: Date

  constructor(
    axiosInstance: AxiosInstance,
    {
      _id,
      naziv,
      tip,
      stanje,
      datum,
    }: {
      _id: string
      naziv: string
      tip: string
      stanje: string
      datum: Date | string
    }
  ) {
    this.axiosInstance = axiosInstance

    this.id = _id
    this.naziv = naziv
    this.tip = tip
    this.stanje = stanje

    if (typeof datum === "string") {
      this.datum = new Date(datum)
    } else {
      this.datum = datum
    }
  }

  static async fetchOprema(
    axiosInstance: AxiosInstance
  ): Promise<APIResponse<Oprema[]>> {
    const result = await axiosInstance.get("/oprema/uporabnik")

    result.data.data = result.data.data.map(
      (oprema: any) => new Oprema(axiosInstance, oprema)
    )

    return result.data
  }

  static async insertOprema(
    axiosInstance: AxiosInstance,
    naziv: string,
    tip: string,
    stanje: string
  ): Promise<APIResponse<Oprema>> {
    const result = await axiosInstance.post("/oprema/dodaj", {
      naziv,
      tip,
      stanje,
    })

    result.data.data = new Oprema(axiosInstance, result.data.data)

    return result.data
  }

  async izbrisiOprema(): Promise<APIResponse<any>> {
    const result = await this.axiosInstance.delete("/oprema/izbrisi", {
      data: {
        id: this.id,
      },
    })

    return result.data
  }
}
