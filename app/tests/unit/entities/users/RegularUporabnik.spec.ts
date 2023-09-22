import { RegularUporabnik } from "@/entities/users/RegularUporabnik"
import { axiosInstance } from "../../../helpers/axiosInstance"

describe("RegularUporabnik class", () => {
  describe("constructor", () => {
    const uporabnikData = {
      _id: "1",
      ime: "ime",
      priimek: "priimek",
      slika: "slika",
      email: "email@email.com",
      rojstniDatum: new Date(),
      token: "token",
      druzina: "druzina",
    }

    it("constructs uporabnik", () => {
      const uporabnik = new RegularUporabnik(axiosInstance, uporabnikData)

      expect(uporabnik.id).toBe(uporabnikData._id)
      expect(uporabnik.ime).toBe(uporabnikData.ime)
      expect(uporabnik.priimek).toBe(uporabnikData.priimek)
      expect(uporabnik.email).toBe(uporabnikData.email)
    })
  })
})
