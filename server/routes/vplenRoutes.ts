import express from "express"

const vplen = express.Router()

import { getVplen, getVpleni, postVplen } from "@controllers/vplenController"

vplen.get("/:datum", getVplen)
vplen.get("/moji/:stran", getVpleni)
vplen.post("/dodaj", postVplen)

export default vplen
