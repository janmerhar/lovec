import { IsIn, IsString } from "class-validator"
import { opremaTipDomain } from "@shared/types"

export class InsertOpremaDTO {
  @IsString()
  naziv: string

  @IsString()
  @IsIn(opremaTipDomain)
  tip: string

  @IsString()
  stanje: string
}
