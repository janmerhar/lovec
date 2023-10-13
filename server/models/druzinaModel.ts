import mongoose, { Schema, Document, Model } from "mongoose"

import { IRevir } from "./revirModel"
import { IUporabnikDetails } from "./uporabnikModel"

export interface IDruzina extends Document {
  ime: string
  revirji: Schema.Types.ObjectId[] | IRevir[]
  clani: Schema.Types.ObjectId[] | IUporabnikDetails[]
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
