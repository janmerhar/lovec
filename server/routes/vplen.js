const express = require("express")
const path = require("path")

const router = express.Router()

const vplenController = require("../controllers/vplenController")

router.get("/:id", vplenController.getVplen)
router.get("/moji/:stran", vplenController.getVpleni)
router.post("/dodaj", vplenController.postVplen)

module.exports = router
