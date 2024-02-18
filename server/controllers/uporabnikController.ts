import Uporabnik from "@entities/Uporabnik"
import ResponseBuilder from "@utils/ResponseBuilder"
import { Body, JsonController, Post, Req, UseBefore } from "routing-controllers"

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
import { authUser } from "middleware/authUser"

import { LoginUporabnikDTO } from "./dto/uporabnik/login-uporabnik.dto"

@JsonController("/uporabnik")
export class UporabnikController {
  @Post("/login")
  async postLogin(@Body() login: LoginUporabnikDTO) {
    const result = await Uporabnik.login(login.email, login.geslo)

    if (result === null) {
      return ResponseBuilder.unauthorized("ERR_LOGIN_INVALID_CREDENTIALS")
    }

    return ResponseBuilder.success(result)
  }

  @Post("/logout")
  @UseBefore(authUser("lovec", "pripravnik", "admin"))
  async postLogout(@Req() req: any) {
    const { uporabnikId } = Uporabnik.JWTpayload(req)

    const result = await Uporabnik.logout(uporabnikId)

    return ResponseBuilder.success(result)
  }

  @Post("/refresh")
  async postRefreshToken(@Body() body: any) {
    const result = await Uporabnik.JWTrefresh(body.refresh_token)

    return ResponseBuilder.success(result)
  }
}
