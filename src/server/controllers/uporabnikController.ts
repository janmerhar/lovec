import Uporabnik from "@entities/Uporabnik"
import ResponseBuilder from "@utils/ResponseBuilder"
import {
  Body,
  Controller,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Req,
  UseBefore,
} from "routing-controllers"

/*
  Admin:
  1. Register uporabnikov --> vnos slike
  2. Urejanje uporabnikov --> vnos slike
*/

/*
  Registracija:
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
import SistemskeSpremenljivke from "~/entities/SistemskeSpremenljivke"

@Controller("/uporabnik")
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

  @Post("/vsi/:stran")
  @UseBefore(authUser("lovec", "pripravnik", "admin"))
  async getUporabniki(
    @Req() req: any,
    @Param("stran") stran: number,
    @Body() body: any
  ) {
    const spremenljivke: SistemskeSpremenljivke = req.app.get("spremenljivke")

    const result = await Uporabnik.searchUporabniki(
      body.query ?? "",
      stran,
      spremenljivke.PAGE_SIZE
    )

    return ResponseBuilder.success(result)
  }

  @Delete("/:uporabnikId")
  @UseBefore(authUser("admin"))
  async deleteUporabnik(@Param("uporabnikId") uporabnikId: string) {
    const result = await Uporabnik.deleteUporabnik(uporabnikId)

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }

  @Post("/register")
  @UseBefore(authUser("admin"))
  async postRegister(@Req() req: any, @Body() body: any) {
    console.log(req)
    console.log(body)

    return ResponseBuilder.success(body)
  }
}
