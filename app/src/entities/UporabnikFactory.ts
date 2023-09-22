import { AxiosInstance } from "axios"
import { APIResponse } from "@/types"

import { Uporabnik } from "./users/Uporabnik"
import { Admin } from "./users/Admin"
import { Lovec } from "./users/Lovec"
import { Pripravnik } from "./users/Pripravnik"

export class UporabnikFactory {
  private static createUporabnik(
    axiosInstance: AxiosInstance,
    uporabnikPodatki: any
  ): Uporabnik | null {
    const { role } = uporabnikPodatki

    if (role === "admin") {
      return new Admin(axiosInstance, uporabnikPodatki)
    }

    if (role === "lovec") {
      return new Lovec(axiosInstance, uporabnikPodatki)
    }

    if (role === "pripravnik") {
      return new Pripravnik(axiosInstance, uporabnikPodatki)
    }

    return null
  }

  static async login(
    axiosInstance: AxiosInstance,
    email: string,
    geslo: string
  ): Promise<APIResponse<Uporabnik | null>> {
    const uporabnik = await axiosInstance.post("/login", { email, geslo })

    uporabnik.data.data = UporabnikFactory.createUporabnik(
      axiosInstance,
      uporabnik.data.data
    )

    return uporabnik.data
  }
  // static async register(ime, priimek, slika, rojstniDatum, email, geslo, role, druzina = null, mentor = null, ) {}
  // static async fetchUporabnik(uporabnikId) {}
  // static async logout()
}
