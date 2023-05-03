const express = require("express")
const path = require("path")

const router = express.Router()

const uporabnikController = require("../controllers/uporabnikController")

router.get("/", uporabnikController.getUporabnik)

module.exports = router
