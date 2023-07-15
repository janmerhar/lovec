const express = require("express")

const router = express.Router()

const dnevnikController = require("../controllers/dnevnikController")

router.get("/:stran", dnevnikController.getDnevnikPripravniki)
router.patch("/status", dnevnikController.patchSpremeniStatus)
router.get("/:zacetek/:page", dnevnikController.getDnevnikPripravnik)
router.post("/dodaj", dnevnikController.postDnevnikVnesi)

module.exports = router
