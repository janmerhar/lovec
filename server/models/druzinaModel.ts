import mongoose, { Schema, Document, Model } from "mongoose"

export interface IDruzina extends Document {
  ime: string
  revirji: Schema.Types.ObjectId[]
  clani: Schema.Types.ObjectId[]
}

const druzinaSchema = new Schema<IDruzina>({
  ime: {
    type: String,
    required: true,
  },
  revirji: [{ type: Schema.Types.ObjectId, ref: "Revir", required: true }],
  clani: [{ type: Schema.Types.ObjectId, ref: "Uporabnik", required: false }],
})

const DruzinaModel: Model<IDruzina> = mongoose.model(
  "Druzina",
  druzinaSchema,
  "Druzine"
)

export default DruzinaModel
