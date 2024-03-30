import { IsString, Min } from "class-validator"

export class LoginUporabnikDTO {
  @IsString({ message: "email" })
  email: string

  @IsString({ message: "geslo" })
  @Min(8, { message: "geslo" })
  geslo: string
}
