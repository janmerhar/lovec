import mongoose, { Schema, Document } from "mongoose"
import { IUporabnikDetails } from "./uporabnikModel"

export interface IOprema extends Document {
  lastnik: Schema.Types.ObjectId | IUporabnikDetails
  naziv: string
  tip: string
  stanje: string
  datum: Date
}

const opremaSchema = new Schema<IOprema>({
  lastnik: { type: Schema.Types.ObjectId, ref: "Uporabnik", required: false },
  naziv: { type: String, required: true },
  tip: { type: String, required: true },
  stanje: { type: String, required: true },
  // set the field `datum` to current date (time)
  datum: { type: Date, default: Date.now },
})

const OpremaModel = mongoose.model<IOprema>("Oprema", opremaSchema, "Oprema")

export default OpremaModel
