const mongoose = require("mongoose")
const { Schema } = mongoose

const koordinataSchema = require("./koordinataSchema")

const vplenSchema = new Schema({
  uporabnik: { type: Schema.Types.ObjectId, ref: "Uporabnik", required: true },
  koordinate: [{ type: koordinataSchema, required: true }],
  zival: {
    type: String,
    required: true,
  },
  teza: { type: Number, required: true },
  datum: { type: Date, required: true },
  bolezni: {
    type: [String],
    required: false,
  },
})

module.exports = mongoose.model("Vplen", vplenSchema, "Vpleni")
