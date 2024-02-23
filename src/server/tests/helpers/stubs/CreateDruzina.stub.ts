import type { IDruzina } from "@shared/types"
import mongoose from "mongoose"

export const CreateDruzinaStub = (): IDruzina => ({
  _id: new mongoose.Types.ObjectId("65c80054921864fcfd09604f"),
  ime: "druzinaIme",
  revirji: [new mongoose.Types.ObjectId("65c80054921864fcfd09604f")],
  clani: [new mongoose.Types.ObjectId("65c80054921864fcfd09604f")],
})
