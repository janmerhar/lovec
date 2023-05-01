const express = require("express")
const path = require("path")

const router = express.Router()

const authController = require("../controllers/authController")

router.post("/login", authController.postLogin)
router.post("/register", authController.postRegister)

module.exports = router
