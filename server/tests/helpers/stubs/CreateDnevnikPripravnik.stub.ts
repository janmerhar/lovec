import type { IDnevnik, IUporabnikDetails } from "@shared/types"

export const CreateDnevnikPripravnikStub = (): IDnevnik<
  string,
  IUporabnikDetails<string>,
  string
> => ({
  _id: "1",
  pripravnik: {
    _id: "1",
    ime: "1",
    priimek: "1",
    slika: "1",
    role: "1",
    isDeleted: false,
  },
  mentor: "1",
  status: "drugo",
  datum: new Date("2024-02-10T14:23:13.888Z"),
  ure: 12,
  opis: "opis",
  delo: "drugo",
})
