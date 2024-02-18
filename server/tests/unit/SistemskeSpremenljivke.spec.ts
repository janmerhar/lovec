import SistemskeSpremenljivke from "@entities/SistemskeSpremenljivke"
import SistemskeSpremenljivkeModel from "@models/sistemskeSpremenljivkeModel"

import { CreateSistemskeSpremenljivkeStub } from "@stubs/CreateSistemskeSpremenljivke.stub"

jest.mock("@models/sistemskeSpremenljivkeModel", () => ({
  find: jest.fn(),
  create: jest.fn(),
}))

describe("SistemskeSpremenljivke", () => {
  describe("constructor", () => {
    it("should create an instance of SistemskeSpremenljivke with string id and date", () => {
      const sistemskeSpremenljivkeStub = CreateSistemskeSpremenljivkeStub()

      const sistemskeSpremenljivke = new SistemskeSpremenljivke(
        sistemskeSpremenljivkeStub._id.toString(),
        sistemskeSpremenljivkeStub.datum.toISOString(),
        sistemskeSpremenljivkeStub.PAGE_SIZE,
        sistemskeSpremenljivkeStub.JAGA_MAX_MEMBERS,
        sistemskeSpremenljivkeStub.OBISK_MAX_LENGTH,
        sistemskeSpremenljivkeStub.USER_OBISKS_MAX_LENGTH
      )

      expect(sistemskeSpremenljivke).toBeInstanceOf(SistemskeSpremenljivke)
      expect(sistemskeSpremenljivke.id).toEqual(
        sistemskeSpremenljivkeStub._id.toString()
      )
      expect(sistemskeSpremenljivke.datum).toEqual(
        sistemskeSpremenljivkeStub.datum
      )
      expect(sistemskeSpremenljivke.PAGE_SIZE).toEqual(
        sistemskeSpremenljivkeStub.PAGE_SIZE
      )
      expect(sistemskeSpremenljivke.JAGA_MAX_MEMBERS).toEqual(
        sistemskeSpremenljivkeStub.JAGA_MAX_MEMBERS
      )
      expect(sistemskeSpremenljivke.OBISK_MAX_LENGTH).toEqual(
        sistemskeSpremenljivkeStub.OBISK_MAX_LENGTH
      )
      expect(sistemskeSpremenljivke.USER_OBISKS_MAX_LENGTH).toEqual(
        sistemskeSpremenljivkeStub.USER_OBISKS_MAX_LENGTH
      )
    })

    it("should create an instance of SistemskeSpremenljivke", () => {
      const sistemskeSpremenljivkeStub = CreateSistemskeSpremenljivkeStub()

      const sistemskeSpremenljivke = new SistemskeSpremenljivke(
        sistemskeSpremenljivkeStub._id.toString(),
        sistemskeSpremenljivkeStub.datum,
        sistemskeSpremenljivkeStub.PAGE_SIZE,
        sistemskeSpremenljivkeStub.JAGA_MAX_MEMBERS,
        sistemskeSpremenljivkeStub.OBISK_MAX_LENGTH,
        sistemskeSpremenljivkeStub.USER_OBISKS_MAX_LENGTH
      )

      expect(sistemskeSpremenljivke).toBeInstanceOf(SistemskeSpremenljivke)
      expect(sistemskeSpremenljivke.id).toEqual(
        sistemskeSpremenljivkeStub._id.toString()
      )
      expect(sistemskeSpremenljivke.datum).toEqual(
        sistemskeSpremenljivkeStub.datum
      )
      expect(sistemskeSpremenljivke.PAGE_SIZE).toEqual(
        sistemskeSpremenljivkeStub.PAGE_SIZE
      )
      expect(sistemskeSpremenljivke.JAGA_MAX_MEMBERS).toEqual(
        sistemskeSpremenljivkeStub.JAGA_MAX_MEMBERS
      )
      expect(sistemskeSpremenljivke.OBISK_MAX_LENGTH).toEqual(
        sistemskeSpremenljivkeStub.OBISK_MAX_LENGTH
      )
      expect(sistemskeSpremenljivke.USER_OBISKS_MAX_LENGTH).toEqual(
        sistemskeSpremenljivkeStub.USER_OBISKS_MAX_LENGTH
      )
    })
  })

  describe("createInstance", () => {
    it("should create an instance of SistemskeSpremenljivke", async () => {
      const sistemskeSpremenljivkeStub = CreateSistemskeSpremenljivkeStub()

      SistemskeSpremenljivkeModel.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue([sistemskeSpremenljivkeStub]),
        }),
      })

      const sistemskeSpremenljivke =
        await SistemskeSpremenljivke.createInstance()

      expect(sistemskeSpremenljivke).toBeInstanceOf(SistemskeSpremenljivke)
      expect(sistemskeSpremenljivke.id).toEqual(
        sistemskeSpremenljivkeStub._id.toString()
      )
      expect(sistemskeSpremenljivke.datum).toEqual(
        sistemskeSpremenljivkeStub.datum
      )
      expect(sistemskeSpremenljivke.PAGE_SIZE).toEqual(
        sistemskeSpremenljivkeStub.PAGE_SIZE
      )
      expect(sistemskeSpremenljivke.JAGA_MAX_MEMBERS).toEqual(
        sistemskeSpremenljivkeStub.JAGA_MAX_MEMBERS
      )
      expect(sistemskeSpremenljivke.OBISK_MAX_LENGTH).toEqual(
        sistemskeSpremenljivkeStub.OBISK_MAX_LENGTH
      )
      expect(sistemskeSpremenljivke.USER_OBISKS_MAX_LENGTH).toEqual(
        sistemskeSpremenljivkeStub.USER_OBISKS_MAX_LENGTH
      )
    })
  })

  describe("fetchSistemskeSpremenljivke", () => {
    it("should return a single instance of SistemskeSpremenljivke from the database", async () => {
      const sistemskeSpremenljivkeStub = CreateSistemskeSpremenljivkeStub()

      SistemskeSpremenljivkeModel.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue([sistemskeSpremenljivkeStub]),
        }),
      })

      const sistemskeSpremenljivke =
        await SistemskeSpremenljivke.fetchSistemskeSpremenljivke()

      expect(sistemskeSpremenljivke._id.toString()).toEqual(
        sistemskeSpremenljivkeStub._id.toString()
      )
      expect(sistemskeSpremenljivke.datum).toEqual(
        sistemskeSpremenljivkeStub.datum
      )
      expect(sistemskeSpremenljivke.PAGE_SIZE).toEqual(
        sistemskeSpremenljivkeStub.PAGE_SIZE
      )
      expect(sistemskeSpremenljivke.JAGA_MAX_MEMBERS).toEqual(
        sistemskeSpremenljivkeStub.JAGA_MAX_MEMBERS
      )
      expect(sistemskeSpremenljivke.OBISK_MAX_LENGTH).toEqual(
        sistemskeSpremenljivkeStub.OBISK_MAX_LENGTH
      )
      expect(sistemskeSpremenljivke.USER_OBISKS_MAX_LENGTH).toEqual(
        sistemskeSpremenljivkeStub.USER_OBISKS_MAX_LENGTH
      )
    })
  })

  describe("insertSistemskeSpremenljivke", () => {
    it("should insert a single instance of SistemskeSpremenljivke", async () => {
      const sistemskeSpremenljivkeStub = CreateSistemskeSpremenljivkeStub()

      SistemskeSpremenljivkeModel.create = jest
        .fn()
        .mockReturnValue(sistemskeSpremenljivkeStub)

      const sistemskeSpremenljivke =
        await SistemskeSpremenljivke.insertSistemskeSpremenljivke(
          sistemskeSpremenljivkeStub.PAGE_SIZE,
          sistemskeSpremenljivkeStub.JAGA_MAX_MEMBERS,
          sistemskeSpremenljivkeStub.OBISK_MAX_LENGTH,
          sistemskeSpremenljivkeStub.USER_OBISKS_MAX_LENGTH
        )

      expect(sistemskeSpremenljivke._id.toString()).toEqual(
        sistemskeSpremenljivkeStub._id.toString()
      )
      expect(sistemskeSpremenljivke.datum).toEqual(
        sistemskeSpremenljivkeStub.datum
      )
      expect(sistemskeSpremenljivke.PAGE_SIZE).toEqual(
        sistemskeSpremenljivkeStub.PAGE_SIZE
      )
      expect(sistemskeSpremenljivke.JAGA_MAX_MEMBERS).toEqual(
        sistemskeSpremenljivkeStub.JAGA_MAX_MEMBERS
      )
      expect(sistemskeSpremenljivke.OBISK_MAX_LENGTH).toEqual(
        sistemskeSpremenljivkeStub.OBISK_MAX_LENGTH
      )
      expect(sistemskeSpremenljivke.USER_OBISKS_MAX_LENGTH).toEqual(
        sistemskeSpremenljivkeStub.USER_OBISKS_MAX_LENGTH
      )
    })
  })

  describe("updateSistemskeSpremenljivke", () => {
    it("should update a single instance of SistemskeSpremenljivke in the database", async () => {
      const sistemskeSpremenljivkeStub = CreateSistemskeSpremenljivkeStub()

      SistemskeSpremenljivke.insertSistemskeSpremenljivke = jest
        .fn()
        .mockReturnValue(sistemskeSpremenljivkeStub)

      const sistemskeSpremenljivke = new SistemskeSpremenljivke(
        sistemskeSpremenljivkeStub._id.toString(),
        sistemskeSpremenljivkeStub.datum,
        sistemskeSpremenljivkeStub.PAGE_SIZE,
        sistemskeSpremenljivkeStub.JAGA_MAX_MEMBERS,
        sistemskeSpremenljivkeStub.OBISK_MAX_LENGTH,
        sistemskeSpremenljivkeStub.USER_OBISKS_MAX_LENGTH
      )

      const updatedSistemskeSpremenljivke =
        await sistemskeSpremenljivke.updateSistemskeSpremenljivke(
          sistemskeSpremenljivkeStub.PAGE_SIZE,
          sistemskeSpremenljivkeStub.JAGA_MAX_MEMBERS,
          sistemskeSpremenljivkeStub.OBISK_MAX_LENGTH,
          sistemskeSpremenljivkeStub.USER_OBISKS_MAX_LENGTH
        )

      expect(updatedSistemskeSpremenljivke).toBeInstanceOf(
        SistemskeSpremenljivke
      )
      expect(updatedSistemskeSpremenljivke.id).toEqual(
        sistemskeSpremenljivkeStub._id.toString()
      )
      expect(updatedSistemskeSpremenljivke.datum).toEqual(
        sistemskeSpremenljivkeStub.datum
      )
      expect(updatedSistemskeSpremenljivke.PAGE_SIZE).toEqual(
        sistemskeSpremenljivkeStub.PAGE_SIZE
      )
      expect(updatedSistemskeSpremenljivke.JAGA_MAX_MEMBERS).toEqual(
        sistemskeSpremenljivkeStub.JAGA_MAX_MEMBERS
      )
      expect(updatedSistemskeSpremenljivke.OBISK_MAX_LENGTH).toEqual(
        sistemskeSpremenljivkeStub.OBISK_MAX_LENGTH
      )
      expect(updatedSistemskeSpremenljivke.USER_OBISKS_MAX_LENGTH).toEqual(
        sistemskeSpremenljivkeStub.USER_OBISKS_MAX_LENGTH
      )
    })
  })
})
