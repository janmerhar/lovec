const express = require("express")
const path = require("path")

const router = express.Router()

const revirController = require("../controllers/revirController")

router.get("/", revirController.getRevirji)

module.exports = router
