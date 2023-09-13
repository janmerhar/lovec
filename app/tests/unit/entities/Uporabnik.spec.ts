import { Uporabnik } from "@/entities/Uporabnik"
import axiosInstance from "../../helpers/axiosInstance"

describe("Uporabnik class", () => {
  describe("constructor", () => {
    it("constructs lovec", () => {
      const lovecData = {
        _id: "1",
        ime: "Janez",
        priimek: "Novak",
        slika: "slika",
        rojstniDatum: new Date(),
        email: "janez@novak.si",
        role: "lovec",
        token: "token",
        druzina: "druzina",
      }

      const uporabnikLovec = new Uporabnik(axiosInstance, lovecData)

      expect(uporabnikLovec.id).toBe(lovecData._id)
      expect(uporabnikLovec.ime).toBe(lovecData.ime)
      expect(uporabnikLovec.priimek).toBe(lovecData.priimek)
      expect(uporabnikLovec.slika).toBe(lovecData.slika)
      expect(uporabnikLovec.rojstniDatum).toBe(lovecData.rojstniDatum)
      expect(uporabnikLovec.email).toBe(lovecData.email)
      expect(uporabnikLovec.role).toBe(lovecData.role)
      expect(uporabnikLovec.token).toBe(lovecData.token)
      expect(uporabnikLovec.druzina).toBe(lovecData.druzina)
    })

    it("constructs pripravnik", () => {
      const pripravnikData = {
        _id: "2",
        ime: "Janez",
        priimek: "Novak",
        slika: "slika",
        rojstniDatum: new Date(),
        email: "",
        role: "pripravnik",
        token: "token",
        druzina: "druzina",
      }

      const uporabnikPripravnik = new Uporabnik(axiosInstance, pripravnikData)

      expect(uporabnikPripravnik.id).toBe(pripravnikData._id)
      expect(uporabnikPripravnik.ime).toBe(pripravnikData.ime)
      expect(uporabnikPripravnik.priimek).toBe(pripravnikData.priimek)
      expect(uporabnikPripravnik.slika).toBe(pripravnikData.slika)
      expect(uporabnikPripravnik.rojstniDatum).toBe(pripravnikData.rojstniDatum)
      expect(uporabnikPripravnik.email).toBe(pripravnikData.email)
      expect(uporabnikPripravnik.role).toBe(pripravnikData.role)
      expect(uporabnikPripravnik.token).toBe(pripravnikData.token)
      expect(uporabnikPripravnik.druzina).toBe(pripravnikData.druzina)
    })
  })

  describe("login", () => {
    it("successful login", async () => {
      const lovec = {
        email: "lovec",
        geslo: "123",
      }

      const lovecResponse = await Uporabnik.login(
        axiosInstance,
        lovec.email,
        lovec.geslo
      )

      expect(lovecResponse.status).toBe(200)
      expect(lovecResponse.data).toHaveProperty("token")
      expect(lovecResponse.message).toBe("Success")
    })

    it("unsuccessful login", async () => {
      const nonUser = {
        email: "nonuser",
        geslo: "",
      }

      await expect(
        Uporabnik.login(axiosInstance, nonUser.email, nonUser.geslo)
      ).rejects.toThrow()

      // TODO
      // expect(nonUserResponse.status).not.toBe(200)
      // expect(nonUserResponse.data).not.toHaveProperty("token")
      // expect(nonUserResponse.message).not.toBe("Success")
    })
  })
})
