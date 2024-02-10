import type { IDnevnik } from "@shared/types"
import mongoose from "mongoose"

export const CreateDnevnikStub = (): IDnevnik => ({
  _id: new mongoose.Types.ObjectId("65c78ca1a7f1d997defbe169"),
  pripravnik: new mongoose.Types.ObjectId("65c78f41a7f1d997defbe16a"),
  mentor: new mongoose.Types.ObjectId("65c78f64a7f1d997defbe16b"),
  status: "drugo",
  datum: new Date("2024-02-10T14:23:13.888Z"),
  ure: 12,
  opis: "opis",
  delo: "drugo",
})
