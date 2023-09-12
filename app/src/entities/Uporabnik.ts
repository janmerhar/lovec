import { AxiosInstance } from "axios"
import { APIResponse } from "@/types"

export class Uporabnik {
  axiosInstance: AxiosInstance

  id: string
  ime: string
  priimek: string
  slika: string
  rojstniDatum: Date
  email: string
  role: string
  token: string
  // TODO
  // tebe mogoce celo zavrzem
  druzina: string | null | undefined
  // mogoce dodam
  // mentor
  // pripravniki

  constructor(
    axiosInstance: AxiosInstance,
    { _id, ime, priimek, slika, rojstniDatum, email, role, token, druzina }
  ) {
    this.axiosInstance = axiosInstance

    this.id = _id
    this.ime = ime
    this.priimek = priimek
    this.slika = slika
    this.rojstniDatum = rojstniDatum
    this.email = email
    this.role = role
    this.token = token
    this.druzina = druzina ? druzina : null
  }

  static async login(
    axiosInstance: AxiosInstance,
    email: string,
    geslo: string
  ): Promise<APIResponse<Uporabnik>> {
    const uporabnik = await axiosInstance.post("/login", { email, geslo })

    uporabnik.data.data = new Uporabnik(axiosInstance, uporabnik.data.data)

    return uporabnik.data
  }

  // static async register(ime, priimek, slika, rojstniDatum, email, geslo, role, druzina = null, mentor = null, ) {}

  // static async fetchUporabnik(uporabnikId) {}
}
