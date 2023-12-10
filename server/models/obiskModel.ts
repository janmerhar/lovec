import mongoose, { Schema, Document, Model } from "mongoose"
import type { IObisk } from "@shared/types"

const obiskSchema = new Schema<IObisk>({
  opazovalnica: {
    type: Schema.Types.ObjectId,
    ref: "Opazovalnica",
    required: true,
  },
  uporabnik: {
    type: Schema.Types.ObjectId,
    ref: "Uporabnik",
    required: true,
  },
  zacetek: {
    type: Date,
    required: true,
  },
  konec: {
    type: Date,
    required: false,
  },
})

const ObiskModel: Model<IObisk> = mongoose.model("Obisk", obiskSchema, "Obiski")

export default ObiskModel
export type ObiskDocument = IObisk & Document
