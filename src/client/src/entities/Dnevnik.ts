import { AxiosInstance } from "axios"
import { APIResponse } from "@/types"

export class Dnevnik {
  axiosInstance: AxiosInstance

  id: string
  pripravnik: any
  mentorId: string
  status: string
  datum: Date
  delo: string
  ure: number
  opis: string

  constructor(
    axiosInstance: AxiosInstance,
    {
      _id,
      pripravnik,
      mentorId,
      status,
      datum,
      delo,
      ure,
      opis,
    }: {
      _id: string
      pripravnik: string
      mentorId: string
      status: string
      datum: Date | string
      delo: string
      ure: number
      opis: string
    }
  ) {
    this.axiosInstance = axiosInstance

    this.id = _id
    this.pripravnik = pripravnik
    this.mentorId = mentorId
    this.status = status
    this.delo = delo
    this.ure = ure
    this.opis = opis

    if (typeof datum === "string") {
      this.datum = new Date(datum)
    } else {
      this.datum = datum
    }
  }

  async spremeniStatus(status: string): Promise<boolean> {
    await this.axiosInstance.patch(`/dnevniki/status`, {
      dnevnikId: this.id,
      status,
    })

    return true
  }

  //
  // Mentor
  //

  static async fetchDnevnikiMentor(
    axiosInstance: AxiosInstance,
    datum: string
  ): Promise<APIResponse<Dnevnik[]>> {
    const dnevniki = await axiosInstance.get(`/dnevniki/mentor/${datum}`)

    dnevniki.data.data = dnevniki.data.data.map(
      (dnevnik: any) => new Dnevnik(axiosInstance, dnevnik)
    )

    return dnevniki.data
  }

  //
  // Pripravnik
  //

  static async fetchDnevnikiPripravnik(
    axiosInstance: AxiosInstance,
    stran: number
  ): Promise<APIResponse<Dnevnik[]>> {
    const dnevniki = await axiosInstance.get(`/dnevniki/pripravnik/${stran}`)

    dnevniki.data.data = dnevniki.data.data.map(
      (dnevnik: any) => new Dnevnik(axiosInstance, dnevnik)
    )

    return dnevniki.data
  }

  static async insertDnevnik(
    axiosInstance: AxiosInstance,
    datum: Date | string,
    ure: number,
    opis: string,
    delo: string
  ): Promise<APIResponse<Dnevnik>> {
    const dnevnik = await axiosInstance.post("/dnevniki/dodaj", {
      datum,
      ure,
      opis,
      delo,
    })

    dnevnik.data.data = new Dnevnik(axiosInstance, dnevnik.data.data)

    return dnevnik.data
  }
}
