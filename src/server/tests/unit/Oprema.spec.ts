import Oprema from "@entities/Oprema"
import OpremaModel from "@models/opremaModel"

import { CreateOpremaStub } from "@stubs/CreateOprema.stub"

jest.mock("@models/opremaModel", () => ({
  find: jest.fn(),
  create: jest.fn(),
  findOneAndDelete: jest.fn(),
}))

describe("Oprema", () => {
  describe("constructor", () => {
    it("should create an instance of Oprema", () => {
      const opremaStub = CreateOpremaStub()

      const oprema = new Oprema(
        opremaStub._id.toString(),
        opremaStub.lastnik.toString(),
        opremaStub.naziv,
        opremaStub.tip,
        opremaStub.stanje,
        opremaStub.datum.toISOString()
      )

      expect(oprema).toBeInstanceOf(Oprema)
      expect(oprema.id).toEqual(opremaStub._id.toString())
      expect(oprema.lastnik).toEqual(opremaStub.lastnik.toString())
      expect(oprema.naziv).toEqual(opremaStub.naziv)
      expect(oprema.tip).toEqual(opremaStub.tip)
      expect(oprema.stanje).toEqual(opremaStub.stanje)
      expect(oprema.datum).toEqual(opremaStub.datum.toISOString())
    })
  })

  describe("fetchUporabnikOprema", () => {
    it("should fetch all Oprema for a user", async () => {
      const opremaStub = [CreateOpremaStub()]

      OpremaModel.find = jest.fn().mockReturnValue(opremaStub)

      const oprema = await Oprema.fetchUporabnikOprema(
        "65c80054921864fcfd09604f"
      )

      expect(oprema).toHaveLength(opremaStub.length)

      oprema.forEach((opremaInstance, index) => {
        expect(opremaInstance).toBeInstanceOf(Oprema)
        expect(opremaInstance.id).toEqual(opremaStub[index]._id.toString())
        expect(opremaInstance.lastnik).toEqual(
          opremaStub[index].lastnik.toString()
        )
        expect(opremaInstance.naziv).toEqual(opremaStub[index].naziv)
        expect(opremaInstance.tip).toEqual(opremaStub[index].tip)
        expect(opremaInstance.stanje).toEqual(opremaStub[index].stanje)
        expect(opremaInstance.datum).toEqual(
          opremaStub[index].datum.toISOString()
        )
      })
    })

    it("should return an empty array of Oprema instances if user has no Oprema", async () => {
      OpremaModel.find = jest.fn().mockReturnValue([])

      const oprema = await Oprema.fetchUporabnikOprema(
        "65c80054921864fcfd09604f"
      )

      expect(oprema).toHaveLength(0)
    })
  })

  describe("vnesiOprema", () => {
    it("should create a new Oprema instance and return it", async () => {
      const opremaStub = CreateOpremaStub()

      OpremaModel.create = jest.fn().mockReturnValue(opremaStub)

      const oprema = await Oprema.vnesiOprema(
        opremaStub.lastnik.toString(),
        opremaStub.naziv,
        opremaStub.tip,
        opremaStub.stanje
      )

      expect(oprema).toBeInstanceOf(Oprema)
      expect(oprema.id).toEqual(opremaStub._id.toString())
      expect(oprema.lastnik).toEqual(opremaStub.lastnik.toString())
      expect(oprema.naziv).toEqual(opremaStub.naziv)
      expect(oprema.tip).toEqual(opremaStub.tip)
      expect(oprema.stanje).toEqual(opremaStub.stanje)
      expect(oprema.datum).toEqual(opremaStub.datum.toISOString())
    })
  })

  describe("izbrisiOprema", () => {
    it("should delete an Oprema", async () => {
      const opremaStub = CreateOpremaStub()

      OpremaModel.findOneAndDelete = jest.fn().mockReturnValue(opremaStub)

      const deleted = await Oprema.izbrisiOprema(
        opremaStub.lastnik.toString(),
        opremaStub._id.toString()
      )

      expect(deleted).toBe(true)
    })

    it("should fail to delete an Oprema that does not exist", async () => {
      const opremaStub = CreateOpremaStub()

      OpremaModel.findOneAndDelete = jest.fn().mockReturnValue(null)

      const deleted = await Oprema.izbrisiOprema(
        opremaStub.lastnik.toString(),
        opremaStub._id.toString()
      )

      expect(deleted).toBe(false)
    })
  })
})
