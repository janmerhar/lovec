import Druzina from "@entities/Druzina"
import { JsonController } from "routing-controllers"

import {
  Body,
  Get,
  Post,
  UseBefore,
  Delete,
  Param,
  Patch,
} from "routing-controllers"

import { InsertDruzinaDTO } from "./dto/druzina/insert-druzina.dto"

import { authUser } from "middleware/authUser"
import ResponseBuilder from "@utils/ResponseBuilder"

@JsonController("/druzine")
export class DruzinaController {
  @Get("/")
  @UseBefore(authUser("admin"))
  async getDruzine() {
    const result = await Druzina.fetchDruzine()

    return ResponseBuilder.success(result)
  }

  @Get("/:druzina")
  @UseBefore(authUser("admin"))
  async getDruzina(@Param("druzina") druzina: string) {
    const result = await Druzina.fetchDruzina(druzina)

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }

  @Post("/")
  @UseBefore(authUser("admin"))
  async postDruzina(@Body() druzina: InsertDruzinaDTO) {
    const result = await Druzina.insertDruzina(
      druzina.ime,
      druzina.revirji,
      druzina.clani
    )

    return ResponseBuilder.success(result)
  }

  @Patch("/:druzina/revir/:revir")
  @UseBefore(authUser("admin"))
  async dodajRevir(
    @Param("druzina") druzina: string,
    @Param("revir") revir: string
  ) {
    await Druzina.odstraniRevir(revir)
    const result = await Druzina.dodajRevir(druzina, revir)

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }

  @Delete("/:druzina/revir/:revir")
  @UseBefore(authUser("admin"))
  async odstraniRevir(@Param("revir") revir: string) {
    const result = await Druzina.odstraniRevir(revir)

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }

  @Delete("/:druzina/clan/:clan")
  @UseBefore(authUser("admin"))
  async odstraniClana(@Param("clan") clan: string) {
    const result = await Druzina.odstraniClana(clan)

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }

  @Post("/:druzina/clan/:clan")
  @UseBefore(authUser("admin"))
  async dodajClana(
    @Param("druzina") druzina: string,
    @Param("clan") clan: string
  ) {
    const result = await Druzina.dodajClana(druzina, clan)

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }

  @Delete("/:druzina")
  @UseBefore(authUser("admin"))
  async deleteDruzina(@Param("druzina") druzinaId: string) {
    const result = await Druzina.deleteDruzina(druzinaId)

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }
}
