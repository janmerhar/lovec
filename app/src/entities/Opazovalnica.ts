import { AxiosInstance } from "axios"
import { APIResponse } from "@/types"

export class Opazovalnica {
  axiosInstance: AxiosInstance

  id: string
  koordinate: number[]
  obiski: any[]

  constructor(axiosInstance: AxiosInstance, { _id, koordinate, obiski }) {
    this.axiosInstance = axiosInstance

    this.id = _id
    this.koordinate = koordinate
    this.obiski = obiski
  }

  static async fetchOpazovalnice(
    axiosInstance: AxiosInstance
  ): Promise<APIResponse<Opazovalnica[]>> {
    const opazovalnice = await axiosInstance.get("/opazovalnice")

    opazovalnice.data.data = opazovalnice.data.data.map(
      (opazovalnica: any) => new Opazovalnica(axiosInstance, opazovalnica)
    )

    return opazovalnice.data
  }

  static async fetchOpazovalnica(
    axiosInstance: AxiosInstance,
    id: string
  ): Promise<APIResponse<Opazovalnica>> {
    const opazovalnica = await axiosInstance.get(`/opazovalnice/${id}`)

    opazovalnica.data.data = new Opazovalnica(
      axiosInstance,
      opazovalnica.data.data
    )

    return opazovalnica.data
  }

  async rezervirajOpazovalnico(
    zacetek: Date | string,
    konec: Date | string
  ): Promise<APIResponse<any>> {
    const rezervacija = await this.axiosInstance.post(
      `/opazovalnice/${this.id}/rezerviraj`,
      {
        zacetek,
        konec,
      }
    )

    return rezervacija.data
  }
}
