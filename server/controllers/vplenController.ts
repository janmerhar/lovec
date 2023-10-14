import Vplen from "@entities/Vplen"
import Uporabnik from "@entities/Uporabnik"
import ResponseBuilder from "@utils/ResponseBuilder"

import { Request, Response, NextFunction, RequestHandler } from "express"

export const getVpleni: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uporabnikId } = await Uporabnik.JWTpayload(req)
    const stran = parseInt(req.params.stran)

    const result = await Vplen.fetchVpleni(uporabnikId, stran)

    res.send(ResponseBuilder.success(result))
  } catch (error) {
    next(error)
  }
}

export const getVplen: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uporabnikId } = await Uporabnik.JWTpayload(req)
    const { datum } = req.params

    const result = await Vplen.fetchVpleniDatum(uporabnikId, datum)

    res.send(ResponseBuilder.success(result))
  } catch (error) {
    next(error)
  }
}

export const postVplen: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { zival, teza, datum, bolezni } = req.body
    const { uporabnikId } = await Uporabnik.JWTpayload(req)

    const result = await Vplen.vnesiVplen(
      uporabnikId,
      zival,
      teza,
      datum,
      bolezni
    )

    res.send(ResponseBuilder.success(result))
  } catch (error) {
    next(error)
  }
}
