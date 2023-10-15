import mongoose, { Schema, Document, Model, ObjectId } from "mongoose"
import { IOpazovalnica } from "@shared/types"

const opazovalnicaSchema = new Schema<IOpazovalnica>({
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

const OpazovalnicaModel: Model<IOpazovalnica> = mongoose.model(
  "Opazovalnica",
  opazovalnicaSchema,
  "Opazovalnice"
)

export default OpazovalnicaModel
export type OpazovalnicaDocument = IOpazovalnica & Document
