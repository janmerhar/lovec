import { Uporabnik } from "./Uporabnik"
import { AxiosInstance } from "axios"

export class Admin extends Uporabnik {
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
    super(axiosInstance, { _id, ime, priimek, email, token })
  }
}
