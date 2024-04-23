import type { IRevir } from "@shared/types"
import mongoose from "mongoose"

export const CreateRevirStub = (): IRevir => ({
  _id: new mongoose.Types.ObjectId("65c80054921864fcfd09604f"),
  ime: "revirIme",
  koordinate: [
    [1, 2],
    [3, 4],
  ],
  druzina: new mongoose.Types.ObjectId("65c80054921864fcfd09604f"),
})
