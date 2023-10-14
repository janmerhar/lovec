import express from "express"

const dnevnik = express.Router()

import {
  getDnevnikPripravnik,
  patchSpremeniStatus,
  postDnevnikVnesi,
  getDnevnikPripravniki,
} from "@controllers/dnevnikController"

dnevnik.get("/pripravnik/:stran", getDnevnikPripravnik)
dnevnik.patch("/status", patchSpremeniStatus)
dnevnik.post("/dodaj", postDnevnikVnesi)
dnevnik.get("/mentor/:datum", getDnevnikPripravniki)

export default dnevnik
