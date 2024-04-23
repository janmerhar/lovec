import type { IDruzinaDetails } from "~/shared/types"
import mongoose from "mongoose"

export const CreateDruzinaDetailsPartialStub = (): IDruzinaDetails => {
  return {
    _id: new mongoose.Types.ObjectId("65c80054921864fcfd09604f"),
    ime: "druzinaIme",
  }
}
