import Revir, { RevirDetails } from "@entities/Revir"
import RevirModel from "@models/revirModel"
import Druzina, { DruzinaDetails } from "@entities/Druzina"

import { CreateRevirDetailsStub } from "@stubs/CreateRevirDetails.stub"
import { CreateRevirDruzinaStub } from "@stubs/CreateRevirDruzina.stub"
import { CreateRevirStub } from "@stubs/CreateRevir.stub"

describe("RevirDetails", () => {
  describe("constructor", () => {
    it("should create an instance of RevirDetails", () => {
      const revirDetailsStub = CreateRevirDetailsStub()

      const revirDetails = new RevirDetails(
        revirDetailsStub._id.toString(),
        revirDetailsStub.ime,
        revirDetailsStub.koordinate
      )

      expect(revirDetails).toBeInstanceOf(RevirDetails)
      expect(revirDetails.id).toEqual(revirDetailsStub._id.toString())
      expect(revirDetails.ime).toEqual(revirDetailsStub.ime)
      expect(revirDetails.koordinate).toEqual(revirDetailsStub.koordinate)
    })
})
})

jest.mock("@models/revirModel", () => ({
  find: jest.fn(),
  create: jest.fn(),
  findByIdAndDelete: jest.fn(),
}))

jest.mock("@entities/Druzina", () => ({
  dodajRevir: jest.fn(),
  odstraniRevir: jest.fn(),
}))

describe("Revir", () => {
  describe("constructor", () => {
    it("should create an instance of Revir", () => {
      const revirDetailsStub = CreateRevirStub()

      const revir = new Revir(
        revirDetailsStub._id.toString(),
        revirDetailsStub.ime,
        revirDetailsStub.koordinate,
        revirDetailsStub.druzina.toString()
      )

      expect(revir).toBeInstanceOf(Revir)
      expect(revir.id).toEqual(revirDetailsStub._id.toString())
      expect(revir.ime).toEqual(revirDetailsStub.ime)
      expect(revir.koordinate).toEqual(revirDetailsStub.koordinate)
      expect(revir.druzina).toEqual(revirDetailsStub.druzina.toString())
    })

  })

  describe("fetchRevirji", () => {
    it.todo("should return an array of Revir instances")
  })

  describe("vnesiRevir", () => {
    it.todo("should create a new Revir instance")
  })

  describe("odstraniRevir", () => {
    it("should remove a Revir instance from the database", async () => {
      const revirStub = CreateRevirStub()

      RevirModel.findByIdAndDelete = jest.fn().mockReturnValue(revirStub)

      Druzina.odstraniRevir = jest.fn().mockReturnValue(true)

      const result = await Revir.odstraniRevir(revirStub._id.toString())

      expect(result).toEqual(true)
    })

    it("should return false if the Revir instance does not exist", async () => {
      const revirStub = CreateRevirStub()

      RevirModel.findByIdAndDelete = jest.fn().mockReturnValue(null)

      const result = await Revir.odstraniRevir(revirStub._id.toString())

      expect(result).toEqual(false)
    })
  })

  describe("updateRevir", () => {
    it("should update a Revir instance in the database", async () => {
      const revirStub = CreateRevirStub()

      RevirModel.findById = jest.fn().mockReturnValue(revirStub)
      Druzina.odstraniRevir = jest.fn().mockReturnValue(true)
      RevirModel.findByIdAndUpdate = jest.fn().mockResolvedValue(revirStub)
      Druzina.dodajRevir = jest.fn().mockReturnValue(true)

      const revir = await Revir.updateRevir(
        revirStub._id.toString(),
        revirStub.ime,
        revirStub.koordinate,
        revirStub.druzina.toString()
      )

      expect(revir).toBeTruthy()

      if (!revir) return

      expect(revir).toBeInstanceOf(Revir)
      expect(revir.id).toEqual(revirStub._id.toString())
      expect(revir.ime).toEqual(revirStub.ime)
      expect(revir.koordinate).toEqual(revirStub.koordinate)
      expect(revir.druzina).toEqual(revirStub.druzina.toString())
    })

    it("should return null if the Revir instance does not exist", async () => {
      const revirStub = CreateRevirStub()

      RevirModel.findById = jest.fn().mockReturnValue(null)

      const revir = await Revir.updateRevir(
        revirStub._id.toString(),
        revirStub.ime,
        revirStub.koordinate,
        revirStub.druzina.toString()
      )

      expect(revir).toBeNull()
    })
  })
})
