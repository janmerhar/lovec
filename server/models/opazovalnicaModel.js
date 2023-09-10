const mongoose = require("mongoose")
const { Schema } = mongoose

const koordinataSchema = require("./koordinataSchema")

const opazovalnicaSchema = new Schema({
  // tebe bom naredil samo array dveh koordinat
  koordinate: {
    type: [Number],
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
