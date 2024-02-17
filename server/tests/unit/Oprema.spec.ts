import Oprema from "@entities/Oprema"
import OpremaModel from "@models/opremaModel"

import { CreateOpremaStub } from "@stubs/CreateOprema.stub"

describe("Oprema", () => {
  describe("constructor", () => {
    it.todo("should create an instance of Oprema")
  })

  describe("fetchUporabnikOprema", () => {
    it.todo("should fetch all Oprema for a user")

    it.todo(
      "should return an empty array of Oprema instances if user has no Oprema"
    )
  })

  describe("vnesiOprema", () => {
    it.todo("should create a new Oprema instance and return it")
  })

  describe("izbrisiOprema", () => {
    it.todo("should delete an Oprema")

    it.todo("should fail to delete an Oprema that does not exist")
  })
})
