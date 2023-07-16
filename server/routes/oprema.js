const express = require("express")
const path = require("path")

const router = express.Router()

const opremaController = require("../controllers/opremaController")

router.post("/dodaj", opremaController.postOprema)
router.delete("/izbrisi", opremaController.deleteOprema)
router.get("/uporabnik", opremaController.getOprema)

module.exports = router
