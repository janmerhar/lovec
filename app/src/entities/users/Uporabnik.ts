import { AxiosInstance } from "axios"
import { JWT } from "../JWT"

export class Uporabnik {
  axiosInstance: AxiosInstance

  id: string
  ime: string
  priimek: string
  email: string
  jwt: JWT

  constructor(
    axiosInstance: AxiosInstance,
    {
      _id,
      ime,
      priimek,
      email,
      token,
    }: {
      _id: string
      ime: string
      priimek: string
      email: string
      token: string
    }
  ) {
    this.axiosInstance = axiosInstance

    this.id = _id
    this.ime = ime
    this.priimek = priimek
    this.email = email
    this.jwt = new JWT(axiosInstance, token)
  }
}
