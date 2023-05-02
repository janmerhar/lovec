const express = require("express")
const path = require("path")

const router = express.Router()

const opremaController = require("../controllers/opremaController")

router.post("/dodaj", opremaController.postOpremaAdd)
router.get("/:datum", opremaController.getOpremaDate)
router.get("/:zacetek/:konec", opremaController.getOpremaRange)

module.exports = router
