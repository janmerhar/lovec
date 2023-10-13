import mongoose, { Schema, Document, Model } from "mongoose"

export interface IRevir extends Document {
  ime: string
  koordinate: [number, number]
  druzina: Schema.Types.ObjectId
}

const revirSchema = new Schema<IRevir>({
  ime: { type: String, required: true },
  // Dodaj subtype koordinata in maybe tudi revir sam po sebi
  koordinate: {
    type: [Number],
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
