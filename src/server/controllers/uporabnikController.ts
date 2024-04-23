import Uporabnik from "@entities/Uporabnik"
import ResponseBuilder from "@utils/ResponseBuilder"
import {
  Body,
  ContentType,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Req,
  UploadedFile,
  UseBefore,
} from "routing-controllers"

import multer from "multer"
import * as crypto from "crypto"

const storage = multer.diskStorage({
  destination: function (_req: any, _file: any, cb: any) {
    cb(null, process.env.FILE_UPLOAD_PATH_PROFILE as string)
  },
  filename: function (_req: any, file: any, cb: any) {
    const fileEnd = file.originalname.split(".").pop()

    cb(null, `${crypto.randomBytes(20).toString("hex")}.${fileEnd}`)
  },
})
/*
  Admin:
  2. Urejanje uporabnikov --> vnos slike
*/

/*
  Registracija:
  1. Preveri, če je email že v bazi
  2. Če ni, ustvari uporabnika
  3. Vrni uspešno registracijo

*/

import { authUser } from "middleware/authUser"

import { LoginUporabnikDTO } from "@controllers/dto/uporabnik/login-uporabnik.dto"
import { RegisterUporabnikDTO } from "@controllers/dto/uporabnik/register-uporabnik.dto"
import SistemskeSpremenljivke from "@entities/SistemskeSpremenljivke"

@JsonController("/uporabnik")
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
  async postRegister(
    @Body() uporabnik: RegisterUporabnikDTO,
    @UploadedFile("slika", { options: { storage } }) file?: any
  ) {
    const slika = file ? file.filename : null
    console.log(slika)

    const result = await Uporabnik.register(
      uporabnik.ime,
      uporabnik.priimek,
      slika,
      null,
      uporabnik.email,
      uporabnik.geslo,
      uporabnik.role,
      null,
      null,
      null
    )

    return ResponseBuilder.success(result)
  }
}
