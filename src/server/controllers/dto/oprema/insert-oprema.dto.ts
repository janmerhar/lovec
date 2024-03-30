import { IsIn, IsString } from "class-validator"
import { opremaTipDomain } from "@shared/types"

export class InsertOpremaDTO {
  @IsString({ message: "naziv" })
  naziv: string

  @IsString({ message: "tip" })
  @IsIn(opremaTipDomain)
  tip: string

  @IsString({ message: "stanje" })
  stanje: string
}
