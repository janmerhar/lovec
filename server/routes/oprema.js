const express = require("express")
const path = require("path")

const router = express.Router()

const opremaController = require("../controllers/opremaController")

router.post("/dodaj", opremaController.postOprema)
router.delete("/zbrisi", opremaController.postOprema)
router.get("/:id", opremaController.getOprema)

module.exports = router
