import type { IDnevnik, IUporabnikDetails } from "@shared/types"

export const CreateDnevnikPripravnikStub = (): IDnevnik<
  string,
  IUporabnikDetails<string>,
  IUporabnikDetails<string>
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
  mentor: {
    _id: "2",
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
