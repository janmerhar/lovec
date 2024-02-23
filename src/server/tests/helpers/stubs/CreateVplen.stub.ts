import { IVplen } from "@shared/types"
import mongoose from "mongoose"

export const CreateVplenStub = (): IVplen => ({
  _id: new mongoose.Types.ObjectId("65c80054921864fcfd09604f"),
  uporabnik: new mongoose.Types.ObjectId("65c80054921864fcfd09604f"),
  koordinate: [45.123, 14.123],
  zival: "zival",
  teza: 100,
  datum: new Date("2021-01-01"),
  bolezni: ["drugo"],
})
