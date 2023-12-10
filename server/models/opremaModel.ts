import mongoose, { Schema, Document } from "mongoose"
import type { IOprema } from "@shared/types"
import { opremaTipDomain } from "@shared/types"

const opremaSchema = new Schema<IOprema>({
  lastnik: { type: Schema.Types.ObjectId, ref: "Uporabnik", required: false },
  naziv: { type: String, required: true },
  tip: { type: String, enum: opremaTipDomain, required: true },
  stanje: { type: String, required: true },
  datum: { type: Date, default: Date.now },
})

const OpremaModel = mongoose.model<IOprema>("Oprema", opremaSchema, "Oprema")

export default OpremaModel
export type OpremaDocument = IOprema & Document
