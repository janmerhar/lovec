import Opazovalnica from "@entities/Opazovalnica"

import ResponseBuilder from "@utils/ResponseBuilder"

import {
  Body,
  Get,
  Post,
  UseBefore,
  Delete,
  Param,
  Patch,
  JsonController,
} from "routing-controllers"

import { InsertOpazovalnicaDTO } from "./dto/opazovalnica/insert-opazovalnica.dto"
import { authUser } from "middleware/authUser"

@JsonController("/opazovalnice")
export class OpazovalnicaController {
  @Get("/")
  @UseBefore(authUser("pripravnik", "lovec", "admin"))
  async getOpazovalnice() {
    const result = await Opazovalnica.fetchOpazovalnice()

    return ResponseBuilder.success(result)
  }

  @Post("/")
  @UseBefore(authUser("pripravnik", "lovec", "admin"))
  async postOpazovalnica(@Body() opazovalnica: InsertOpazovalnicaDTO) {
    const result = await Opazovalnica.addOpazovalnica(
      opazovalnica.ime,
      opazovalnica.kapaciteta,
      opazovalnica.prespanje,
      opazovalnica.koordinate
    )

    return ResponseBuilder.success(result)
  }

  @Patch("/admin/:opazovalnicaId")
  @UseBefore(authUser("admin"))
  async patchOpazovalnica(
    @Param("opazovalnicaId") opazovalnicaId: string,
    @Body() opazovalnica: InsertOpazovalnicaDTO
  ) {
    const result = await Opazovalnica.updateOpazovalnica(
      opazovalnicaId,
      opazovalnica.ime,
      opazovalnica.kapaciteta,
      opazovalnica.prespanje,
      opazovalnica.koordinate
    )

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }

  @Delete("/admin/:opazovalnicaId")
  @UseBefore(authUser("admin"))
  async deleteOpazovalnica(@Param("opazovalnicaId") opazovalnicaId: string) {
    const result = await Opazovalnica.deleteOpazovalnica(opazovalnicaId)

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }
}
