const mongoose = require("mongoose")
const { Schema } = mongoose

const opremaSchema = new Schema({
  lastnik: { type: Schema.Types.ObjectId, ref: "Uporabnik", required: false },
  naziv: [{ type: String, required: true }],
  tip: { type: String, required: true },
  stanje: { type: String, required: true },
  // set the field `datum` to current date (time)
  datum: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Oprema", opremaSchema, "Oprema")
