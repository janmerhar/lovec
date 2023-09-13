import { Uporabnik } from "@/entities/Uporabnik"
import { axiosInstance } from "../helpers/axiosInstance"
import axios from "axios"

const lovecData = {
  email: "lovec",
  geslo: "123",
}

const pripravnikData = {
  email: "pripravnik",
  geslo: "123",
}

const login = async (uporabnikData) => {
  const result = await Uporabnik.login(
    axiosInstance,
    uporabnikData.email,
    uporabnikData.geslo
  )

  const token = result.data.token
  const lovecInstance = axios.create(axiosInstance.defaults)

  lovecInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`

  return lovecInstance
}

export const loginLovec = await login(lovecData)
export const loginPripravnik = await login(pripravnikData)

// export loginAdmin
