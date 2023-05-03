const express = require("express")
const path = require("path")

const router = express.Router()

const pripravnikController = require("../controllers/pripravnikController")

router.get("/dnevniki/:datum", pripravnikController.getDnevnikPripravniki)
router.patch("/dnevniki/status", pripravnikController.patchSpremeniStatus)
router.get("/dnevnik/:zacetek/:page", pripravnikController.getDnevnikPripravnik)
router.post("/dodaj", pripravnikController.postDnevnikVnesi)

module.exports = router
