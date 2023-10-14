import DruzinaModel from "@models/druzinaModel"
import Druzina from "@entities/Druzina"

import { Request, Response, NextFunction, RequestHandler } from "express"

export const postDruzina: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ime } = req.body

    const druzina = new DruzinaModel({ ime, revirji: [], clani: [] })
    const result = await druzina.save()

    res.send(result)
  } catch (err) {
    next(err)
  }
}

export const getDruzine: RequestHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Druzina.fetchDruzine()

    res.send(result)
  } catch (err) {
    next(err)
  }
}
