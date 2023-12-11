import ResponseBuilder from "@utils/ResponseBuilder"

import "reflect-metadata"
import { Body, Get, Post, JsonController, Req } from "routing-controllers"

import { SistemskeSpremenljivkeDTO } from "@controllers/dto/sistemske-spremenljivke/sistemske-spremenljivke.dto"

@JsonController("/spremenljivke")
export class SistemskeSpremenljivkeController {
  @Get("/")
  async getSistemskeSpremenljivke(@Req() req: any) {
    const spremenljivke = req.app.get("spremenljivke")

    return ResponseBuilder.success(spremenljivke)
  }

  @Post("/")
  async postSistemskeSpremenljivke(
    @Req() req: any,
    @Body() body: SistemskeSpremenljivkeDTO
  ) {
    const spremenljivke = req.app.get("spremenljivke")

    const result = await spremenljivke.updateSistemskeSpremenljivke(
      body.PAGE_SIZE,
      body.JAGA_MAX_MEMBERS,
      body.OBISK_MAX_LENGTH,
      body.USER_OBISKS_MAX_LENGTH
    )

    return ResponseBuilder.success(result)
  }
}
