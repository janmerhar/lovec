import { IOprema } from "@shared/types"
import mongoose from "mongoose"

export const CreateOpremaStub = (): IOprema => ({
  _id: new mongoose.Types.ObjectId("65c80054921864fcfd09604f"),
  lastnik: new mongoose.Types.ObjectId("65c80054921864fcfd09604f"),
  naziv: "opremaNaziv",
  tip: "opremaTip",
  stanje: "opremaStanje",
  datum: new Date("2021-01-01T00:00:00.000Z"),
})
