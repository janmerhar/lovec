import mongoose, { Schema, Document, Model, ObjectId } from "mongoose"
import { IVplen } from "@shared/types"

const vplenSchema = new Schema<IVplen>({
  uporabnik: {
    type: Schema.Types.ObjectId,
    ref: "Uporabnik",
    required: true,
  },
  koordinate: {
    type: [Number],
    required: true,
  },
  zival: {
    type: String,
    required: true,
  },
  teza: { type: Number, required: true },
  datum: { type: Date, required: true },
  bolezni: {
    type: [String],
    required: false,
  },
})

const VplenModel: Model<IVplen> = mongoose.model("Vplen", vplenSchema, "Vpleni")

export default VplenModel
export type VplenDocument = IVplen & Document
