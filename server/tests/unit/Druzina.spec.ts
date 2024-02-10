import Druzina, { DruzinaDetails } from "@entities/Druzina"

import { CreateDruzinaDetailsStub } from "../helpers/stubs/CreateDruzinaDetails.stub"
import { CreateDruzinaDetailsPartialStub } from "../helpers/stubs/CreateDruzinaDetailsPartial.stub"

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
describe("Druzina", () => {
  describe("constructor", () => {
    it.todo("should create a new instance of Druzina")
    it.todo("should create a new revirji instance of Druzina")
    it.todo("should create a new clani instance of Druzina")
    it.todo("should create a new revirji clani instance of Druzina")
  })

  describe("fetchDruzina", () => {
    it.todo("should fetch a Druzina")
    it.todo("should return null if Druzina is not found")
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
