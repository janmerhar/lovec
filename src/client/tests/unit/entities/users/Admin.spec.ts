import { Admin } from "@/entities/users/Admin"
import { axiosInstance } from "../../../helpers/axiosInstance"

describe("Admin class", () => {
  describe("constructor", () => {
    const adminData = {
      _id: "1",
      ime: "ime",
      priimek: "priimek",
      email: "email@email.com",
      token: "token",
    }

    it("constructs admin", () => {
      const admin = new Admin(axiosInstance, adminData)

      expect(admin.id).toBe(adminData._id)
      expect(admin.ime).toBe(adminData.ime)
      expect(admin.priimek).toBe(adminData.priimek)
      expect(admin.email).toBe(adminData.email)
      expect(admin.jwt.token).toBe(adminData.token)
    })
  })
})
