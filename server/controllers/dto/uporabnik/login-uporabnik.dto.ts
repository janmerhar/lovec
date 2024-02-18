import { IsString } from "class-validator"

export class LoginUporabnikDTO {
  @IsString()
  email: string

  @IsString()
  geslo: string
}
