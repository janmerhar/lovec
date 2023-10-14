import express from "express"

const revir = express.Router()

import { getRevirji } from "@controllers/revirController"

revir.get("/", getRevirji)

export default revir
