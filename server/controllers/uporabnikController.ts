import Uporabnik from "@entities/Uporabnik"
import ResponseBuilder from "@utils/ResponseBuilder"

import { Request, Response, NextFunction, RequestHandler } from "express"

export const postLogin: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, geslo } = req.body

    const result = await Uporabnik.login(email, geslo)

    if (result === null) {
      res.send(
        ResponseBuilder.unauthorized("Napačno uporabniško ime ali geslo")
      )
      return
    } else {
      res.send(ResponseBuilder.success(result))
      return
    }
  } catch (err) {
    next(err)
  }
}

export const postRegister: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ime, priimek, slika, rojstniDatum, email, geslo } = req.body

    const result = await Uporabnik.register(
      ime,
      priimek,
      slika,
      rojstniDatum,
      email,
      geslo
    )

    res.send(ResponseBuilder.success("Registracija uspešna"))
  } catch (err) {
    next(err)
  }
}

export const getUporabnik: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: uporabnikId } = req.params

    const result = await Uporabnik.fetchUporabnik(uporabnikId)

    res.send(ResponseBuilder.success(result))
  } catch (error) {
    next(error)
  }
}

export const refreshToken: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("refreshToken")
  res.send("refreshToken")
}

export const logout: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("logout")
  res.send("logout")
}
