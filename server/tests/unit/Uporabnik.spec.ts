import Uporabnik, {
  UporabnikDetails,
  UporabnikProfile,
} from "@entities/Uporabnik"
import { DruzinaDetails } from "@entities/Druzina"

import { CreateUporabnikAdmin } from "@stubs/CreateUporabnikAdmin.stub"
import { CreateUporabnikPripravnikFull } from "@stubs/CreateUporabnikPripravnikFull.stub"
import { CreateUporabnikLovecFull } from "@stubs/CreateUporabnikLovecFull"
import { CreateUporabnikPripravnik } from "@stubs/CreateUporabnikPripravnik.stub"
import { CreateUporabnikLovec } from "@stubs/CreateUporabnikLovec.stub"

describe("UporabnikDetails", () => {
  describe("constructor", () => {
    it("should create an instance of UporabnikDetails", () => {
      const uporabnikStub = CreateUporabnikAdmin()

      const uporabnik = new UporabnikDetails(
        uporabnikStub._id.toString(),
        uporabnikStub.ime,
        uporabnikStub.priimek,
        uporabnikStub.slika,
        uporabnikStub.role
      )

      expect(uporabnik).toBeInstanceOf(UporabnikDetails)
      expect(uporabnik.id).toEqual(uporabnikStub._id.toString())
      expect(uporabnik.ime).toEqual(uporabnikStub.ime)
      expect(uporabnik.priimek).toEqual(uporabnikStub.priimek)
      expect(uporabnik.slika).toEqual(uporabnikStub.slika)
      expect(uporabnik.role).toEqual(uporabnikStub.role)
    })
  })
})

describe("UporabnikProfile", () => {
  describe("constructor", () => {
    it("should create an instance of UporabnikProfile for Admin", () => {
      const uporabnikStub = CreateUporabnikAdmin()

      const uporabnik = new UporabnikProfile(
        uporabnikStub._id.toString(),
        uporabnikStub.ime,
        uporabnikStub.priimek,
        uporabnikStub.slika,
        uporabnikStub.role,
        uporabnikStub.mentor as null,
        uporabnikStub.pripravniki as null,
        uporabnikStub.druzina as null,
        uporabnikStub.isDeleted
      )

      expect(uporabnik).toBeInstanceOf(UporabnikDetails)
      expect(uporabnik.id).toEqual(uporabnikStub._id.toString())
      expect(uporabnik.ime).toEqual(uporabnikStub.ime)
      expect(uporabnik.priimek).toEqual(uporabnikStub.priimek)
      expect(uporabnik.slika).toEqual(uporabnikStub.slika)
      expect(uporabnik.role).toEqual(uporabnikStub.role)
      expect(uporabnik.mentor).toEqual(uporabnik.mentor)
      expect(uporabnik.pripravniki).toEqual(uporabnik.pripravniki)
      expect(uporabnik.druzina).toEqual(uporabnik.druzina)
      expect(uporabnik.isDeleted).toEqual(uporabnik.isDeleted)
    })

    it("should create an instance of UporabnikProfile for Pripravnik", () => {
      const uporabnikStub = CreateUporabnikPripravnikFull()

      const uporabnik = new UporabnikProfile(
        uporabnikStub._id.toString(),
        uporabnikStub.ime,
        uporabnikStub.priimek,
        uporabnikStub.slika,
        uporabnikStub.role,
        new UporabnikDetails(
          uporabnikStub.mentor?._id.toString() as string,
          uporabnikStub.mentor?.ime as string,
          uporabnikStub.mentor?.priimek as string,
          uporabnikStub.mentor?.slika as string,
          uporabnikStub.mentor?.role as string
        ),
        uporabnikStub.pripravniki as null,
        new DruzinaDetails(
          uporabnikStub.druzina?._id.toString() as string,
          uporabnikStub.druzina?.ime as string,
          uporabnikStub.druzina?.revirjiCount as number,
          uporabnikStub.druzina?.claniCount as number
        ),
        uporabnikStub.isDeleted
      )

      expect(uporabnik).toBeInstanceOf(UporabnikDetails)
      expect(uporabnik.id).toEqual(uporabnikStub._id.toString())
      expect(uporabnik.ime).toEqual(uporabnikStub.ime)
      expect(uporabnik.priimek).toEqual(uporabnikStub.priimek)
      expect(uporabnik.slika).toEqual(uporabnikStub.slika)
      expect(uporabnik.role).toEqual(uporabnikStub.role)

      expect(uporabnik.mentor).toBeInstanceOf(UporabnikDetails)
      expect(uporabnik.mentor?.id).toEqual(uporabnikStub.mentor?._id.toString())
      expect(uporabnik.mentor?.ime).toEqual(uporabnikStub.mentor?.ime)
      expect(uporabnik.mentor?.priimek).toEqual(uporabnikStub.mentor?.priimek)
      expect(uporabnik.mentor?.slika).toEqual(uporabnikStub.mentor?.slika)
      expect(uporabnik.mentor?.role).toEqual(uporabnikStub.mentor?.role)

      expect(uporabnik.pripravniki).toEqual(uporabnik.pripravniki)

      expect(uporabnik.druzina).toBeInstanceOf(DruzinaDetails)
      expect(uporabnik.druzina?.id).toEqual(
        uporabnikStub.druzina?._id.toString()
      )
      expect(uporabnik.druzina?.ime).toEqual(uporabnikStub.druzina?.ime)
      expect(uporabnik.druzina?.revirjiCount).toEqual(
        uporabnikStub.druzina?.revirjiCount
      )
      expect(uporabnik.druzina?.claniCount).toEqual(
        uporabnikStub.druzina?.claniCount
      )

      expect(uporabnik.isDeleted).toEqual(uporabnik.isDeleted)
    })

    it("should create an instance of UporabnikProfile for Lovec", () => {
      const uporabnikStub = CreateUporabnikLovecFull()

      const uporabnik = new UporabnikProfile(
        uporabnikStub._id.toString(),
        uporabnikStub.ime,
        uporabnikStub.priimek,
        uporabnikStub.slika,
        uporabnikStub.role,
        uporabnikStub.mentor as null,
        uporabnikStub.pripravniki?.map((pripravnik) => {
          return new UporabnikDetails(
            pripravnik._id.toString() as string,
            pripravnik.ime as string,
            pripravnik.priimek as string,
            pripravnik.slika as string,
            pripravnik.role as string
          )
        }) as UporabnikDetails[],
        new DruzinaDetails(
          uporabnikStub.druzina?._id.toString() as string,
          uporabnikStub.druzina?.ime as string,
          uporabnikStub.druzina?.revirjiCount as number,
          uporabnikStub.druzina?.claniCount as number
        ),
        uporabnikStub.isDeleted
      )

      expect(uporabnik).toBeInstanceOf(UporabnikDetails)
      expect(uporabnik.id).toEqual(uporabnikStub._id.toString())
      expect(uporabnik.ime).toEqual(uporabnikStub.ime)
      expect(uporabnik.priimek).toEqual(uporabnikStub.priimek)
      expect(uporabnik.slika).toEqual(uporabnikStub.slika)
      expect(uporabnik.role).toEqual(uporabnikStub.role)
      expect(uporabnik.mentor).toEqual(uporabnik.mentor)

      uporabnik.pripravniki?.forEach((pripravnik, index) => {
        expect(pripravnik).toBeInstanceOf(UporabnikDetails)
        expect(pripravnik.id).toEqual(
          uporabnikStub.pripravniki?.[index]._id.toString()
        )
        expect(pripravnik.ime).toEqual(uporabnikStub.pripravniki?.[index].ime)
        expect(pripravnik.priimek).toEqual(
          uporabnikStub.pripravniki?.[index].priimek
        )
        expect(pripravnik.slika).toEqual(
          uporabnikStub.pripravniki?.[index].slika
        )
        expect(pripravnik.role).toEqual(uporabnikStub.pripravniki?.[index].role)
      })

      expect(uporabnik.druzina).toBeInstanceOf(DruzinaDetails)
      expect(uporabnik.druzina?.id).toEqual(
        uporabnikStub.druzina?._id.toString()
      )
      expect(uporabnik.druzina?.ime).toEqual(uporabnikStub.druzina?.ime)
      expect(uporabnik.druzina?.revirjiCount).toEqual(
        uporabnikStub.druzina?.revirjiCount
      )
      expect(uporabnik.druzina?.claniCount).toEqual(
        uporabnikStub.druzina?.claniCount
      )

      expect(uporabnik.isDeleted).toEqual(uporabnik.isDeleted)
    })
  })
})

describe("Uporabnik", () => {
  describe("constructor", () => {
    it("should create an instance of Uporabnik for Admin", () => {
      const uporabnikStub = CreateUporabnikAdmin()

      const uporabnik = new Uporabnik(
        uporabnikStub._id.toString(),
        uporabnikStub.ime,
        uporabnikStub.priimek,
        uporabnikStub.slika,
        uporabnikStub.rojstniDatum?.toISOString() as string,
        uporabnikStub.email,
        uporabnikStub.hash,
        uporabnikStub.role,
        uporabnikStub.mentor as null,
        uporabnikStub.pripravniki as null,
        uporabnikStub.druzina as null,
        uporabnikStub.isDeleted,
        uporabnikStub.refresh_token
      )

      expect(uporabnik).toBeInstanceOf(Uporabnik)
      expect(uporabnik.id).toEqual(uporabnikStub._id.toString())
      expect(uporabnik.ime).toEqual(uporabnikStub.ime)
      expect(uporabnik.priimek).toEqual(uporabnikStub.priimek)
      expect(uporabnik.slika).toEqual(uporabnikStub.slika)
      expect(uporabnik.role).toEqual(uporabnikStub.role)
      expect(uporabnik.rojstniDatum).toEqual(
        uporabnikStub.rojstniDatum?.toISOString()
      )
      expect(uporabnik.email).toEqual(uporabnikStub.email)
      expect(uporabnik.hash).toEqual(uporabnikStub.hash)
      expect(uporabnik.mentor).toEqual(uporabnikStub.mentor)
      expect(uporabnik.pripravniki).toEqual(uporabnikStub.pripravniki)
      expect(uporabnik.druzina).toEqual(uporabnikStub.druzina)
      expect(uporabnik.isDeleted).toEqual(uporabnikStub.isDeleted)
      expect(uporabnik.refresh_token).toEqual(uporabnikStub.refresh_token)
    })

    it("should create an instance of Uporabnik for Pripravnik", () => {
      const uporabnikStub = CreateUporabnikPripravnik()

      const uporabnik = new Uporabnik(
        uporabnikStub._id.toString(),
        uporabnikStub.ime,
        uporabnikStub.priimek,
        uporabnikStub.slika,
        uporabnikStub.rojstniDatum?.toISOString() as string,
        uporabnikStub.email,
        uporabnikStub.hash,
        uporabnikStub.role,
        uporabnikStub.mentor as unknown as string,
        uporabnikStub.pripravniki as unknown as string[],
        uporabnikStub.druzina as unknown as string,
        uporabnikStub.isDeleted,
        uporabnikStub.refresh_token
      )

      expect(uporabnik).toBeInstanceOf(Uporabnik)
      expect(uporabnik.id).toEqual(uporabnikStub._id.toString())
      expect(uporabnik.ime).toEqual(uporabnikStub.ime)
      expect(uporabnik.priimek).toEqual(uporabnikStub.priimek)
      expect(uporabnik.slika).toEqual(uporabnikStub.slika)
      expect(uporabnik.role).toEqual(uporabnikStub.role)
      expect(uporabnik.rojstniDatum).toEqual(
        uporabnikStub.rojstniDatum?.toISOString()
      )
      expect(uporabnik.email).toEqual(uporabnikStub.email)
      expect(uporabnik.hash).toEqual(uporabnikStub.hash)
      expect(uporabnik.mentor).toEqual(uporabnikStub.mentor)
      expect(uporabnik.pripravniki).toEqual(uporabnikStub.pripravniki)
      expect(uporabnik.druzina).toEqual(uporabnikStub.druzina)
      expect(uporabnik.isDeleted).toEqual(uporabnikStub.isDeleted)
      expect(uporabnik.refresh_token).toEqual(uporabnikStub.refresh_token)
    })

    it("should create an instance of Uporabnik for Lovec", () => {
      const uporabnikStub = CreateUporabnikLovec()

      const uporabnik = new Uporabnik(
        uporabnikStub._id.toString(),
        uporabnikStub.ime,
        uporabnikStub.priimek,
        uporabnikStub.slika,
        uporabnikStub.rojstniDatum?.toISOString() as string,
        uporabnikStub.email,
        uporabnikStub.hash,
        uporabnikStub.role,
        uporabnikStub.mentor as unknown as string,
        uporabnikStub.pripravniki as unknown as string[],
        uporabnikStub.druzina as unknown as string,
        uporabnikStub.isDeleted,
        uporabnikStub.refresh_token
      )

      expect(uporabnik).toBeInstanceOf(Uporabnik)
      expect(uporabnik.id).toEqual(uporabnikStub._id.toString())
      expect(uporabnik.ime).toEqual(uporabnikStub.ime)
      expect(uporabnik.priimek).toEqual(uporabnikStub.priimek)
      expect(uporabnik.slika).toEqual(uporabnikStub.slika)
      expect(uporabnik.role).toEqual(uporabnikStub.role)
      expect(uporabnik.rojstniDatum).toEqual(
        uporabnikStub.rojstniDatum?.toISOString()
      )
      expect(uporabnik.email).toEqual(uporabnikStub.email)
      expect(uporabnik.hash).toEqual(uporabnikStub.hash)
      expect(uporabnik.mentor).toEqual(uporabnikStub.mentor)
      expect(uporabnik.pripravniki).toEqual(uporabnikStub.pripravniki)
      expect(uporabnik.druzina).toEqual(uporabnikStub.druzina)
      expect(uporabnik.isDeleted).toEqual(uporabnikStub.isDeleted)
      expect(uporabnik.refresh_token).toEqual(uporabnikStub.refresh_token)
    })
  })
})
