import { JWT } from "@/entities/JWT"

describe("JWT class", () => {
  describe("constructor", () => {})

  const expiredJWT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cG9yYWJuaWtJZCI6IjY0M2U5YTE0NTk4ZDgyN2JlNDQ5YjRjNCIsInJvbGUiOiJsb3ZlYyIsImlhdCI6MTY5NDU0NTI1MSwiZXhwIjoxNjk0NTQ4ODUxfQ.VZ0sgfFyW8HQrK7yTocXvLEdXcFKiUYxxNwdA6u02mM"
  const validJWT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cG9yYWJuaWtJZCI6IjEyMyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5NDYwMjU2OSwiZXhwIjoyMDEwMjIxNzQ5fQ.eCT2bd-g6oTy7eJo5_dqLm3nodx0C6pVWZn1EE5Av2Q"

  const invalidJWT = "invalid"

  describe("checkToken", () => {
    it("accepts valid JWT", () => {
      const jwt = new JWT(validJWT)

      expect(jwt.checkToken()).toBeGreaterThan(0)
    })

    it("rejects expired JWT", () => {
      const jwt = new JWT(expiredJWT)

      expect(jwt.checkToken()).toBe(0)
    })

    it("rejects invalid JWT", () => {
      const jwt = new JWT(invalidJWT)

      expect(jwt.checkToken()).toBe(-1)
    })
  })

  //   TODO
  //   describe("refreshToken", () => {})

  describe("payload", () => {
    it("returns payload of valid token", () => {
      const jwt = new JWT(validJWT)
      const payload = jwt.payload()

      expect(payload).toHaveProperty("uporabnikId")
      expect(payload).toHaveProperty("role")
    })

    it("returns payload of expired token", () => {
      const jwt = new JWT(expiredJWT)
      const payload = jwt.payload()

      expect(payload).toHaveProperty("uporabnikId")
      expect(payload).toHaveProperty("role")
    })

    it("throws error if invalid JWT", () => {
      const jwt = new JWT(invalidJWT)

      expect(() => jwt.payload()).toThrow()
    })
  })
})
