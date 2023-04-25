const mongoose = require("mongoose")
const { Schema } = mongoose

const koordinataSchema = require("./koordinataSchema")

const opazovalnicaSchema = new Schema({
  koordinate: {
    type: koordinataSchema,
    required: true,
  },
  obiski: {
    type: [
      {
        uporabnik: {
          type: Schema.Types.ObjectId,
          ref: "Uporabnik",
          required: true,
        },
        zacetek: { type: Date, required: true },
        konec: { type: Date, required: false },
      },
    ],
    required: false,
  },
})

module.exports = mongoose.model(
  "Opazovalnica",
  opazovalnicaSchema,
  "Opazovalnice"
)
