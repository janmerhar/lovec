import Opazovalnica from "@entities/Opazovalnica"

import Uporabnik from "@entities/Uporabnik"

import ResponseBuilder from "@utils/ResponseBuilder"

import { Request, Response, NextFunction, RequestHandler } from "express"

// Vrnem vse podatke o neki opazovalnici
// mogoce se samo omejim na dolocen casovni razpon obiskov
export const getOpazovalnica: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params

  // await Opazovalnica.fetchOpazovalnica(id)
  console.log("getUser")
  res.send("getUser")
}

// Vrnem samo koordinate vseh opazovalnic
export const getOpazovalnice: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Opazovalnica.fetchOpazovalnice()

    res.send(ResponseBuilder.success(result))
  } catch (error) {
    next(error)
  }
}

// Vas verjetno ne potrebujem, saj lahko samo (ponovno) fetcham opazovalnice
// raje vas obdzim, saj bi drugace vsakic fetchal vse opazovalnice skupaj z vsemi obiski

// v bistvu lahko vas uporabim za dnevni pregled zasedenosti opazovalnic
// torej zgodovino in prihodnost
export const getObiski: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("getUser")
  res.send("getUser")
}

export const postRezerviraj: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uporabnikId } = await Uporabnik.JWTpayload(req)
    const { id } = req.params

    const { zacetek, konec } = req.body

    const result = await Opazovalnica.rezervirajOpazovalnico(
      uporabnikId,
      id,
      zacetek,
      konec
    )

    res.send(ResponseBuilder.success(result))
  } catch (error) {
    next(error)
  }
}

// TODO !!!
export const odpovejRezervacijo: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {}

// TODO !!!
export const zasediOpazovalnico: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {}
