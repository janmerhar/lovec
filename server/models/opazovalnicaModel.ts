import mongoose, { Schema, Document, Model } from "mongoose"
import type { IOpazovalnica } from "@shared/types"

const opazovalnicaSchema = new Schema<IOpazovalnica>({
  ime: {
    type: String,
    required: true,
  },
  kapaciteta: {
    type: Number,
    required: true,
  },
  prespanje: {
    type: Boolean,
    required: true,
  },
  koordinate: {
    type: [[Number]],
    required: true,
  },
})

const OpazovalnicaModel: Model<IOpazovalnica> = mongoose.model(
  "Opazovalnica",
  opazovalnicaSchema,
  "Opazovalnice"
)

export default OpazovalnicaModel
export type OpazovalnicaDocument = IOpazovalnica & Document
