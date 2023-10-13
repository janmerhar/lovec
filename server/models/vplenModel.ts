import mongoose, { Schema, Document, Model } from "mongoose"
import { IUporabnikDetails } from "./uporabnikModel"

export interface IVplen extends Document {
  uporabnik: Schema.Types.ObjectId | IUporabnikDetails
  koordinate: [number, number]
  zival: string
  teza: number
  datum: Date
  bolezni?: string[]
}

const vplenSchema = new Schema<IVplen>({
  uporabnik: { type: Schema.Types.ObjectId, ref: "Uporabnik", required: true },
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
