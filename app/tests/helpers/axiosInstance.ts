import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://localhost:1234",
  headers: {
    "Content-Type": "application/json",
    Authorization: "",
  },
})

export axiosInstance
