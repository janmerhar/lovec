import Oprema from "@entities/Oprema"
import Uporabnik from "@entities/Uporabnik"
import ResponseBuilder from "@utils/ResponseBuilder"

import { Request, Response, NextFunction, RequestHandler } from "express"

export const postOprema: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uporabnikId } = await Uporabnik.JWTpayload(req)
    const { naziv, tip, stanje } = req.body

    const result = await Oprema.vnesiOprema(uporabnikId, naziv, tip, stanje)

    res.send(ResponseBuilder.success(result))
  } catch (error) {
    next(error)
  }
}

export const deleteOprema: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uporabnikId } = await Uporabnik.JWTpayload(req)
    const { id } = req.body

    const result = await Oprema.izbrisiOprema(uporabnikId, id)

    res.send(ResponseBuilder.success(result))
  } catch (error) {
    next(error)
  }
}

export const getOprema: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uporabnikId } = await Uporabnik.JWTpayload(req)

    const result = await Oprema.fetchUporabnikOprema(uporabnikId)

    res.send(ResponseBuilder.success(result))
  } catch (error) {
    next(error)
  }
}
