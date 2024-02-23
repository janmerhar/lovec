import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Patch,
  Post,
  Req,
  UseBefore,
} from "routing-controllers"

import { InsertObiskDTO } from "./dto/obisk/insert-obisk.dto"
import { authUser } from "middleware/authUser"
import Obisk from "@entities/Obisk"
import Uporabnik from "@entities/Uporabnik"
import SistemskeSpremenljivke from "@entities/SistemskeSpremenljivke"
import ResponseBuilder from "@utils/ResponseBuilder"

@JsonController("/obiski")
export class ObiskController {
  @Post("/")
  @UseBefore(authUser("pripravnik", "lovec"))
  async postObiskVnesi(@Req() req: any, @Body() obisk: InsertObiskDTO) {
    const { uporabnikId: uporabnik } = await Uporabnik.JWTpayload(req)

    const spremenljivke: SistemskeSpremenljivke = req.app.get("spremenljivke")
    const kvota = spremenljivke.USER_OBISKS_MAX_LENGTH

    const porabljeno = await Obisk.fetchUporabnikObiskiTotal(uporabnik)

    if (porabljeno >= kvota) {
      return ResponseBuilder.error("USER_OBISKS_MAX_LENGTH")
    }

    const SECONDS_IN_MINUTE = 60
    const MILISECONDS_IN_SECOND = 1000

    const result = await Obisk.startObisk(
      obisk.opazovalnica,
      uporabnik,
      new Date().toISOString(),
      new Date(
        new Date().getTime() +
          spremenljivke.OBISK_MAX_LENGTH *
            SECONDS_IN_MINUTE *
            MILISECONDS_IN_SECOND
      ).toISOString()
    )

    return result
      ? ResponseBuilder.success(result)
      : ResponseBuilder.error("no no")
  }

  @Get("/uporabnik/:stran")
  @UseBefore(authUser("pripravnik", "lovec"))
  async getPretekliObiski(@Req() req: any, @Param("stran") stran: number) {
    const { uporabnikId: uporabnik } = await Uporabnik.JWTpayload(req)

    const spremenljivke: SistemskeSpremenljivke = req.app.get("spremenljivke")

    const result = await Obisk.fetchUporabnikObiski(
      uporabnik,
      stran,
      spremenljivke.PAGE_SIZE
    )

    return ResponseBuilder.success(result)
  }

  @Get("/aktivni")
  @UseBefore(authUser("pripravnik", "lovec"))
  async getAktivniObiski(@Req() req: any) {
    const { uporabnikId: uporabnik } = await Uporabnik.JWTpayload(req)

    const result = await Obisk.fetchUporabnikActiveObisk(uporabnik)

    return ResponseBuilder.success(result)
  }

  @Patch("/aktivni")
  @UseBefore(authUser("pripravnik", "lovec"))
  async patchZakljuciObisk(@Req() req: any) {
    const { uporabnikId: uporabnik } = await Uporabnik.JWTpayload(req)

    const result = await Obisk.endUporabnikObisk(uporabnik)

    return !!result
      ? ResponseBuilder.success(result)
      : ResponseBuilder.notfound()
  }

  @Get("/aktivni/kvota")
  @UseBefore(authUser("pripravnik", "lovec"))
  async getKvotaObiskov(@Req() req: any) {
    const { uporabnikId: uporabnik } = await Uporabnik.JWTpayload(req)

    const spremenljivke: SistemskeSpremenljivke = req.app.get("spremenljivke")

    const porabljeno = await Obisk.fetchUporabnikObiskiTotal(uporabnik)
    const kvota = spremenljivke.USER_OBISKS_MAX_LENGTH

    // TODO: premisli, ali je to dovolj dobro
    return ResponseBuilder.success({
      porabljeno,
      kvota,
    })
  }

  @Get("/opazovalnica/:opazovalnicaId/:datum")
  @UseBefore(authUser("pripravnik", "lovec", "admin"))
  async getObiskiOpazovalnice(
    @Param("opazovalnicaId") opazovalnicaId: string,
    @Param("datum") datum: string
  ) {
    const result = await Obisk.fetchObiski(opazovalnicaId, datum)

    return ResponseBuilder.success(result)
  }

  @Get("/admin/uporabnik/:uporabnikId/:stran")
  @UseBefore(authUser("admin"))
  async getObiskiUporabnika(
    @Req() req: any,
    @Param("uporabnikId") uporabnikId: string,
    @Param("stran") stran: number
  ) {
    const spremenljivke: SistemskeSpremenljivke = req.app.get("spremenljivke")

    const result = await Obisk.fetchUporabnikObiski(
      uporabnikId,
      stran,
      spremenljivke.PAGE_SIZE
    )

    return ResponseBuilder.success(result)
  }

  @Delete("/admin/obisk/:obiskId")
  @UseBefore(authUser("admin"))
  async deleteObisk(@Param("obiskId") obiskId: string) {
    const result = await Obisk.deleteObisk(obiskId)

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }
}
