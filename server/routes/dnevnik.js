const express = require("express")

const router = express.Router()

const dnevnikController = require("../controllers/dnevnikController")

router.get("/pripravnik/:stran", dnevnikController.getDnevnikPripravnik)
router.patch("/status", dnevnikController.patchSpremeniStatus)
router.post("/dodaj", dnevnikController.postDnevnikVnesi)
router.get("/mentor/:datum", dnevnikController.getDnevnikPripravniki)

module.exports = router
