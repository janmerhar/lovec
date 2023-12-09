import mongoose, { Schema, Document, Model } from "mongoose"
import type { ISistemskeSpremenljivke } from "@shared/types"

const sistemskeSpremenljivkeSchema = new Schema<ISistemskeSpremenljivke>({
  datum: {
    type: Date,
    default: Date.now,
  },
  PAGE_SIZE: {
    type: Number,
    required: true,
  },
  JAGA_MAX_MEMBERS: {
    type: Number,
    required: true,
  },
  OBISK_MAX_LENGTH: {
    type: Number,
    required: true,
  },
  USER_OBISKS_MAX_LENGTH: {
    type: Number,
    required: true,
  },
})

const SistemskeSpremenljivkeModel: Model<ISistemskeSpremenljivke> =
  mongoose.model(
    "SistemskeSpremenljivke",
    sistemskeSpremenljivkeSchema,
    "SistemskeSpremenljivke"
  )

export default SistemskeSpremenljivkeModel
export type SistemskeSpremenljivkeDocument = ISistemskeSpremenljivke & Document
