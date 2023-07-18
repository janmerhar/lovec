const express = require("express")
const path = require("path")

const router = express.Router()

const uporabnikController = require("../controllers/uporabnikController")

router.get("/:id", uporabnikController.getUporabnik)
router.post("/login", uporabnikController.postLogin)
router.post("/register", uporabnikController.postRegister)
router.post("/refreshToken", uporabnikController.refreshToken)

module.exports = router
