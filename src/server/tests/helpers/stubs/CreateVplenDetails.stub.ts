import { IVplenDetails } from "@shared/types"

export const CreateVplenDetailsStub = (): IVplenDetails => ({
  datum: new Date("2021-01-01"),
  zivali: ["zival"],
})
