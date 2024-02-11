import type { IDruzina, IRevirDetails } from "@shared/types"
import mongoose from "mongoose"

export const CreateDruzinaRevirjiStub = (): IDruzina<
  mongoose.Types.ObjectId,
  IRevirDetails,
  mongoose.Types.ObjectId
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
  clani: [new mongoose.Types.ObjectId("65c80054921864fcfd09604f")],
})
