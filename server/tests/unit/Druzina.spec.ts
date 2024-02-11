import Druzina, { DruzinaDetails } from "@entities/Druzina"
import DruzinaModel from "@models/druzinaModel"
import { UporabnikDetails } from "@entities/Uporabnik"
import { RevirDetails } from "@entities/Revir"

import { CreateDruzinaDetailsStub } from "@stubs/CreateDruzinaDetails.stub"
import { CreateDruzinaDetailsPartialStub } from "@stubs/CreateDruzinaDetailsPartial.stub"

import { CreateDruzinaStub } from "@stubs/CreateDruzina.stub"
import { CreateDruzinaRevirjiStub } from "@stubs/CreateDruzinaRevirji.stub"
import { CreateDruzinaClaniStub } from "@stubs/CreateDruzinaClani.stub"
import { CreateDruzinaClaniRevirjiStub } from "@stubs/CreateDruzinaClaniRevirji.stub"

describe("DruzinaDetails", () => {
  describe("constructor", () => {
    it("should create a new instance of DruzinaDetails", () => {
      const druzinaDetailsStub = CreateDruzinaDetailsStub()

      const druzina = new DruzinaDetails(
        druzinaDetailsStub._id.toString(),
        druzinaDetailsStub.ime,
        druzinaDetailsStub.revirjiCount,
        druzinaDetailsStub.claniCount
      )

      expect(druzina).toBeInstanceOf(DruzinaDetails)
      expect(druzina.id).toEqual(druzinaDetailsStub._id.toString())
      expect(druzina.ime).toEqual(druzinaDetailsStub.ime)
      expect(druzina.revirjiCount).toEqual(druzinaDetailsStub.revirjiCount)
      expect(druzina.claniCount).toEqual(druzinaDetailsStub.claniCount)
    })

    it("should create a new partial instance of DruzinaDetails", () => {
      const druzinaDetailsPartialStub = CreateDruzinaDetailsPartialStub()

      const druzina = new DruzinaDetails(
        druzinaDetailsPartialStub._id.toString(),
        druzinaDetailsPartialStub.ime
      )

      expect(druzina).toBeInstanceOf(DruzinaDetails)
      expect(druzina.id).toEqual(druzinaDetailsPartialStub._id.toString())
      expect(druzina.ime).toEqual(druzinaDetailsPartialStub.ime)
      expect(druzina.revirjiCount).toBeUndefined()
      expect(druzina.claniCount).toBeUndefined()
    })
  })
})

jest.mock("@models/druzinaModel", () => ({
  findById: jest.fn(),
}))

describe("Druzina", () => {
  describe("constructor", () => {
    it("should create a new instance of Druzina", () => {
      const druzinaStub = CreateDruzinaStub()

      const druzina = new Druzina(
        druzinaStub._id.toString(),
        druzinaStub.ime,
        druzinaStub.revirji,
        druzinaStub.clani
      )

      expect(druzina).toBeInstanceOf(Druzina)
      expect(druzina.id).toEqual(druzinaStub._id.toString())
      expect(druzina.ime).toEqual(druzinaStub.ime)
      expect(druzina.revirji).toEqual(druzinaStub.revirji)
      expect(druzina.clani).toEqual(druzinaStub.clani)
    })

    it("should create a new revirji instance of Druzina", () => {
      const druzinaStub = CreateDruzinaRevirjiStub()

      const druzina = new Druzina<RevirDetails, string>(
        druzinaStub._id.toString(),
        druzinaStub.ime,
        druzinaStub.revirji.map((revir) => {
          return new RevirDetails(
            revir._id.toString(),
            revir.ime,
            revir.koordinate
          )
        }),
        druzinaStub.clani.map((clan) => clan.toString())
      )

      expect(druzina).toBeInstanceOf(Druzina)
      expect(druzina.id).toEqual(druzinaStub._id.toString())
      expect(druzina.ime).toEqual(druzinaStub.ime)

      expect(druzina.revirji).toHaveLength(druzinaStub.revirji.length)
      druzina.revirji.forEach((revir, index) => {
        expect(revir).toBeInstanceOf(RevirDetails)
        expect(revir.id).toEqual(druzinaStub.revirji[index]._id.toString())
        expect(revir.ime).toEqual(druzinaStub.revirji[index].ime)
        expect(revir.koordinate).toEqual(druzinaStub.revirji[index].koordinate)
      })
    })

    it("should create a new clani instance of Druzina", () => {
      const druzinaStub = CreateDruzinaClaniStub()

      const druzina = new Druzina<string, UporabnikDetails>(
        druzinaStub._id.toString(),
        druzinaStub.ime,
        druzinaStub.revirji.map((revir) => revir.toString()),
        druzinaStub.clani.map((clan) => {
          return new UporabnikDetails(
            clan._id.toString(),
            clan.ime,
            clan.priimek,
            clan.slika,
            clan.role
          )
        })
      )

      expect(druzina).toBeInstanceOf(Druzina)
      expect(druzina.id).toEqual(druzinaStub._id.toString())
      expect(druzina.ime).toEqual(druzinaStub.ime)
      expect(druzina.revirji).toEqual(
        druzinaStub.revirji.map((revir) => revir.toString())
      )

      expect(druzina.clani).toHaveLength(druzinaStub.clani.length)

      druzina.clani.forEach((clan, index) => {
        expect(clan).toBeInstanceOf(UporabnikDetails)
        expect(clan.id).toEqual(druzinaStub.clani[index]._id.toString())
        expect(clan.ime).toEqual(druzinaStub.clani[index].ime)
        expect(clan.priimek).toEqual(druzinaStub.clani[index].priimek)
        expect(clan.slika).toEqual(druzinaStub.clani[index].slika)
        expect(clan.role).toEqual(druzinaStub.clani[index].role)
      })
    })

    it("should create a new revirji clani instance of Druzina", () => {
      const druzinaStub = CreateDruzinaClaniRevirjiStub()

      const druzina = new Druzina<RevirDetails, UporabnikDetails>(
        druzinaStub._id.toString(),
        druzinaStub.ime,
        druzinaStub.revirji.map((revir) => {
          return new RevirDetails(
            revir._id.toString(),
            revir.ime,
            revir.koordinate
          )
        }),
        druzinaStub.clani.map((clan) => {
          return new UporabnikDetails(
            clan._id.toString(),
            clan.ime,
            clan.priimek,
            clan.slika,
            clan.role
          )
        })
      )

      expect(druzina).toBeInstanceOf(Druzina)
      expect(druzina.id).toEqual(druzinaStub._id.toString())
      expect(druzina.ime).toEqual(druzinaStub.ime)

      expect(druzina.revirji).toHaveLength(druzinaStub.revirji.length)
      druzina.revirji.forEach((revir, index) => {
        expect(revir).toBeInstanceOf(RevirDetails)
        expect(revir.id).toEqual(druzinaStub.revirji[index]._id.toString())
        expect(revir.ime).toEqual(druzinaStub.revirji[index].ime)
        expect(revir.koordinate).toEqual(druzinaStub.revirji[index].koordinate)
      })

      expect(druzina.clani).toHaveLength(druzinaStub.clani.length)
      druzina.clani.forEach((clan, index) => {
        expect(clan).toBeInstanceOf(UporabnikDetails)
        expect(clan.id).toEqual(druzinaStub.clani[index]._id.toString())
        expect(clan.ime).toEqual(druzinaStub.clani[index].ime)
        expect(clan.priimek).toEqual(druzinaStub.clani[index].priimek)
        expect(clan.slika).toEqual(druzinaStub.clani[index].slika)
        expect(clan.role).toEqual(druzinaStub.clani[index].role)
      })
    })
  })

  describe("fetchDruzina", () => {
    it("should fetch a Druzina", async () => {
      const druzinaStub = CreateDruzinaClaniRevirjiStub()

      // @ts-ignore
      ;(DruzinaModel as jest.Mock).findById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            exec: jest.fn().mockReturnValue(druzinaStub),
          }),
        }),
      })

      const druzina = await Druzina.fetchDruzina(druzinaStub._id.toString())

      if (!druzina) return

      expect(druzina).toBeInstanceOf(Druzina)
      expect(druzina.id).toEqual(druzinaStub._id.toString())
      expect(druzina.ime).toEqual(druzinaStub.ime)

      expect(druzina.revirji).toHaveLength(druzinaStub.revirji.length)
      druzina.revirji.forEach((revir, index) => {
        expect(revir).toBeInstanceOf(RevirDetails)
        expect(revir.id).toEqual(druzinaStub.revirji[index]._id.toString())
        expect(revir.ime).toEqual(druzinaStub.revirji[index].ime)
        expect(revir.koordinate).toEqual(druzinaStub.revirji[index].koordinate)
      })

      expect(druzina.clani).toHaveLength(druzinaStub.clani.length)
      druzina.clani.forEach((clan, index) => {
        expect(clan).toBeInstanceOf(UporabnikDetails)
        expect(clan.id).toEqual(druzinaStub.clani[index]._id.toString())
        expect(clan.ime).toEqual(druzinaStub.clani[index].ime)
        expect(clan.priimek).toEqual(druzinaStub.clani[index].priimek)
        expect(clan.slika).toEqual(druzinaStub.clani[index].slika)
        expect(clan.role).toEqual(druzinaStub.clani[index].role)
      })
    })

    it("should return null if Druzina is not found", async () => {
      const druzinaStub: null = null

      // @ts-ignore
      ;(DruzinaModel as jest.Mock).findById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            exec: jest.fn().mockReturnValue(druzinaStub),
          }),
        }),
      })

      const druzina = await Druzina.fetchDruzina("mockId")

      expect(druzina).toBeNull()
    })
  })

  describe("fetchDruzine", () => {
    it.todo("should fetch Druzine")
  })

  describe("insertDruzina", () => {
    it.todo("should insert a Druzina")
  })

  describe("dodajRevir", () => {
    it.todo("should add a Revir to Druzina")
    it.todo("should return false if cannot be added to Druzina")
  })

  describe("odstraniRevir", () => {
    it.todo("should remove a Revir from Druzina")
    it.todo("should return false if Revir is not found")
  })

  describe("odstraniClana", () => {
    it.todo("should remove a Clan from Druzina")
    it.todo("should return false if Clan cannot be removed")
  })

  describe("dodajClana", () => {
    it.todo("should add a Clan to Druzina")
    it.todo("should return false if Clan cannot be added")
  })

  describe("deleteDruzina", () => {
    it.todo("should delete a Druzina")
    it.todo("should return false if Druzina is not found")
  })
})
