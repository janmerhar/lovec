import Uporabnik from "@entities/Uporabnik"
import ResponseBuilder from "@utils/ResponseBuilder"
import {
  Body,
  Get,
  JsonController,
  Param,
  Post,
  Req,
  UseBefore,
} from "routing-controllers"

/*
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
*/

/*
  Admin:
  1. Dodajanje uporabnikov --> vnos slike
  2. Urejanje uporabnikov
  3. Brisanje uporabnikov --> soft delete

  Combined:
  1. Login --> preveri, ali je uporabnik izbrisan
  2. Logout
  3. Iskanje uporabnikov po role in ime ???
  4. Fetchanje posameznega uporabnika po ID
  5. Refresh token -> preveri, kako implementirati token refresh
*/

/*
  Register
  1. Preveri, če je email že v bazi
  2. Če ni, ustvari uporabnika
  3. Vrni uspešno registracijo

  Register opombe:
  - file upload
    https://www.perplexity.ai/search/does-it-make-zTkWIjeUR4SA_7sjDEMHtQ?s=c#240ba6cc-3c41-42de-afb5-7968457d03a1
  - vuejs file upload skupaj s podatki
    https://www.perplexity.ai/search/does-it-make-zTkWIjeUR4SA_7sjDEMHtQ?s=c#ce218e87-877a-4dc3-9665-1e021565b6ca
  - REST Client za testiranje
    https://www.perplexity.ai/search/does-it-make-zTkWIjeUR4SA_7sjDEMHtQ?s=c#362dccfb-e90a-4c50-be4a-2fa85ee9d49d
*/

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

  @Get("/:uporabnikId")
  @UseBefore(authUser("lovec", "pripravnik", "admin"))
  async getUporabnik(@Param("uporabnikId") uporabnikId: string) {
    const result = await Uporabnik.fetchUserProfile(uporabnikId)

    return !!result
      ? ResponseBuilder.success(result)
      : ResponseBuilder.notfound()
  }

  @Delete("/:uporabnikId")
  @UseBefore(authUser("admin"))
  async deleteUporabnik(@Param("uporabnikId") uporabnikId: string) {
    const result = await Uporabnik.deleteUporabnik(uporabnikId)

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }
}
