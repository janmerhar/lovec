import { Lovec } from "@/entities/users/Lovec"
import { axiosInstance } from "../../../helpers/axiosInstance"

describe("Lovec class", () => {
  describe("constructor", () => {
    it("constructs lovec", () => {
      const lovecData = {
        _id: "1",
        ime: "ime",
        priimek: "priimek",
        slika: "slika",
        rojstniDatum: "rojstniDatum",
        email: "email",
        token: "token",
        druzina: "druzina",
        pripravniki: ["pripravniki1"],
      }

      const lovec = new Lovec(axiosInstance, lovecData)

      expect(lovec.id).toBe(lovecData._id)
      expect(lovec.ime).toBe(lovecData.ime)
      expect(lovec.priimek).toBe(lovecData.priimek)
      expect(lovec.slika).toBe(lovecData.slika)
      expect(lovec.rojstniDatum).toBe(lovecData.rojstniDatum)
      expect(lovec.email).toBe(lovecData.email)
      expect(lovec.jwt.token).toBe(lovecData.token)
      expect(lovec.druzina).toBe(lovecData.druzina)
      expect(lovec.pripravniki).toBe(lovecData.pripravniki)
    })
  })
})
