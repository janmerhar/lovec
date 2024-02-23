import type { IDnevnik, IUporabnikDetails } from "@shared/types"
import mongoose from "mongoose"

export const CreateDnevnikPripravnikStub = (): IDnevnik<
  mongoose.Types.ObjectId,
  IUporabnikDetails,
  mongoose.Types.ObjectId
> => ({
  _id: new mongoose.Types.ObjectId("65c78ca1a7f1d997defbe169"),
  pripravnik: {
    _id: new mongoose.Types.ObjectId("65c78f41a7f1d997defbe16a"),
    ime: "1",
    priimek: "1",
    slika: "1",
    role: "1",
  },
  mentor: new mongoose.Types.ObjectId("65c78f64a7f1d997defbe16b"),
  status: "drugo",
  datum: new Date("2024-02-10T14:23:13.888Z"),
  ure: 12,
  opis: "opis",
  delo: "drugo",
})
