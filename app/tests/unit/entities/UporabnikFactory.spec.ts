import { UporabnikFactory } from "@/entities/UporabnikFactory"
import { axiosInstance } from "../../helpers/axiosInstance"

import { Admin } from "@/entities/users/Admin"
import { Lovec } from "@/entities/users/Lovec"
import { Pripravnik } from "@/entities/users/Pripravnik"

import { lovecData, pripravnikData } from "../../helpers/loginUser"

describe("UporabnikFactory class", () => {
  describe("createUporabnik", () => {
    const adminData = {
      _id: "1",
      ime: "ime",
      priimek: "priimek",
      email: "email@email.com",
      token: "token",
      role: "admin",
    }

    it("creates admin", () => {
      // @ts-expect-error: we are testing the private method
      const admin = UporabnikFactory.createUporabnik(axiosInstance, adminData)

      expect(admin).toBeInstanceOf(Admin)
    })

    const lovecData = {
      _id: "1",
      ime: "ime",
      prinimek: "priimek",
      slika: "slika",
      rojstniDatum: new Date(),
      email: "email@email.com",
      token: "token",
      druzina: "druzina",
      pripravniki: ["1", "2"],
      role: "lovec",
    }

    it("creates lovec", () => {
      // @ts-expect-error: we are testing the private method
      const lovec = UporabnikFactory.createUporabnik(axiosInstance, lovecData)

      expect(lovec).toBeInstanceOf(Lovec)
    })

    const pripravnikData = {
      _id: "1",
      ime: "ime",
      priimek: "priimek",
      slika: "slika",
      rojstniDatum: new Date(),
      email: "email",
      token: "token",
      druzina: "druzina",
      mentor: "mentor",
      role: "pripravnik",
    }

    it("creates pripravnik", () => {
      // @ts-expect-error: we are testing the private method
      const pripravnik = UporabnikFactory.createUporabnik(
        axiosInstance,
        pripravnikData
      )

      expect(pripravnik).toBeInstanceOf(Pripravnik)
    })
  })

  describe("login", () => {
    it.todo("logs in Admin")

    it("logs in Lovec", async () => {
      const lovec = await UporabnikFactory.login(
        axiosInstance,
        lovecData.email,
        lovecData.geslo
      )

      if (lovec.data === null) {
        fail("lovec login failed")
      }

      expect(lovec.data).toBeInstanceOf(Lovec)
    })

    it("logs in Pripravnik", async () => {
      const pripravnik = await UporabnikFactory.login(
        axiosInstance,
        pripravnikData.email,
        pripravnikData.geslo
      )

      if (pripravnik.data === null) {
        fail("pripravnik login failed")
      }

      expect(pripravnik.data).toBeInstanceOf(Pripravnik)
    })
  })

  describe("register", () => {
    it.todo("registers Admin")
    it.todo("registers Lovec")
    it.todo("registers Pripravnik")
  })

  describe("fetchUporabnik", () => {
    it.todo("fetches Admin")
    it.todo("fetches Lovec")
    it.todo("fetches Pripravnik")
    it.todo("fetches user")
  })

  describe("logout", () => {
    it.todo("logs out user")
  })
})
