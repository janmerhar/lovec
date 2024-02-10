import type { IDruzina, IRevir } from "@shared/types"
import mongoose from "mongoose"

export const CreateDruzinaRevirjiStub = (): IDruzina<
  mongoose.Types.ObjectId,
  IRevir,
  mongoose.Types.ObjectId
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
  clani: [new mongoose.Types.ObjectId("65c80054921864fcfd09604f")],
})
