import mongoose, { Schema, Document, Model } from "mongoose"

export interface IDnevnik extends Document {
  pripravnik: Schema.Types.ObjectId
  mentor: Schema.Types.ObjectId
  status: string
  datum: Date
  ure: number
  opis: string
  delo: string
}

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
    required: true,
  },
})

const DnevnikModel: Model<IDnevnik> = mongoose.model(
  "Dnevnik",
  dnevnik,
  "Dnevniki"
)

export default DnevnikModel
