import Vplen from "@entities/Vplen"
import Uporabnik from "@entities/Uporabnik"
import ResponseBuilder from "@utils/ResponseBuilder"

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

import { InsertVplenDTO } from "./dto/vplen/insert-vplen.dto"

import { authUser } from "middleware/authUser"
import SistemskeSpremenljivke from "@entities/SistemskeSpremenljivke"

@JsonController("/vpleni")
export class VplenController {
  @Post("/")
  @UseBefore(authUser("pripravnik", "lovec"))
  async postVplen(@Req() req: any, @Body() vplen: InsertVplenDTO) {
    const { uporabnikId } = await Uporabnik.JWTpayload(req)

    const result = await Vplen.vnesiVplen(
      uporabnikId,
      vplen.koordinate,
      vplen.zival,
      vplen.teza,
      vplen.datum,
      vplen.bolezni
    )

    return ResponseBuilder.success(result)
  }

  @Get("/moji/:stran")
  @UseBefore(authUser("pripravnik", "lovec"))
  async getVpleni(@Req() req: any, @Param("stran") stran: number) {
    const spremenljivke: SistemskeSpremenljivke = req.app.get("spremenljivke")

    const { uporabnikId } = await Uporabnik.JWTpayload(req)

    const result = await Vplen.fetchVpleni(
      uporabnikId,
      stran,
      spremenljivke.PAGE_SIZE
    )

    return ResponseBuilder.success(result)
  }

  @Get("/:datum")
  @UseBefore(authUser("pripravnik", "lovec"))
  async getVplen(@Req() req: any, @Param("datum") datum: string) {
    const { uporabnikId } = await Uporabnik.JWTpayload(req)

    const result = await Vplen.fetchVpleniDatum(uporabnikId, datum)

    return ResponseBuilder.success(result)
  }

  @Delete("/:vplen")
  @UseBefore(authUser("pripravnik", "lovec"))
  async deleteVplen(@Req() req: any, @Param("vplen") vplenId: string) {
    const { uporabnikId } = await Uporabnik.JWTpayload(req)

    const result = await Vplen.izbrisiVplen(uporabnikId, vplenId)

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }

  @Delete("/:uporabnik/:vplen")
  @UseBefore(authUser("admin"))
  async adminDeleteVplen(
    @Param("uporabnik") uporabnikId: string,
    @Param("vplen") vplenId: string
  ) {
    const result = await Vplen.izbrisiVplen(uporabnikId, vplenId)

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }

  @Get("/:uporabnik/:stran")
  @UseBefore(authUser("admin"))
  async adminGetVpleni(
    @Req() req: any,
    @Param("uporabnik") uporabnikId: string,
    @Param("stran") stran: number
  ) {
    const spremenljivke: SistemskeSpremenljivke = req.app.get("spremenljivke")

    const result = await Vplen.fetchVpleni(
      uporabnikId,
      stran,
      spremenljivke.PAGE_SIZE
    )

    return ResponseBuilder.success(result)
  }
}
