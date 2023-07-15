const express = require("express")
const path = require("path")

const router = express.Router()

const dnevnikController = require("../controllers/dnevnikController")

router.get("/:datum", dnevnikController.getDnevnikPripravniki)
router.patch("/status", dnevnikController.patchSpremeniStatus)
router.get("/:zacetek/:page", dnevnikController.getDnevnikPripravnik)
router.post("/dodaj", dnevnikController.postDnevnikVnesi)

module.exports = router
