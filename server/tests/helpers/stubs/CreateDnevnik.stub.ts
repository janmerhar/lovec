import type { IDnevnik } from "@shared/types"

export const CreateDnevnikStub = (): IDnevnik<string, string, string> => ({
  _id: "1",
  pripravnik: "1",
  mentor: "1",
  status: "drugo",
  datum: new Date("2024-02-10T14:23:13.888Z"),
  ure: 12,
  opis: "opis",
  delo: "drugo",
})
