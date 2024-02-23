import mongoose, { Schema, Document, Model } from "mongoose"
import type { IRevir } from "@shared/types"

const revirSchema = new Schema<IRevir>({
  ime: { type: String, required: true },
  koordinate: {
    type: [[Number]],
    required: true,
  },
  druzina: { type: Schema.Types.ObjectId, ref: "Druzina", required: true },
})

const RevirModel: Model<IRevir> = mongoose.model(
  "Revir",
  revirSchema,
  "Revirji"
)

export default RevirModel
export type RevirDocument = IRevir & Document
