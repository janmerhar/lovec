const express = require("express")
const path = require("path")

const router = express.Router()

const dnevnikController = require("../controllers/dnevnikController")

router.get("/dnevniki/:datum", dnevnikController.getDnevnikPripravniki)
router.patch("/dnevniki/status", dnevnikController.patchSpremeniStatus)
router.get("/dnevnik/:zacetek/:page", dnevnikController.getDnevnikPripravnik)
router.post("/dodaj", dnevnikController.postDnevnikVnesi)

module.exports = router
