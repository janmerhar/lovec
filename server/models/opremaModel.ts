import mongoose, { Schema, Document, ObjectId } from "mongoose"
import { IOprema } from "@shared/types"

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
export type OpremaDocument = IOprema & Document
