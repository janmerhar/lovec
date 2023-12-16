import {
  Body,
  Get,
  Post,
  UseBefore,
  Delete,
  Param,
  Patch,
  JsonController,
  Req,
} from "routing-controllers"

import { authUser } from "middleware/authUser"
import { InsertJagaDto } from "./dto/jaga/insert-jaga.dto"
import { Jaga } from "@entities/Jaga"
import SistemskeSpremenljivke from "@entities/SistemskeSpremenljivke"
import ResponseBuilder from "@utils/ResponseBuilder"
import Uporabnik from "@entities/Uporabnik"

@JsonController("/jage")
export class JagaController {
  @Get("/:stran")
  @UseBefore(authUser("pripravnik", "lovec", "admin"))
  async getJage(@Req() req: any, @Param("stran") stran: number) {
    const spremenljivke: SistemskeSpremenljivke = req.app.get("spremenljivke")

    const result = await Jaga.fetchJage(true, stran, spremenljivke.PAGE_SIZE)

    return ResponseBuilder.success(result)
  }

  @Get("/pretekle/:stran")
  @UseBefore(authUser("pripravnik", "lovec"))
  async getPretekleJage(@Req() req: any, @Param("stran") stran: number) {
    const { uporabnikId } = await Uporabnik.JWTpayload(req)

    const spremenljivke: SistemskeSpremenljivke = req.app.get("spremenljivke")

    const result = await Jaga.fetchUporabnikJage(
      uporabnikId,
      false,
      stran,
      spremenljivke.PAGE_SIZE
    )

    return ResponseBuilder.success(result)
  }

  @Get("/aktivne/:stran")
  @UseBefore(authUser("pripravnik", "lovec"))
  async getAktivneJage(@Req() req: any, @Param("stran") stran: number) {
    const { uporabnikId } = await Uporabnik.JWTpayload(req)

    const spremenljivke: SistemskeSpremenljivke = req.app.get("spremenljivke")

    const result = await Jaga.fetchUporabnikJage(
      uporabnikId,
      true,
      stran,
      spremenljivke.PAGE_SIZE
    )

    return ResponseBuilder.success(result)
  }

  @Get("/jaga/:jaga")
  @UseBefore(authUser("pripravnik", "lovec", "admin"))
  async getJaga(@Param("jaga") jaga: string) {
    const result = await Jaga.fetchJaga(jaga)

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }

  @Post("/")
  @UseBefore(authUser("pripravnik", "lovec"))
  async postJaga(@Req() req: any, @Body() jaga: InsertJagaDto) {
    const { uporabnikId } = await Uporabnik.JWTpayload(req)

    const spremenljivke: SistemskeSpremenljivke = req.app.get("spremenljivke")

    const result = await Jaga.insertJaga(
      uporabnikId,
      jaga.naziv,
      jaga.opis,
      jaga.udelezeni,
      spremenljivke.JAGA_MAX_MEMBERS,
      jaga.lokacija,
      jaga.zacetek
    )

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }

  @Patch("/jaga/:jaga/pridruzi/")
  @UseBefore(authUser("pripravnik", "lovec"))
  async pridruziJagi(@Req() req: any, @Param("jaga") jagaId: string) {
    const { uporabnikId } = await Uporabnik.JWTpayload(req)

    const result = await Jaga.joinJaga(jagaId, uporabnikId)

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }

  @Patch("/jaga/:jaga/odstrani/")
  @UseBefore(authUser("pripravnik", "lovec"))
  async odstraniIzJage(@Req() req: any, @Param("jaga") jagaId: string) {
    const { uporabnikId } = await Uporabnik.JWTpayload(req)

    const result = await Jaga.leaveJaga(jagaId, uporabnikId)

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }

  @Patch("/jaga/:jaga")
  @UseBefore(authUser("pripravnik", "lovec"))
  async patchJaga(@Param("jaga") jagaId: string, @Body() jaga: InsertJagaDto) {
    const result = await Jaga.updateJaga(
      jagaId,
      jaga.organizator,
      jaga.naziv,
      jaga.opis,
      jaga.udelezeni,
      jaga.lokacija,
      jaga.zacetek
    )

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }

  @Delete("/jaga/:jaga")
  @UseBefore(authUser("pripravnik", "lovec"))
  async deleteJaga(@Req() req: any, @Param("jaga") jagaId: string) {
    const { uporabnikId } = await Uporabnik.JWTpayload(req)

    const result = Jaga.deleteJagaOrganizator(jagaId, uporabnikId)

    // TODO: ti vedno vrnes 200, tudi ce jaga ne obstaja
    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }

  //
  // Admin
  //

  @Patch("/admin/jaga/:jaga/pridruzi/:uporabnikId")
  @UseBefore(authUser("admin"))
  async adminPridruziJagi(
    @Param("jaga") jagaId: string,
    @Param("uporabnikId") uporabnikId: string
  ) {
    const result = await Jaga.joinJaga(jagaId, uporabnikId)

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }

  @Patch("/admin/jaga/:jaga/odstrani/:uporabnikId")
  @UseBefore(authUser("admin"))
  async adminOdstraniIzJage(
    @Param("jaga") jagaId: string,
    @Param("uporabnikId") uporabnikId: string
  ) {
    const result = await Jaga.leaveJaga(jagaId, uporabnikId)

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }

  @Get("/admin/uporabnik/:uporabnikId/aktivne/:stran")
  @UseBefore(authUser("admin"))
  async adminGetJageUporabnikAktivne(
    @Param("uporabnikId") uporabnikId: string,
    @Param("stran") stran: number
  ) {
    const result = await Jaga.fetchUporabnikJage(uporabnikId, true, stran, 10)

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }

  @Get("/admin/uporabnik/:uporabnikId/pretekle/:stran")
  @UseBefore(authUser("admin"))
  async adminGetJageUporabnikPretekle(
    @Param("uporabnikId") uporabnikId: string,
    @Param("stran") stran: number
  ) {
    const result = await Jaga.fetchUporabnikJage(uporabnikId, false, stran, 10)

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }

  @Delete("/admin/jaga/:jaga")
  @UseBefore(authUser("admin"))
  async adminDeleteJaga(@Param("jaga") jagaId: string) {
    const result = await Jaga.deleteJaga(jagaId)

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }
}
