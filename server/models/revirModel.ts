import mongoose, { Schema, Document, Model } from "mongoose"
import { IDruzina } from "./druzinaModel"

export interface IRevir extends Document {
  ime: string
  koordinate: [number, number]
  druzina: Schema.Types.ObjectId | IDruzina
}

const revirSchema = new Schema<IRevir>({
  ime: { type: String, required: true },
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
