import express from "express"

const sistemskeSpremenljivke = express.Router()

import {
  getSistemskeSpremenljivke,
  postSistemskeSpremenljivke,
} from "@controllers/sistemskeSpremenljivkeController"

sistemskeSpremenljivke.get("/", getSistemskeSpremenljivke)
sistemskeSpremenljivke.post("/", postSistemskeSpremenljivke)

export default sistemskeSpremenljivke
