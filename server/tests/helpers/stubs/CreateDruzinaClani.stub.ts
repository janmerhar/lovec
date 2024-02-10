import type { IDruzina, IUporabnikDetails } from "@shared/types"
import mongoose from "mongoose"

export const CreateDruzinaClaniStub = (): IDruzina<
  mongoose.Types.ObjectId,
  mongoose.Types.ObjectId,
  IUporabnikDetails
> => ({
  _id: new mongoose.Types.ObjectId("65c80054921864fcfd09604f"),
  ime: "druzinaIme",
  revirji: [new mongoose.Types.ObjectId("65c80054921864fcfd09604f")],
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
