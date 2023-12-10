import express from "express"
import { authUser } from "middleware/authUser"

const sistemskeSpremenljivke = express.Router()

import {
  getSistemskeSpremenljivke,
  postSistemskeSpremenljivke,
} from "@controllers/sistemskeSpremenljivkeController"

sistemskeSpremenljivke.get(
  "/",
  authUser("admin", "lovec"),
  getSistemskeSpremenljivke
)
sistemskeSpremenljivke.post("/", authUser("admin"), postSistemskeSpremenljivke)

export default sistemskeSpremenljivke
