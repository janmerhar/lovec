import Opazovalnica from "@entities/Opazovalnica"
import { IOpazovalnica } from "@shared/types"
import OpazovalnicaModel from "@models/opazovalnicaModel"

import { CreateOpazovalnicaStub } from "@stubs/CreateOpazovalnica.stub"

jest.mock("@models/opazovalnicaModel", () => ({
  findById: jest.fn(),
  find: jest.fn(),
  findByIdAndUpdate: jest.fn(),
}))

describe("Opazovalnica", () => {
  describe("constructor", () => {
    it("should create an instance of Opazovalnica", () => {
      const opazovalnicaStub = CreateOpazovalnicaStub()

      const opazovalnica = new Opazovalnica(opazovalnicaStub)

      expect(opazovalnica).toBeInstanceOf(Opazovalnica)
      expect(opazovalnica.id).toEqual(opazovalnicaStub._id.toString())
      expect(opazovalnica.ime).toEqual(opazovalnicaStub.ime)
      expect(opazovalnica.kapaciteta).toEqual(opazovalnicaStub.kapaciteta)
      expect(opazovalnica.prespanje).toEqual(opazovalnicaStub.prespanje)
      expect(opazovalnica.koordinate).toEqual(opazovalnicaStub.koordinate)
      expect(opazovalnica.isDeleted).toEqual(opazovalnicaStub.isDeleted)
    })
  })

  describe("fetchOpazovalnica", () => {
    it("should fetch an instance of Opazovalnica", async () => {
      const opazovalnicaStub = CreateOpazovalnicaStub()
      OpazovalnicaModel.findById = jest.fn().mockResolvedValue(opazovalnicaStub)

      const opazovalnica = await Opazovalnica.fetchOpazovalnica(
        opazovalnicaStub._id.toString()
      )

      expect(opazovalnica).not.toBeNull()
      if (opazovalnica == null) return

      expect(opazovalnica).toBeInstanceOf(Opazovalnica)
      expect(opazovalnica.id).toEqual(opazovalnicaStub._id.toString())
      expect(opazovalnica.ime).toEqual(opazovalnicaStub.ime)
      expect(opazovalnica.kapaciteta).toEqual(opazovalnicaStub.kapaciteta)
      expect(opazovalnica.prespanje).toEqual(opazovalnicaStub.prespanje)
      expect(opazovalnica.koordinate).toEqual(opazovalnicaStub.koordinate)
      expect(opazovalnica.isDeleted).toEqual(opazovalnicaStub.isDeleted)
    })

    it("should return null if no instance is found", async () => {
      OpazovalnicaModel.findById = jest.fn().mockResolvedValue(null)

      const opazovalnica = await Opazovalnica.fetchOpazovalnica("id")

      expect(opazovalnica).toBeNull()
    })
  })

  describe("fetchOpazovalnice", () => {
    it("should fetch all instances of Opazovalnica", async () => {
      const opazovalniceStub = [CreateOpazovalnicaStub()]
      OpazovalnicaModel.find = jest.fn().mockResolvedValue(opazovalniceStub)

      const opazovalnice = await Opazovalnica.fetchOpazovalnice()

      expect(opazovalnice).toHaveLength(opazovalniceStub.length)

      opazovalnice.forEach((opazovalnica, index) => {
        expect(opazovalnica).toBeInstanceOf(Opazovalnica)
        expect(opazovalnica.id).toEqual(opazovalniceStub[index]._id.toString())
        expect(opazovalnica.ime).toEqual(opazovalniceStub[index].ime)
        expect(opazovalnica.kapaciteta).toEqual(
          opazovalniceStub[index].kapaciteta
        )
        expect(opazovalnica.prespanje).toEqual(
          opazovalniceStub[index].prespanje
        )
        expect(opazovalnica.koordinate).toEqual(
          opazovalniceStub[index].koordinate
        )
        expect(opazovalnica.isDeleted).toEqual(
          opazovalniceStub[index].isDeleted
        )
      })
    })

    it("should return an empty array if no instances are found", async () => {
      OpazovalnicaModel.find = jest.fn().mockResolvedValue([])

      const opazovalnice = await Opazovalnica.fetchOpazovalnice()

      expect(opazovalnice).toHaveLength(0)
    })
  })

  describe("addOpazovalnica", () => {
    it("should add an instance of Opazovalnica", async () => {
      const opazovalnicaStub = CreateOpazovalnicaStub()

      OpazovalnicaModel.create = jest.fn().mockResolvedValue(opazovalnicaStub)
    })
  })

  describe("updateOpazovalnica", () => {
    it("should update an instance of Opazovalnica", async () => {
      const opazovalnicaStub = CreateOpazovalnicaStub()

      OpazovalnicaModel.findByIdAndUpdate = jest
        .fn()
        .mockResolvedValue(opazovalnicaStub)

      const opazovalnica = await Opazovalnica.updateOpazovalnica(
        opazovalnicaStub._id.toString(),
        "ime",
        10,
        true,
        [45.123, 14.123]
      )

      expect(opazovalnica).not.toBeNull()
      if (opazovalnica == null) return

      expect(opazovalnica).toBeInstanceOf(Opazovalnica)
      expect(opazovalnica.id).toEqual(opazovalnicaStub._id.toString())
      expect(opazovalnica.ime).toEqual(opazovalnicaStub.ime)
      expect(opazovalnica.kapaciteta).toEqual(opazovalnicaStub.kapaciteta)
      expect(opazovalnica.prespanje).toEqual(opazovalnicaStub.prespanje)
      expect(opazovalnica.koordinate).toEqual(opazovalnicaStub.koordinate)
    })

    it("should return null if no instance is found", async () => {
      OpazovalnicaModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null)

      const opazovalnica = await Opazovalnica.updateOpazovalnica(
        "invalidId",
        "ime",
        10,
        true,
        [45.123, 14.123]
      )

      expect(opazovalnica).toBeNull()
    })
  })

  describe("deleteOpazovalnica", () => {
    it("should delete an instance of Opazovalnica", async () => {
      const opazovalnicaStub = CreateOpazovalnicaStub()

      OpazovalnicaModel.findByIdAndUpdate = jest
        .fn()
        .mockResolvedValue(opazovalnicaStub)

      const result = await Opazovalnica.deleteOpazovalnica(
        opazovalnicaStub._id.toString()
      )

      expect(result).toBe(true)
    })

    it("should return true if no instance is found", async () => {
        OpazovalnicaModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null)
    
        const result = await Opazovalnica.deleteOpazovalnica("invalidId")
    
        expect(result).toBe(false)
    })
  })
})
