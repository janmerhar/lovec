const express = require("express")
const path = require("path")

const router = express.Router()

const druzinaController = require("../controllers/druzinaController")

router.get("/:id", druzinaController.getDruzina)
router.get("/:id/clani", druzinaController.getClani)

module.exports = router
