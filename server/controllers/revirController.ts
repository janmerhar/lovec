import Revir from "@entities/Revir"
import ResponseBuilder from "@utils/ResponseBuilder"

import { Request, Response, NextFunction, RequestHandler } from "express"

export const getRevirji: RequestHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Revir.fetchRevirji()

    res.send(ResponseBuilder.success(result))
  } catch (error) {
    next(error)
  }
}
