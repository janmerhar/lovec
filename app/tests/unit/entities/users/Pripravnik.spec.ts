import { Pripravnik } from "@/entities/users/Pripravnik"
import { axiosInstance } from "../../../helpers/axiosInstance"

describe("Pripravnik class", () => {
  describe("constructor", () => {
    const pripravnikData = {
      _id: "1",
      ime: "ime",
      priimek: "priimek",
      slika: "slika",
      rojstniDatum: new Date(),
      email: "email@email.com",
      token: "token",
      druzina: "druzina",
      mentor: "mentor",
    }

    it("constructs pripravnik", () => {
      const pripravnik = new Pripravnik(axiosInstance, pripravnikData)

      expect(pripravnik.id).toBe(pripravnikData._id)
      expect(pripravnik.ime).toBe(pripravnikData.ime)
      expect(pripravnik.priimek).toBe(pripravnikData.priimek)
      expect(pripravnik.slika).toBe(pripravnikData.slika)
      expect(pripravnik.rojstniDatum).toBe(pripravnikData.rojstniDatum)
      expect(pripravnik.email).toBe(pripravnikData.email)
      expect(pripravnik.jwt.token).toBe(pripravnikData.token)
      expect(pripravnik.druzina).toBe(pripravnikData.druzina)
      expect(pripravnik.mentor).toBe(pripravnikData.mentor)
    })
  })
})
