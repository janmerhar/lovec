import mongoose, { Schema, Document, Model, ObjectId } from "mongoose"
import type { IDnevnik } from "@shared/types"
import { deloDomain } from "@shared/types"

const dnevnik = new Schema<IDnevnik>({
  pripravnik: { type: Schema.Types.ObjectId, ref: "Uporabnik", required: true },
  mentor: { type: Schema.Types.ObjectId, ref: "Uporabnik", required: true },
  // Mentor lahko potrdi ali zavrne dnevnik, kar lahko vidi tudi uporabnik
  status: {
    type: String,
    enum: ["potrjen", "zavrnjen", "neobdelan"],
    required: true,
  },
  datum: { type: Date, required: true },
  ure: { type: Number, required: true },
  opis: { type: String, required: true },
  delo: {
    type: String,
    enum: deloDomain,
    required: true,
  },
})

const DnevnikModel: Model<IDnevnik> = mongoose.model(
  "Dnevnik",
  dnevnik,
  "Dnevniki"
)

export default DnevnikModel
export type DnevnikDocument = IDnevnik & Document
