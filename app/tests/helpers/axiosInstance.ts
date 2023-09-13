import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "http://localhost:1234",
  headers: {
    "Content-Type": "application/json",
    Authorization: "",
  },
})
