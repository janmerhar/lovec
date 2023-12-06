import express from "express"

const oprema = express.Router()

import {
  postOprema,
  deleteOprema,
  getOprema,
} from "@controllers/opremaController"

oprema.post("/dodaj", postOprema)
oprema.delete("/izbrisi", deleteOprema)
oprema.get("/uporabnik", getOprema)

export default oprema
