const express = require("express")
const path = require("path")

const router = express.Router()

const opazovalnicaController = require("../controllers/opazovalnicaController")

router.get("/:id", opazovalnicaController.getOpazovalnica)
router.get("/", opazovalnicaController.getOpazovalnice)
router.get("/:id/obiski/:datum", opazovalnicaController.getObiski)
router.post("/:id/rezerviraj", opazovalnicaController.postRezerviraj)

module.exports = router
