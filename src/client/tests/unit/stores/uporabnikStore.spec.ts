import { setActivePinia, createPinia } from "pinia"
import { useUporabnikStore } from "@/stores/uporabnikStore"
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
import { axiosInstance } from "../../helpers/axiosInstance"
import { Lovec } from "@/entities/users/Lovec"
import { UporabnikDetails } from "@/types"
import { Pripravnik } from "@/entities/users/Pripravnik"

describe("uporabnikStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia().use(piniaPluginPersistedState))
  })

  describe("login", () => {
    it("should set uporabnik", () => {
      const lovecData = {
        _id: "1",
        ime: "ime",
        priimek: "priimek",
        slika: "slika",
        rojstniDatum: new Date(),
        email: "email",
        token: "token",
        druzina: "druzina",
        pripravniki: ["pripravniki1"],
      }

      const lovec = new Lovec(axiosInstance, lovecData)

      const uporabnikStore = useUporabnikStore()
      uporabnikStore.login(lovec)

      expect(uporabnikStore.uporabnik).toStrictEqual(lovec)
    })
  })

  const lovecData = {
    _id: "1",
    ime: "ime",
    priimek: "priimek",
    slika: "slika",
    rojstniDatum: new Date(),
    email: "email",
    token: "token",
    druzina: "druzina",
    pripravniki: ["pripravniki1"],
  }

  const lovec = new Lovec(axiosInstance, lovecData)

  const pripravnikMentor: UporabnikDetails = {
    id: "2",
    ime: "imementor",
    priimek: "priimekmentor",
    slika: "slika",
    role: "lovec",
  }

  const pripravnikData = {
    _id: "1",
    ime: "ime",
    priimek: "priimek",
    slika: "slika",
    rojstniDatum: new Date(),
    email: "email@email.com",
    token: "token",
    druzina: "druzina",
    mentor: pripravnikMentor,
  }

  const pripravnik = new Pripravnik(axiosInstance, pripravnikData)

  describe("isMentor", () => {
    it("should return mentor data if uporabnik is lovec", () => {
      const uporabnikStore = useUporabnikStore()
      uporabnikStore.login(lovec)

      expect(uporabnikStore.isMentor).toBe(true)
    })

    it("should return null if uporabnik is not pripravnik", () => {
      const uporabnikStore = useUporabnikStore()
      uporabnikStore.login(pripravnik)

      expect(uporabnikStore.isMentor).toBe(false)
    })
  })

  describe("mentorIme", () => {
    it("should return mentor ime if uporabnik is lovec", () => {
      const uporabnikStore = useUporabnikStore()
      uporabnikStore.login(pripravnik)

      const mentorIme = `${pripravnikMentor.ime} ${pripravnikMentor.priimek}`
      expect(uporabnikStore.mentorIme).toBe(mentorIme)
    })

    it("should return empty string if uporabnik is not pripravnik", () => {
      const uporabnikStore = useUporabnikStore()
      uporabnikStore.login(lovec)

      expect(uporabnikStore.mentorIme).toBe("")
    })

    describe("token", () => {
      it("should return token", () => {
        const uporabnikStore = useUporabnikStore()
        uporabnikStore.login(lovec)

        expect(uporabnikStore.token).toBe(lovecData.token)
      })
    })
  })

  describe("logout", () => {
    it.todo("logs out user")
  })

  describe("isLoggedIn", () => {
    it.todo("returns true if user is logged in")
  })
})
