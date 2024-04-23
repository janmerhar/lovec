import type { IDruzina, IRevirDetails, IUporabnikDetails } from "@shared/types"
import mongoose from "mongoose"

export const CreateDruzinaClaniRevirjiStub = (): IDruzina<
  mongoose.Types.ObjectId,
  IRevirDetails,
  IUporabnikDetails
> => ({
  _id: new mongoose.Types.ObjectId("65c80054921864fcfd09604f"),
  ime: "druzinaIme",
  revirji: [
    {
      _id: new mongoose.Types.ObjectId("65c80054921864fcfd09604f"),
      ime: "revirIme",
      koordinate: [[1, 2]],
    },
  ],
  clani: [
    {
      _id: new mongoose.Types.ObjectId("65c80054921864fcfd09604f"),
      ime: "ime",
      priimek: "priimek",
      slika: "slika",
      role: "role",
    },
  ],
})
