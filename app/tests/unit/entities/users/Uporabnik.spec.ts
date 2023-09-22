import { Uporabnik } from "@/entities/users/Uporabnik"
import { axiosInstance } from "../../../helpers/axiosInstance"

describe("Uporabnik class", () => {
  describe("constructor", () => {
    const uporabnikData = {
      _id: "1",
      ime: "ime",
      priimek: "priimek",
      email: "email@email.com",
      token: "token",
    }

    it("constructs uporabnik", () => {
      const uporabnik = new Uporabnik(axiosInstance, uporabnikData)

      expect(uporabnik.id).toBe(uporabnikData._id)
      expect(uporabnik.ime).toBe(uporabnikData.ime)
      expect(uporabnik.priimek).toBe(uporabnikData.priimek)
      expect(uporabnik.email).toBe(uporabnikData.email)
      expect(uporabnik.jwt.token).toBe(uporabnikData.token)
    })
  })
})
