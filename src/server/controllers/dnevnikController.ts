import Dnevnik from "@entities/Dnevnik"
import Uporabnik from "@entities/Uporabnik"

import ResponseBuilder from "@utils/ResponseBuilder"

import {
  Body,
  Get,
  Post,
  UseBefore,
  Delete,
  Param,
  Patch,
  Req,
  JsonController,
} from "routing-controllers"

import { InsertDnevnikDTO } from "./dto/dnevnik/insert-dnevnik.dto"

import { authUser } from "middleware/authUser"

@JsonController("/dnevniki")
export class DnevnikController {
  @Get("/mentor/:datum")
  @UseBefore(authUser("lovec"))
  async getDnevnikPripravniki(@Req() req: any, @Param("datum") datum: string) {
    const { uporabnikId: mentorId } = await Uporabnik.JWTpayload(req)
    const result = await Dnevnik.fetchDnevnikiMentor(mentorId, datum)

    return ResponseBuilder.success(result)
  }

  @Post("/")
  @UseBefore(authUser("pripravnik"))
  async postDnevnikVnesi(@Req() req: any, @Body() dnevnik: InsertDnevnikDTO) {
    const { uporabnikId: pripravnikId } = await Uporabnik.JWTpayload(req)

    const uporabnik = await Uporabnik.fetchUporabnik(pripravnikId)

    if (!uporabnik?.mentor) {
      return ResponseBuilder.unauthorized("Uporabnik nima mentorja")
    }

    const result = await Dnevnik.vnesiDnevnik(
      pripravnikId,
      uporabnik.mentor.id,
      dnevnik.datum,
      dnevnik.ure,
      dnevnik.opis,
      dnevnik.delo
    )

    return ResponseBuilder.success(result)
  }

  @Patch("/:dnevnikId/status/:status")
  @UseBefore(authUser("lovec"))
  async patchSpremeniStatus(
    @Param("dnevnikId") dnevnikId: string,
    @Param("status") status: string
  ) {
    const result = await Dnevnik.spremeniStatusDnevnik(dnevnikId, status)

    return ResponseBuilder.success(result)
  }

  @Get("/pripravnik/:stran")
  @UseBefore(authUser("pripravnik"))
  async getDnevnikPripravnik(@Req() req: any, @Param("stran") stran: number) {
    const { uporabnikId: pripravnikId } = await Uporabnik.JWTpayload(req)

    const result = await Dnevnik.fetchDnevnikiPripravnik(pripravnikId, stran)

    return ResponseBuilder.success(result)
  }

  @Delete("/admin/:dnevnikId")
  @UseBefore(authUser("admin"))
  async deleteDnevnik(@Param("dnevnikId") dnevnikId: string) {
    const result = await Dnevnik.deleteDnevnik(dnevnikId)

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }

  @Get("/admin/mentor/:mentorId/:datum")
  @UseBefore(authUser("admin"))
  async adminGetDnevnikPripravniki(
    @Param("mentorId") mentorId: string,
    @Param("datum") datum: string
  ) {
    const result = await Dnevnik.fetchDnevnikiMentor(mentorId, datum)

    return ResponseBuilder.success(result)
  }

  @Get("/admin/pripravnik/:pripravnikId/:stran")
  @UseBefore(authUser("admin"))
  async adminGetDnevnikPripravnik(
    @Param("pripravnikId") pripravnikId: string,
    @Param("stran") stran: number
  ) {
    const result = await Dnevnik.fetchDnevnikiPripravnik(pripravnikId, stran)

    return ResponseBuilder.success(result)
  }
}
