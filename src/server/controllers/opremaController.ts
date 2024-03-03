import Oprema from "@entities/Oprema"
import Uporabnik from "@entities/Uporabnik"
import ResponseBuilder from "@utils/ResponseBuilder"

import "reflect-metadata"
import {
  Body,
  Get,
  Post,
  JsonController,
  Req,
  UseBefore,
  Delete,
  Param,
} from "routing-controllers"

import { authUser } from "middleware/authUser"

@JsonController("/oprema")
export class OpremaController {
  @Post("/")
  @UseBefore(authUser("pripravnik", "lovec"))
  // TODO: add body validation
  async postOprema(@Req() req: any, @Body() body: any) {
    const { uporabnikId } = Uporabnik.JWTpayload(req)
    const { naziv, tip, stanje } = body
    console.log(uporabnikId, naziv, tip, stanje)

    const result = await Oprema.vnesiOprema(uporabnikId, naziv, tip, stanje)
    console.log(result)

    return ResponseBuilder.success(result)
  }

  @Delete("/:oprema")
  @UseBefore(authUser("pripravnik", "lovec"))
  async deleteOprema(@Req() req: any, @Param("oprema") oprema: string) {
    const { uporabnikId } = Uporabnik.JWTpayload(req)

    const result = await Oprema.izbrisiOprema(uporabnikId, oprema)

    return ResponseBuilder.success(result)
  }

  @Get("/")
  @UseBefore(authUser("pripravnik", "lovec"))
  async getOprema(@Req() req: any) {
    const { uporabnikId } = Uporabnik.JWTpayload(req)

    const result = await Oprema.fetchUporabnikOprema(uporabnikId)

    return ResponseBuilder.success(result)
  }

  @Get("/:uporabnik")
  @UseBefore(authUser("admin"))
  async adminGetOprema(@Param("uporabnik") uporabnikId: string) {
    const result = await Oprema.fetchUporabnikOprema(uporabnikId)

    return ResponseBuilder.success(result)
  }

  @Delete("/:uporabnik/:oprema")
  @UseBefore(authUser("admin"))
  async adminDeleteOprema(
    @Param("uporabnik") uporabnikId: string,
    @Param("oprema") oprema: string
  ) {
    const result = await Oprema.izbrisiOprema(uporabnikId, oprema)

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }
}
