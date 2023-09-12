import { JWTPayload } from "@/types"
import jwt_decode from "jwt-decode"

export class JWT {
  token: string

  constructor(token: string) {
    this.token = token
  }

  checkToken(): number {
    if (!this.token) return -1

    try {
      const decodedToken: any = jwt_decode(this.token)
      const currentTime = Math.floor(Date.now() / 1000)
      const expirationTime = decodedToken.exp

      if (expirationTime > currentTime) {
        return expirationTime - currentTime
      } else {
        return 0
      }
    } catch (error) {
      return -1
    }
  }

  // TODO
  // async refreshToken(): Promise<void> {}

  payload(): JWTPayload {
    return jwt_decode(this.token)
  }
}
