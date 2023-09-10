const mongoose = require("mongoose")
const { Schema } = mongoose

const dnevnik = new Schema({
  pripravnik: { type: Schema.Types.ObjectId, ref: "Uporabnik", required: true },
  mentor: { type: Schema.Types.ObjectId, ref: "Uporabnik", required: true },
  // Mentor lahko potrdi ali zavrne dnevnik, kar lahko vidi tudi uporabnik
  status: {
    type: String,
    enum: ["potrjen", "zavrnjen", "neobdelan"],
    required: true,
  },
  datum: { type: Date, required: true },
  ure: { type: Number, required: true },
  opis: { type: String, required: true },
  delo: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model("Dnevnik", dnevnik, "Dnevniki")
