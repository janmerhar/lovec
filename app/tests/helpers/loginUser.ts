import { Uporabnik } from "@/entities/Uporabnik"
import { axiosInstance } from "../helpers/axiosInstance"
import axios from "axios"

export const lovecData = {
  email: "lovec",
  geslo: "123",
}

export const pripravnikData = {
  email: "pripravnik",
  geslo: "123",
}

export const login = async (uporabnikData) => {
  const result = await Uporabnik.login(
    axiosInstance,
    uporabnikData.email,
    uporabnikData.geslo
  )

  const token = result.data.token
  const lovecInstance = axios.create(axiosInstance.defaults)

  lovecInstance.defaults.headers.Authorization = `Bearer ${token}`

  return lovecInstance
}
