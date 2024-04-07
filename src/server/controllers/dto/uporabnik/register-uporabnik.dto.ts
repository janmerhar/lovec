import { IsArray, IsIn, IsOptional, IsString } from "class-validator"

import { uporabnikRoles } from "@shared/types"

export class RegisterUporabnikDTO {
  @IsString({ message: "ime" })
  ime: string

  @IsString({ message: "priimek" })
  priimek: string

  @IsString({ message: "rojstniDatum" })
  @IsOptional()
  rojstniDatum: string

  @IsString({ message: "email" })
  email: string

  @IsString({ message: "geslo" })
  geslo: string

  @IsString({ message: "role" })
  @IsIn(uporabnikRoles)
  role: string

  @IsString({ message: "mentor" })
  @IsOptional()
  mentor: string

  @IsString({ message: "pripravniki" })
  @IsArray({ message: "pripravniki" })
  @IsOptional()
  pripravniki: string[]

  @IsString({ message: "druzina" })
  @IsOptional()
  druzina: string
}
