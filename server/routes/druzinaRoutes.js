const express = require("express")
const path = require("path")

const router = express.Router()

const druzinaController = require("../controllers/druzinaController")

router.post("/dodaj", druzinaController.postDruzina)
router.get("/", druzinaController.getDruzine)

module.exports = router
