import type { IDruzina, IRevir, IUporabnikDetails } from "@shared/types"
import mongoose from "mongoose"

export const CreateDruzinaClaniRevirjiStub = (): IDruzina<
  mongoose.Types.ObjectId,
  IRevir,
  IUporabnikDetails
> => ({
  _id: new mongoose.Types.ObjectId("65c80054921864fcfd09604f"),
  ime: "druzinaIme",
  revirji: [
    {
      _id: new mongoose.Types.ObjectId("65c80054921864fcfd09604f"),
      ime: "revirIme",
      koordinate: [[1, 2]],
      druzina: new mongoose.Types.ObjectId("65c80054921864fcfd09604f"),
    },
  ],
  clani: [
    {
      _id: new mongoose.Types.ObjectId("65c80054921864fcfd09604f"),
      ime: "ime",
      priimek: "priimek",
      slika: "slika",
      role: "role",
      isDeleted: false,
    },
  ],
})
