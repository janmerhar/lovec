import mongoose, { Schema, Document, Model } from "mongoose"
import { IUporabnikDetails } from "./uporabnikModel"

export interface IOpazovalnica extends Document {
  koordinate: [number, number]
  obiski: [
    {
      uporabnik: Schema.Types.ObjectId | IUporabnikDetails
      zacetek: Date
      konec: Date
    }
  ]
}

const opazovalnicaSchema = new Schema<IOpazovalnica>({
  koordinate: {
    type: [Number],
    required: true,
  },
  obiski: {
    type: [
      {
        uporabnik: {
          type: Schema.Types.ObjectId,
          ref: "Uporabnik",
          required: true,
        },
        zacetek: { type: Date, required: true },
        konec: { type: Date, required: false },
      },
    ],
    required: false,
  },
})

const OpazovalnicaModel: Model<IOpazovalnica> = mongoose.model(
  "Opazovalnica",
  opazovalnicaSchema,
  "Opazovalnice"
)

export default OpazovalnicaModel
