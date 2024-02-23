import mongoose, { Schema, Document, Model } from "mongoose"
import type { IJaga } from "@shared/types"

const jagaSchema = new Schema<IJaga>({
  organizator: {
    type: Schema.Types.ObjectId,
    ref: "Uporabnik",
    required: true,
  },
  naziv: {
    type: String,
    required: true,
  },
  opis: {
    type: String,
    required: true,
  },
  udelezeni: [
    { type: Schema.Types.ObjectId, ref: "Uporabnik", required: true },
  ],
  maxUdelezeni: {
    type: Number,
    required: true,
  },
  lokacija: {
    type: [[Number]],
    required: true,
  },
  zacetek: {
    type: Date,
    required: true,
  },
})

const JagaModel: Model<IJaga> = mongoose.model("Jaga", jagaSchema, "Jage")

export default JagaModel
export type JagaDocument = IJaga & Document
