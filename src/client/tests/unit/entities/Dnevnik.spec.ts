import { Dnevnik } from "@/entities/Dnevnik"
import { axiosInstance } from "../../helpers/axiosInstance"

describe("Dnevnik class", () => {
  describe("constructor", () => {
    const dnevnikData = {
      _id: "1",
      // pripravnik:
      mentorId: "1",
      status: "opravljen",
      // datum:
    }

    it.todo("constructs dnevnik")
  })

  describe("spremeniStatus", () => {
    it.todo("successful spremeniStatus")
  })

  describe("fetchDnevnikiMentor", () => {
    it.todo("successful fetchDnevnikiMentor")
  })

  describe("fetchDnevnikPripravnik", () => {
    it.todo("successful fetchDnevnikPripravnik")
  })

  describe("insertDnevnik", () => {
    it.todo("successfull insert")
  })
})
