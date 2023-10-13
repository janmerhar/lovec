import mongoose, { Schema, Document, Model } from "mongoose"

const uporabnikRoles = ["pripravnik", "lovec", "admin"]

export interface IUporabnikDetails extends Document {
  ime: string
  priimek: string
  slika: string
  role: (typeof uporabnikRoles)[number]
}

export interface IUporabnik extends IUporabnikDetails {
  // Osebni podatki
  rojstniDatum: Date
  email: string
  hash: string
  // PRIPRAVNIK ONLY: Tip uporabnik, ki je lovec
  mentor: Schema.Types.ObjectId
  // MENTOR ONLY: Seznam pripravnikov, ki jih mentorira
  pripravniki: Schema.Types.ObjectId[]
  // Clanstvo v neki lovski druzini
  druzina: Schema.Types.ObjectId
  // Polje za osvezevanje JWT tokenov
  refresh_token: string
}

const uporabnikSchema = new Schema<IUporabnik>({
  // Osebni podatki
  ime: { type: String, required: true },
  priimek: { type: String, required: true },
  slika: { type: String, required: false },
  rojstniDatum: { type: Date, required: true },
  email: {
    type: String,
    // index: { unique: true, dropDups: true },
    required: true,
  },
  hash: { type: String, required: true },
  // Deljenje na lovce ali pripravnike
  role: {
    type: String,
    enum: uporabnikRoles,
    required: true,
  },
  // PRIPRAVNIK ONLY: Tip uporabnik, ki je lovec
  mentor: {
    type: Schema.Types.ObjectId,
    ref: "Uporabnik",
    default: null,
    required: false,
  },
  // MENTOR ONLY: Seznam pripravnikov, ki jih mentorira
  pripravniki: [
    { type: Schema.Types.ObjectId, ref: "Uporabnik", required: false },
  ],
  // Clanstvo v neki lovski druzini
  druzina: { type: Schema.Types.ObjectId, ref: "Druzina", required: false },
  // Polje za osvezevanje JWT tokenov
  refresh_token: { type: String, required: false, default: null },
})

const UporabnikModel: Model<IUporabnik> = mongoose.model(
  "Uporabnik",
  uporabnikSchema,
  "Uporabniki"
)

export default UporabnikModel
