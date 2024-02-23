import type { IUporabnik } from "@shared/types"
import mongoose from "mongoose"

export const CreateUporabnikPripravnik = (): IUporabnik => ({
  _id: new mongoose.Types.ObjectId("5f9d88e3f3f951001c0b1e3d"),
  ime: "Admin",
  priimek: "Admin",
  slika: "slika",
  role: "admin",
  rojstniDatum: new Date("2020-10-30"),
  email: "a@a.com",
  hash: "$2b$10$akR.aUuhfEnifTkXZAGgIendSK80tGk/9Y.f9nvnOIgnwwOfg5uF6",
  mentor: new mongoose.Types.ObjectId("5f9d88e3f3f951001c0b1e3d"),
  pripravniki: null,
  druzina: null,
  isDeleted: false,
  refresh_token: "$2b$10$akR.aUuhfEnifTkXZAGgIendSK80tGk/9Y.f9nvnOIgnwwOfg5uF6",
})
