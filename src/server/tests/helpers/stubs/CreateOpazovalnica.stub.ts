import type { IOpazovalnica } from "@shared/types"
import mongoose from "mongoose"

export const CreateOpazovalnicaStub = (): IOpazovalnica => ({
  _id: new mongoose.Types.ObjectId("65c80054921864fcfd09604f"),
  ime: "opazovalnicaIme",
  kapaciteta: 10,
  prespanje: false,
  koordinate: [45.123, 14.123],
  isDeleted: false,
})
