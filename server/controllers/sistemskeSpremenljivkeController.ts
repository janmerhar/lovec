import SistemskeSpremenljivke from "@entities/SistemskeSpremenljivke"
import ResponseBuilder from "@utils/ResponseBuilder"

import Uporabnik from "@entities/Uporabnik"
import { Request, Response, NextFunction, RequestHandler } from "express"

export const getSistemskeSpremenljivke: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = await Uporabnik.JWTpayload(req)
    if (role !== "admin") {
      res.send(
        ResponseBuilder.unauthorized("Uporabnik nima pravic za to operacijo")
      )
      return
    }

    const spremenljivke = req.app.get("spremenljivke")

    res.send(ResponseBuilder.success(spremenljivke))
  } catch (error) {
    next(error)
  }
}

export const postSistemskeSpremenljivke: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    PAGE_SIZE,
    JAGA_MAX_MEMBERS,
    OBISK_MAX_LENGTH,
    USER_OBISKS_MAX_LENGTH,
  } = req.body

  try {
    const { role } = await Uporabnik.JWTpayload(req)
    if (role !== "admin") {
      res.send(
        ResponseBuilder.unauthorized("Uporabnik nima pravic za to operacijo")
      )
      return
    }

    const spremenljivke = req.app.get("spremenljivke")

    const result = await spremenljivke.updateSistemskeSpremenljivke(
      PAGE_SIZE,
      JAGA_MAX_MEMBERS,
      OBISK_MAX_LENGTH,
      USER_OBISKS_MAX_LENGTH
    )

    res.send(ResponseBuilder.success(result))
  } catch (error) {
    next(error)
  }
}
