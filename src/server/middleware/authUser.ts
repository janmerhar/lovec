import Uporabnik from "@entities/Uporabnik"

import { Request, Response, NextFunction } from "express"
import ResponseBuilder from "@utils/ResponseBuilder"

export const authUser = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { role } = Uporabnik.JWTpayload(req)

      // User is not authorized
      // Torej uporabnik nima pravilne vloge
      if (roles.indexOf(role) === -1) {
        return res
          .status(403)
          .send(ResponseBuilder.forbidden("ERR_USER_ROLE_NOT_AUTHORIZED"))
      } else {
        next()
      }
    } catch (err) {
      return (
        res
          .status(401)
          // @ts-ignore
          .send(ResponseBuilder.unauthorized(err.message as string))
      )
    }
  }
}
