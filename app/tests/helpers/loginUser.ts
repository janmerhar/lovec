import { UporabnikFactory } from "@/entities/UporabnikFactory"
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
  const result = await UporabnikFactory.login(
    axiosInstance,
    uporabnikData.email,
    uporabnikData.geslo
  )

  if (result.data?.jwt.token === null) {
    return null
  }

  const token = result.data?.jwt.token
  const lovecInstance = axios.create(axiosInstance.defaults)

  lovecInstance.defaults.headers.Authorization = `Bearer ${token}`

  return lovecInstance
}
