import express from "express"

const opazovalnica = express.Router()

import {
  getOpazovalnica,
  getOpazovalnice,
  getObiski,
  postRezerviraj,
} from "@controllers/opazovalnicaController"

opazovalnica.get("/:id", getOpazovalnica)
opazovalnica.get("/", getOpazovalnice)
opazovalnica.get("/:id/obiski/:datum", getObiski)
opazovalnica.post("/:id/rezerviraj", postRezerviraj)

export default opazovalnica
