const mongoose = require("mongoose")
const { Schema } = mongoose

const koordinataSchema = require("./koordinataSchema")

const revirSchema = new Schema({
  ime: { type: String, required: true },
  // Dodaj subtype koordinata in maybe tudi revir sam po sebi
  koordinate: [{ type: koordinataSchema, required: true }],
})

module.exports = mongoose.model("Revir", revirSchema, "Revirji")
