const mongoose = require("mongoose")
const { Schema } = mongoose

const druzinaSchema = new Schema({
  ime: { type: String, required: true },
  revirji: [{ type: Schema.Types.ObjectId, ref: "Revir", required: true }],
  clani: [{ type: Schema.Types.ObjectId, ref: "Uporabnik", required: false }],
})

module.exports = mongoose.model("Druzina", druzinaSchema, "Druzine")
