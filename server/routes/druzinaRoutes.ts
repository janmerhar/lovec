import express from "express"

const druzina = express.Router()

import { postDruzina, getDruzine } from "@controllers/druzinaController"

druzina.post("/dodaj", postDruzina)
druzina.get("/", getDruzine)

export default druzina
