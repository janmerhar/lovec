import Dnevnik from "@entities/Dnevnik"
import Uporabnik from "@entities/Uporabnik"

import ResponseBuilder from "@utils/ResponseBuilder"

import { Request, Response, NextFunction, RequestHandler } from "express"

//
// Mentor
//

// Dnevnik za dnevnike prirpavnikov za nekega mentorja za neki dan
export const getDnevnikPripravniki: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { datum } = req.params

  try {
    // TODO
    // @ts-ignore
    const { uporabnikId: mentorId, role } = await Uporabnik.JWTpayload(req)

    if (role !== "lovec") {
      res.send(
        ResponseBuilder.unauthorized("Uporabnik nima pravic za to stran")
      )
      return
    }

    const result = await Dnevnik.fetchDnevnikiMentor(mentorId, datum)

    res.send(ResponseBuilder.success(result))
  } catch (error) {
    next("Prišlo je do napake pri pridobivanju dnevnika pripravnikov")
  }
}

export const patchSpremeniStatus: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { dnevnikId, status } = req.body

  try {
    // TODO
    // @ts-ignore
    const { uporabnikId: mentorId, role } = await Uporabnik.JWTpayload(req)

    if (role !== "lovec") {
      res.send(
        ResponseBuilder.unauthorized("Uporabnik nima pravic za to operacijo")
      )
      return
    }

    const result = await Dnevnik.spremeniStatusDnevnik(
      mentorId,
      dnevnikId,
      status
    )

    res.send(ResponseBuilder.success(result))
  } catch (error) {
    next("Prišlo je do napake pri spreminjanju statusa dnevnika")
  }
}

//
// Pripravnik
//

// Vpogled v svoj dnenvik za pripravnika
// ta nima svojega dneva, temvec continuos scroll
export const getDnevnikPripravnik: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { stran } = req.params

  try {
    // TODO
    // @ts-ignore
    const { uporabnikId: pripravnikId, role } = await Uporabnik.JWTpayload(req)

    if (role !== "pripravnik") {
      res.send(
        ResponseBuilder.unauthorized("Uporabnik nima pravic za to stran")
      )
      return
    }

    const result = await Dnevnik.fetchDnevnikiPripravnik(
      pripravnikId,
      parseInt(stran)
    )
    res.send(ResponseBuilder.success(result))
  } catch (error) {
    // next("Prišlo je do napake pri pridobivanju dnevnika pripravnika")
    next(error)
  }
}

export const postDnevnikVnesi: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Dobim iz zahteve
  const { datum, ure, opis, delo } = req.body

  try {
    // TODO
    // @ts-ignore
    const { uporabnikId: pripravnikId, role } = await Uporabnik.JWTpayload(req)

    if (role == "lovec") {
      res.send(ResponseBuilder.unauthorized("Uporabnik nima pravic za to"))
      return
    }

    // Dobim iz PB glede na uporabnikId
    // TODO
    // @ts-ignore
    const { mentor: mentorId } = await Uporabnik.fetchUporabnik(pripravnikId)

    const result = await Dnevnik.vnesiDnevnik(
      pripravnikId,
      mentorId,
      datum,
      ure,
      opis,
      delo
    )

    res.send(ResponseBuilder.success(result))
  } catch (error) {
    next("Prišlo je do napake pri vnašanju dnevnika")
  }
}
