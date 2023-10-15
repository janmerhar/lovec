import mongoose, { Schema, Document, Model, ObjectId } from "mongoose"
import { IDruzina } from "@shared/types"

const druzinaSchema = new Schema<IDruzina>({
  ime: {
    type: String,
    required: true,
  },
  revirji: [{ type: Schema.Types.ObjectId, ref: "Revir", required: true }],
  clani: [{ type: Schema.Types.ObjectId, ref: "Uporabnik", required: true }],
})

const DruzinaModel = mongoose.model("Druzina", druzinaSchema, "Druzine")

export default DruzinaModel
export type DruzinaDocument = IDruzina & Document
