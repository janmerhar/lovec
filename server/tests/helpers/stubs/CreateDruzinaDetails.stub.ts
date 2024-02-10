import type { IDruzinaDetails } from "~/shared/types"
import mongoose from "mongoose"

export const CreateDruzinaDetailsStub = (): IDruzinaDetails => {
  return {
    _id: new mongoose.Types.ObjectId("65c80054921864fcfd09604f"),
    ime: "druzinaIme",
    revirjiCount: 1,
    claniCount: 2,
  }
}
