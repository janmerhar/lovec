import Uporabnik from "@entities/Uporabnik"

import { Request, Response, NextFunction } from "express"
import ResponseBuilder from "@utils/ResponseBuilder"

export const authUser = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { role } = await Uporabnik.JWTpayload(req)

      if (roles.indexOf(role) === -1) {
        return res
          .status(401)
          .send(ResponseBuilder.unauthorized("Unauthorized"))
      } else {
        next()
      }
    } catch (err) {
      return res.status(401).send(ResponseBuilder.unauthorized("Unauthorized"))
    }
  }
}
