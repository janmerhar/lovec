import VplenModel from "@models/vplenModel"
import Vplen, { VplenDetails } from "@entities/Vplen"

import { CreateVplenStub } from "@stubs/CreateVplen.stub"
import { CreateVplenDetailsStub } from "@stubs/CreateVplenDetails.stub"

jest.mock("@models/druzinaModel", () => ({
  aggregate: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  findOneAndDelete: jest.fn(),
}))

describe("VplenDetails", () => {
  describe("constructor", () => {
    it("should create an instance of VplenDetails", () => {
      const vplenDetailsStub = CreateVplenDetailsStub()

      const vplenDetails = new VplenDetails(
        vplenDetailsStub.datum.toISOString(),
        vplenDetailsStub.zivali
      )

      expect(vplenDetails).toBeInstanceOf(VplenDetails)
      expect(vplenDetails.datum).toEqual(vplenDetailsStub.datum.toISOString())
      expect(vplenDetails.zivali).toEqual(vplenDetailsStub.zivali)
    })
  })
})

describe("Vplen", () => {
  describe("constructor", () => {
    it("should create a new instance of Vplen", () => {
      const vplenStub = CreateVplenStub()

      const vplen = new Vplen(
        vplenStub._id.toString(),
        vplenStub.uporabnik.toString(),
        vplenStub.koordinate,
        vplenStub.zival,
        vplenStub.teza,
        vplenStub.datum.toISOString(),
        vplenStub.bolezni
      )

      expect(vplen).toBeInstanceOf(Vplen)
      expect(vplen.id).toEqual(vplenStub._id.toString())
      expect(vplen.uporabnik).toEqual(vplenStub.uporabnik.toString())
      expect(vplen.koordinate).toEqual(vplenStub.koordinate)
      expect(vplen.zival).toEqual(vplenStub.zival)
      expect(vplen.teza).toEqual(vplenStub.teza)
      expect(vplen.datum).toEqual(vplenStub.datum.toISOString())
      expect(vplen.bolezni).toEqual(vplenStub.bolezni)
    })
  })

  describe("fetchVpleni", () => {
    it("should fetch an array of Vpleni for a specific user and page number", async () => {
      const vpleniStub = [CreateVplenDetailsStub()]

      VplenModel.aggregate = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue(vpleniStub),
          }),
        }),
      })

      const vpleni = await Vplen.fetchVpleni("65c8f8f599233caa6bcb3af4", 1, 10)

      expect(vpleni.length).toEqual(vpleniStub.length)

      vpleni.forEach((vplen, index) => {
        expect(vplen).toBeInstanceOf(VplenDetails)
        expect(vplen.datum).toEqual(vpleniStub[index].datum)
        expect(vplen.zivali).toEqual(vpleniStub[index].zivali)
      })
    })
  })

  describe("fetchVpleniDatun", () => {
    it("should fetch an array of Vpleni for a specific user and date", async () => {
      const vpleniStub = [CreateVplenStub()]

      VplenModel.find = jest.fn().mockResolvedValue(vpleniStub)

      const vpleni = await Vplen.fetchVpleniDatum(
        "65c8f8f599233caa6bcb3af4",
        "2021-09-10"
      )

      expect(vpleni.length).toEqual(vpleniStub.length)
      vpleni.forEach((vplen, index) => {
        expect(vplen).toBeInstanceOf(Vplen)
        expect(vplen.id).toEqual(vpleniStub[index]._id.toString())
        expect(vplen.uporabnik).toEqual(vpleniStub[index].uporabnik.toString())
        expect(vplen.koordinate).toEqual(vpleniStub[index].koordinate)
        expect(vplen.zival).toEqual(vpleniStub[index].zival)
        expect(vplen.teza).toEqual(vpleniStub[index].teza)
        expect(vplen.datum).toEqual(vpleniStub[index].datum.toISOString())
        expect(vplen.bolezni).toEqual(vpleniStub[index].bolezni)
      })
    })
  })

  describe("vnesiVplen", () => {
    it("should create a new instance of Vplen and return it if successful", async () => {
      const vplenStub = CreateVplenStub()

      VplenModel.create = jest.fn().mockResolvedValue(vplenStub)

      const vplen = await Vplen.vnesiVplen(
        vplenStub.uporabnik.toString(),
        vplenStub.koordinate,
        vplenStub.zival,
        vplenStub.teza,
        vplenStub.datum.toISOString(),
        vplenStub.bolezni
      )

      expect(vplen).toBeInstanceOf(Vplen)
      expect(vplen.id).toEqual(vplenStub._id.toString())
      expect(vplen.uporabnik).toEqual(vplenStub.uporabnik.toString())
      expect(vplen.koordinate).toEqual(vplenStub.koordinate)
      expect(vplen.zival).toEqual(vplenStub.zival)
      expect(vplen.teza).toEqual(vplenStub.teza)
      expect(vplen.datum).toEqual(vplenStub.datum.toISOString())
      expect(vplen.bolezni).toEqual(vplenStub.bolezni)
    })
  })

  describe("izbrisiVplen", () => {
    it("should return true if the Vplen was successfully deleted", async () => {
      const vplenStub = CreateVplenStub()

      VplenModel.findOneAndDelete = jest.fn().mockResolvedValue(vplenStub)

      const result = await Vplen.izbrisiVplen(
        vplenStub.uporabnik.toString(),
        vplenStub._id.toString()
      )

      expect(result).toBe(true)
    })

    it("should return false if the Vplen was successfully deleted", async () => {
      VplenModel.findOneAndDelete = jest.fn().mockResolvedValue(null)

      const result = await Vplen.izbrisiVplen("invalidId", "invalidId")

      expect(result).toBe(false)
    })
  })
})
