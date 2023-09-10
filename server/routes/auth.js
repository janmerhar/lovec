const express = require("express")
const path = require("path")

const router = express.Router()

const uporabnikController = require("../controllers/uporabnikController")

router.post("/login", uporabnikController.postLogin)
router.post("/register", uporabnikController.postRegister)

module.exports = router
