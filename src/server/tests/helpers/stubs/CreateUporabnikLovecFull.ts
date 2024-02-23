import type {
  IUporabnik,
  IUporabnikDetails,
  IDruzinaDetails,
} from "@shared/types"
import mongoose from "mongoose"

export const CreateUporabnikLovecFull = (): IUporabnik<
  mongoose.Types.ObjectId,
  mongoose.Types.ObjectId,
  IUporabnikDetails,
  IDruzinaDetails
> => ({
  _id: new mongoose.Types.ObjectId("5f9d88e3f3f951001c0b1e3d"),
  ime: "Admin",
  priimek: "Admin",
  slika: "slika",
  role: "admin",
  rojstniDatum: new Date("2020-10-30"),
  email: "a@a.com",
  hash: "$2b$10$akR.aUuhfEnifTkXZAGgIendSK80tGk/9Y.f9nvnOIgnwwOfg5uF6",
  mentor: null,
  pripravniki: [
    {
      _id: new mongoose.Types.ObjectId("5f9d88e3f3f951001c0b1e3d"),
      ime: "Admin",
      priimek: "Admin",
      slika: "slika",
      role: "admin",
    },
  ],
  druzina: {
    _id: new mongoose.Types.ObjectId("5f9d88e3f3f951001c0b1e3d"),
    ime: "druzinaIme",
    revirjiCount: 1,
    claniCount: 1,
  } as IDruzinaDetails,
  isDeleted: false,
  refresh_token: "$2b$10$akR.aUuhfEnifTkXZAGgIendSK80tGk/9Y.f9nvnOIgnwwOfg5uF6",
})
