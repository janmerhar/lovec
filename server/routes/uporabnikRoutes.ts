import express from "express"

const uporabnik = express.Router()

import {
  getUporabnik,
  postLogin,
  postRegister,
  refreshToken,
  logout,
} from "@controllers/uporabnikController"

uporabnik.get("/:id", getUporabnik)
uporabnik.post("/login", postLogin)
uporabnik.post("/register", postRegister)
uporabnik.post("/refreshToken", refreshToken)
uporabnik.get("/logout", logout)

export default uporabnik
