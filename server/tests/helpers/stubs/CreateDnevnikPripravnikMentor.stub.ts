import type { IDnevnik, IUporabnikDetails } from "@shared/types"
import mongoose from "mongoose"

export const CreateDnevnikPripravnikMentorStub = (): IDnevnik<
  mongoose.Types.ObjectId,
  IUporabnikDetails,
  IUporabnikDetails
> => ({
  _id: new mongoose.Types.ObjectId("65c78ca1a7f1d997defbe169"),
  pripravnik: {
    _id: new mongoose.Types.ObjectId("65c78f41a7f1d997defbe16a"),
    ime: "1",
    priimek: "1",
    slika: "1",
    role: "1",
    isDeleted: false,
  },
  mentor: {
    _id: new mongoose.Types.ObjectId("65c78f64a7f1d997defbe16b"),
    ime: "2",
    priimek: "2",
    slika: "2",
    role: "2",
    isDeleted: false,
  },
  status: "drugo",
  datum: new Date("2024-02-10T14:23:13.888Z"),
  ure: 12,
  opis: "opis",
  delo: "drugo",
})
