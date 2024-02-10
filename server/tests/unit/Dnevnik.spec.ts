import Dnevnik from "@entities/Dnevnik"
import { UporabnikDetails } from "@entities/Uporabnik"

import { CreateDnevnikStub } from "@stubs/CreateDnevnik.stub"
import { CreateDnevnikPripravnikStub } from "@stubs/CreateDnevnikPripravnik.stub"
import { CreateDnevnikPripravnikMentorStub } from "@stubs/CreateDnevnikPripravnikMentor.stub"

jest.mock("@models/dnevnikModel", () => ({
  find: jest.fn(),
  create: jest.fn(),
  findOneAndUpdate: jest.fn(),
  deleteOne: jest.fn(),
  populate: jest.fn(),
  exec: jest.fn(),
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
    it("should fetch dnevniki for a mentor", () => {})

    it("should fetch dnevniki for a mentor and a specific date", () => {})
  })

  describe("fetchDnevnikiPripravnik", () => {
    it("should fetch dnevniki for a pripravnik", () => {})

    it("should fetch dnevniki for a pripravnik and a specific date", () => {})
  })

  describe("vnesiDnevnik", () => {
    it("should create a new dnevnik", () => {})
  })

  describe("spremeniDnevnikStatus", () => {
    it("should update a dnevnik", () => {})
  })

  describe("deleteDnevnik", () => {
    it("should delete a dnevnik", () => {})
  })
})
