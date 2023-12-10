import Uporabnik from "@entities/Uporabnik"

import { Request, Response, NextFunction } from "express"
import ResponseBuilder from "@utils/ResponseBuilder"

export const authUser = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { role } = await Uporabnik.JWTpayload(req)
    console.log(role)

    if (roles.indexOf(role) === -1) {
      return res.status(401).send(ResponseBuilder.unauthorized("Unauthorized"))
    } else {
      next()
    }
  }
}