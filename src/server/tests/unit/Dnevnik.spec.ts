import Dnevnik from "@entities/Dnevnik"
import DnevnikModel from "@models/dnevnikModel"
import { UporabnikDetails } from "@entities/Uporabnik"

import { CreateDnevnikStub } from "@stubs/CreateDnevnik.stub"
import { CreateDnevnikPripravnikStub } from "@stubs/CreateDnevnikPripravnik.stub"
import { CreateDnevnikPripravnikMentorStub } from "@stubs/CreateDnevnikPripravnikMentor.stub"

jest.mock("@models/dnevnikModel", () => ({
  find: jest.fn(),
  create: jest.fn(),
  findOneAndUpdate: jest.fn(),
  deleteOne: jest.fn(),
}))

describe("Dnevnik", () => {
  describe("constructor", () => {
    it("should create a new instance of Dnevnik", () => {
      const dnevnikStub = CreateDnevnikStub()

      const dnevnik = new Dnevnik(
        dnevnikStub._id.toString(),
        dnevnikStub.pripravnik.toString(),
        dnevnikStub.mentor.toString(),
        dnevnikStub.datum.toISOString(),
        dnevnikStub.delo,
        dnevnikStub.ure,
        dnevnikStub.opis,
        dnevnikStub.status
      )

      expect(dnevnik).toBeInstanceOf(Dnevnik)
      expect(dnevnik.id).toEqual(dnevnikStub._id.toString())
      expect(dnevnik.pripravnikId).toEqual(dnevnikStub.pripravnik.toString())
      expect(dnevnik.mentorId).toEqual(dnevnikStub.mentor.toString())
      expect(dnevnik.datum).toEqual(dnevnikStub.datum.toISOString())
      expect(dnevnik.delo).toEqual(dnevnikStub.delo)
      expect(dnevnik.ure).toEqual(dnevnikStub.ure)
      expect(dnevnik.opis).toEqual(dnevnikStub.opis)
      expect(dnevnik.status).toEqual(dnevnikStub.status)
    })

    it("should create a new instance of Dnevnik with the Pripravnik details", () => {
      const dnevnikStub = CreateDnevnikPripravnikStub()

      const dnevnik = new Dnevnik(
        dnevnikStub._id.toString(),
        new UporabnikDetails(
          dnevnikStub.pripravnik._id.toString(),
          dnevnikStub.pripravnik.ime,
          dnevnikStub.pripravnik.priimek,
          dnevnikStub.pripravnik.slika,
          dnevnikStub.pripravnik.role
        ),
        dnevnikStub.mentor,
        dnevnikStub.datum.toISOString(),
        dnevnikStub.delo,
        dnevnikStub.ure,
        dnevnikStub.opis,
        dnevnikStub.status
      )

      expect(dnevnik).toBeInstanceOf(Dnevnik)
      expect(dnevnik.id).toEqual(dnevnikStub._id.toString())

      expect(dnevnik.pripravnikId).toBeInstanceOf(UporabnikDetails)
      expect(dnevnik.pripravnikId.id).toEqual(
        dnevnikStub.pripravnik._id.toString()
      )
      expect(dnevnik.pripravnikId.ime).toEqual(dnevnikStub.pripravnik.ime)
      expect(dnevnik.pripravnikId.priimek).toEqual(
        dnevnikStub.pripravnik.priimek
      )
      expect(dnevnik.pripravnikId.slika).toEqual(dnevnikStub.pripravnik.slika)
      expect(dnevnik.pripravnikId.role).toEqual(dnevnikStub.pripravnik.role)

      expect(dnevnik.mentorId).toEqual(dnevnikStub.mentor)
      expect(dnevnik.datum).toEqual(dnevnikStub.datum.toISOString())
      expect(dnevnik.delo).toEqual(dnevnikStub.delo)
      expect(dnevnik.ure).toEqual(dnevnikStub.ure)
      expect(dnevnik.opis).toEqual(dnevnikStub.opis)
      expect(dnevnik.status).toEqual(dnevnikStub.status)
    })

    it("should create a new instance of Dnevnik with the Pripravnik and Mentor details", () => {
      const dnevnikStub = CreateDnevnikPripravnikMentorStub()

      const dnevnik = new Dnevnik(
        dnevnikStub._id.toString(),
        new UporabnikDetails(
          dnevnikStub.pripravnik._id.toString(),
          dnevnikStub.pripravnik.ime,
          dnevnikStub.pripravnik.priimek,
          dnevnikStub.pripravnik.slika,
          dnevnikStub.pripravnik.role
        ),
        new UporabnikDetails(
          dnevnikStub.mentor._id.toString(),
          dnevnikStub.mentor.ime,
          dnevnikStub.mentor.priimek,
          dnevnikStub.mentor.slika,
          dnevnikStub.mentor.role
        ),
        dnevnikStub.datum.toISOString(),
        dnevnikStub.delo,
        dnevnikStub.ure,
        dnevnikStub.opis,
        dnevnikStub.status
      )

      expect(dnevnik).toBeInstanceOf(Dnevnik)
      expect(dnevnik.id).toEqual(dnevnikStub._id.toString())

      expect(dnevnik.pripravnikId).toBeInstanceOf(UporabnikDetails)
      expect(dnevnik.pripravnikId.id).toEqual(
        dnevnikStub.pripravnik._id.toString()
      )
      expect(dnevnik.pripravnikId.ime).toEqual(dnevnikStub.pripravnik.ime)
      expect(dnevnik.pripravnikId.priimek).toEqual(
        dnevnikStub.pripravnik.priimek
      )
      expect(dnevnik.pripravnikId.slika).toEqual(dnevnikStub.pripravnik.slika)
      expect(dnevnik.pripravnikId.role).toEqual(dnevnikStub.pripravnik.role)

      expect(dnevnik.mentorId).toBeInstanceOf(UporabnikDetails)
      expect(dnevnik.mentorId.id).toEqual(dnevnikStub.mentor._id.toString())
      expect(dnevnik.mentorId.ime).toEqual(dnevnikStub.mentor.ime)
      expect(dnevnik.mentorId.priimek).toEqual(dnevnikStub.mentor.priimek)
      expect(dnevnik.mentorId.slika).toEqual(dnevnikStub.mentor.slika)
      expect(dnevnik.mentorId.role).toEqual(dnevnikStub.mentor.role)
    })
  })

  describe("fetchDnevnikiMentor", () => {
    it("should fetch dnevniki for a mentor", async () => {
      const mockDnevnikiData = [CreateDnevnikPripravnikStub()]

      // @ts-ignore
      ;(DnevnikModel as jest.Mock).find.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockReturnValue(mockDnevnikiData),
        }),
      })

      const dnevniki = await Dnevnik.fetchDnevnikiMentor(
        "mockMentorId",
        "mockDatum"
      )

      expect(dnevniki).toHaveLength(mockDnevnikiData.length)
      expect(dnevniki[0]).toBeInstanceOf(Dnevnik)
      expect(dnevniki[0].id).toEqual(mockDnevnikiData[0]._id.toString())
      expect(dnevniki[0].pripravnikId).toBeInstanceOf(UporabnikDetails)
      expect(dnevniki[0].pripravnikId.id).toEqual(
        mockDnevnikiData[0].pripravnik._id.toString()
      )
      expect(dnevniki[0].pripravnikId.ime).toEqual(
        mockDnevnikiData[0].pripravnik.ime
      )
      expect(dnevniki[0].pripravnikId.priimek).toEqual(
        mockDnevnikiData[0].pripravnik.priimek
      )
      expect(dnevniki[0].pripravnikId.slika).toEqual(
        mockDnevnikiData[0].pripravnik.slika
      )
      expect(dnevniki[0].pripravnikId.role).toEqual(
        mockDnevnikiData[0].pripravnik.role
      )
      expect(dnevniki[0].mentorId).toEqual(
        mockDnevnikiData[0].mentor.toString()
      )
      expect(dnevniki[0].datum).toEqual(mockDnevnikiData[0].datum.toISOString())
      expect(dnevniki[0].delo).toEqual(mockDnevnikiData[0].delo)
      expect(dnevniki[0].ure).toEqual(mockDnevnikiData[0].ure)
      expect(dnevniki[0].opis).toEqual(mockDnevnikiData[0].opis)
      expect(dnevniki[0].status).toEqual(mockDnevnikiData[0].status)
    })
  })

  describe("fetchDnevnikiPripravnik", () => {
    it("should fetch dnevniki for a pripravnik", async () => {
      const mockDnevnikiData = [CreateDnevnikPripravnikMentorStub()]

      // @ts-ignore
      ;(DnevnikModel as jest.Mock).find.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            sort: jest.fn().mockReturnValue({
              skip: jest.fn().mockReturnValue({
                limit: jest.fn().mockReturnValue(mockDnevnikiData),
              }),
            }),
          }),
        }),
      })

      const dnevniki = await Dnevnik.fetchDnevnikiPripravnik("", 1)

      expect(dnevniki).toHaveLength(mockDnevnikiData.length)
      expect(dnevniki[0]).toBeInstanceOf(Dnevnik)
      expect(dnevniki[0].id).toEqual(mockDnevnikiData[0]._id.toString())
      expect(dnevniki[0].pripravnikId).toBeInstanceOf(UporabnikDetails)
      expect(dnevniki[0].pripravnikId.id).toEqual(
        mockDnevnikiData[0].pripravnik._id.toString()
      )
      expect(dnevniki[0].pripravnikId.ime).toEqual(
        mockDnevnikiData[0].pripravnik.ime
      )
      expect(dnevniki[0].pripravnikId.priimek).toEqual(
        mockDnevnikiData[0].pripravnik.priimek
      )
      expect(dnevniki[0].pripravnikId.slika).toEqual(
        mockDnevnikiData[0].pripravnik.slika
      )
      expect(dnevniki[0].pripravnikId.role).toEqual(
        mockDnevnikiData[0].pripravnik.role
      )
      expect(dnevniki[0].mentorId).toBeInstanceOf(UporabnikDetails)
      expect(dnevniki[0].mentorId.id).toEqual(
        mockDnevnikiData[0].mentor._id.toString()
      )
      expect(dnevniki[0].mentorId.ime).toEqual(mockDnevnikiData[0].mentor.ime)
      expect(dnevniki[0].mentorId.priimek).toEqual(
        mockDnevnikiData[0].mentor.priimek
      )
      expect(dnevniki[0].mentorId.slika).toEqual(
        mockDnevnikiData[0].mentor.slika
      )
      expect(dnevniki[0].mentorId.role).toEqual(mockDnevnikiData[0].mentor.role)
      expect(dnevniki[0].datum).toEqual(mockDnevnikiData[0].datum.toISOString())
      expect(dnevniki[0].delo).toEqual(mockDnevnikiData[0].delo)
      expect(dnevniki[0].ure).toEqual(mockDnevnikiData[0].ure)
      expect(dnevniki[0].opis).toEqual(mockDnevnikiData[0].opis)
      expect(dnevniki[0].status).toEqual(mockDnevnikiData[0].status)
    })
  })

  describe("vnesiDnevnik", () => {
    it("should create a new dnevnik", async () => {
      const dnevnikStub = CreateDnevnikStub()

      // @ts-ignore
      ;(DnevnikModel as jest.Mock).create.mockReturnValue(dnevnikStub)

      const dnevnik = await Dnevnik.vnesiDnevnik(
        dnevnikStub.pripravnik.toString(),
        dnevnikStub.mentor.toString(),
        dnevnikStub.datum.toISOString(),
        dnevnikStub.ure,
        dnevnikStub.opis,
        dnevnikStub.delo
      )

      expect(dnevnik).not.toBeNull()
      if (dnevnik) {
        expect(dnevnik).toBeInstanceOf(Dnevnik)
        expect(dnevnik.id).toEqual(dnevnikStub._id.toString())
        expect(dnevnik.pripravnikId).toEqual(dnevnikStub.pripravnik.toString())
        expect(dnevnik.mentorId).toEqual(dnevnikStub.mentor.toString())
        expect(dnevnik.datum).toEqual(dnevnikStub.datum.toISOString())
        expect(dnevnik.delo).toEqual(dnevnikStub.delo)
        expect(dnevnik.ure).toEqual(dnevnikStub.ure)
        expect(dnevnik.opis).toEqual(dnevnikStub.opis)
        expect(dnevnik.status).toEqual(dnevnikStub.status)
      }
    })
  })

  describe("spremeniDnevnikStatus", () => {
    it("should update a dnevnik", async () => {
      const dnevnikStub = CreateDnevnikStub()

      // @ts-ignore
      ;(DnevnikModel as jest.Mock).findOneAndUpdate.mockReturnValue(dnevnikStub)

      const dnevnik = await Dnevnik.spremeniStatusDnevnik("id", "status")

      expect(dnevnik).not.toBeNull()

      if (dnevnik) {
        expect(dnevnik).toBeInstanceOf(Dnevnik)
        expect(dnevnik.id).toEqual(dnevnikStub._id.toString())
        expect(dnevnik.pripravnikId).toEqual(dnevnikStub.pripravnik.toString())
        expect(dnevnik.mentorId).toEqual(dnevnikStub.mentor.toString())
        expect(dnevnik.datum).toEqual(dnevnikStub.datum.toISOString())
        expect(dnevnik.delo).toEqual(dnevnikStub.delo)
        expect(dnevnik.ure).toEqual(dnevnikStub.ure)
        expect(dnevnik.opis).toEqual(dnevnikStub.opis)
        expect(dnevnik.status).toEqual(dnevnikStub.status)
      }
    })
  })

  describe("deleteDnevnik", () => {
    it("should delete a dnevnik", async () => {
      const dnevnikStub = CreateDnevnikStub()

      // @ts-ignore
      ;(DnevnikModel as jest.Mock).deleteOne.mockReturnValue({
        deletedCount: 1,
      })

      const dnevnik = await Dnevnik.deleteDnevnik(dnevnikStub._id.toString())

      expect(dnevnik).not.toBeNull()
      expect(dnevnik).toEqual(true)
    })
  })
})
