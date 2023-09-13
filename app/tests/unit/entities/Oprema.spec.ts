import { Oprema } from "@/entities/Oprema"
import { login, pripravnikData } from "../../helpers/loginUser"

describe("Oprema class", () => {
  describe("constructor", () => {
    it("constructs oprema", async () => {
      const pripravnikInstance = await login(pripravnikData)
      const opremaData = {
        _id: "1",
        naziv: "naziv",
        tip: "tip",
        stanje: "stanje",
        datum: new Date(),
      }

      const oprema = new Oprema(pripravnikInstance, opremaData)

      expect(oprema.id).toBe(opremaData._id)
      expect(oprema.naziv).toBe(opremaData.naziv)
      expect(oprema.tip).toBe(opremaData.tip)
      expect(oprema.stanje).toBe(opremaData.stanje)
      expect(oprema.datum).toBe(opremaData.datum)
    })
  })

  const insertOpremaData = {
    naziv: "nazivTEST",
    tip: "tipTEST",
    stanje: "stanjeTEST",
  }

  let insertedOprema: Oprema

  describe("insertOprema", () => {
    it("inserts oprema", async () => {
      const pripravnikInstance = await login(pripravnikData)

      const result = await Oprema.insertOprema(
        pripravnikInstance,
        insertOpremaData.naziv,
        insertOpremaData.tip,
        insertOpremaData.stanje
      )

      insertedOprema = result.data

      expect(insertedOprema.naziv).toBe(insertOpremaData.naziv)
      expect(insertedOprema.tip).toBe(insertOpremaData.tip)
      expect(insertedOprema.stanje).toBe(insertOpremaData.stanje)
    })
  })

  describe("fetchOprema", () => {
    it("fetches oprema", async () => {
      const pripravnikInstance = await login(pripravnikData)

      const result = await Oprema.fetchOprema(pripravnikInstance)

      const fetchedOprema = result.data

      expect(
        fetchedOprema.filter((el) => el.id == insertedOprema.id).length
      ).not.toEqual(0)

      const dbOprema = fetchedOprema.filter(
        (el) => el.id == insertedOprema.id
      )[0]

      expect(dbOprema.naziv).toBe(insertOpremaData.naziv)
      expect(dbOprema.tip).toBe(insertOpremaData.tip)
      expect(dbOprema.stanje).toBe(insertOpremaData.stanje)
    })
  })

  describe("izbrisOprema", () => {
    it("deletes oprema", async () => {
      const result = await insertedOprema.izbrisiOprema()

      const izbrisanaOprema = result.data

      expect(izbrisanaOprema.naziv).toBe(insertOpremaData.naziv)
      expect(izbrisanaOprema.tip).toBe(insertOpremaData.tip)
      expect(izbrisanaOprema.stanje).toBe(insertOpremaData.stanje)
    })
  })
})
