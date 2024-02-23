import Revir from "@entities/Revir"
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
  Patch,
  Put,
} from "routing-controllers"

import { InsertRevirDTO } from "./dto/revir/insert-revir.dto"

import { authUser } from "middleware/authUser"

@JsonController("/revirji")
export class RevirController {
  @Post("/")
  @UseBefore(authUser("admin"))
  async postRevir(@Body() revir: InsertRevirDTO) {
    const result = await Revir.vnesiRevir(
      revir.ime,
      revir.koordinate,
      revir.druzina
    )

    return ResponseBuilder.success(result)
  }

  @Get("/")
  @UseBefore(authUser("pripravnik", "lovec", "admin"))
  async getRevirji() {
    const result = await Revir.fetchRevirji()

    return ResponseBuilder.success(result)
  }

  @Delete("/:id")
  @UseBefore(authUser("admin"))
  async deleteRevir(@Param("id") id: string) {
    const result = await Revir.odstraniRevir(id)

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }

  @Patch("/:id")
  @UseBefore(authUser("admin"))
  async updateRevir(@Param("id") id: string, @Body() revir: InsertRevirDTO) {
    console.log(id)
    console.log(revir)

    const result = await Revir.updateRevir(
      id,
      revir.ime,
      revir.koordinate,
      revir.druzina
    )

    return result ? ResponseBuilder.success(result) : ResponseBuilder.notfound()
  }
}
