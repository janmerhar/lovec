import mongoose, { Schema, Document, Model } from "mongoose"
import type { IOpazovalnica, IIsDeleted } from "@shared/types"

const opazovalnicaSchema = new Schema<IOpazovalnica & IIsDeleted>({
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
    type: [Number],
    required: true,
  },
  // Polje za izbris opazovalnice
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

const OpazovalnicaModel: Model<IOpazovalnica & IIsDeleted> = mongoose.model(
  "Opazovalnica",
  opazovalnicaSchema,
  "Opazovalnice"
)

export default OpazovalnicaModel
export type OpazovalnicaDocument = IOpazovalnica & Document
